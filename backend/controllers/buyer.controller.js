import { PutCommand, GetCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { PutObjectCommand, GetObjectCommand, CreateBucketCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';
import { docClient, s3Client, TABLES, BUCKET_NAME } from '../config/aws.config.js';
import { razorpayInstance, SUBSCRIPTION_TIERS } from '../config/razorpay.config.js';
import { validateBuyerRegistration, validateDocumentUpload } from '../validators/buyer.validator.js';

// Generate Marketplace ID: BUY-YYYY-XXXXXX
const generateMarketplaceId = () => {
  const year = new Date().getFullYear();
  const random = Math.floor(100000 + Math.random() * 900000);
  return `BUY-${year}-${random}`;
};

// Register new buyer
export const registerBuyer = async (req, res) => {
  try {
    const { error, value } = validateBuyerRegistration(req.body);
    if (error) {
      console.error('Validation error:', error.details);
      return res.status(400).json({ error: { message: error.details[0].message } });
    }

    const buyerId = uuidv4();
    const marketplaceId = generateMarketplaceId();
    const timestamp = new Date().toISOString();

    const buyer = {
      buyerId,
      marketplaceId,
      ...value,
      documents: value.documents || [],
      subscriptionStatus: 'pending',
      registrationStatus: 'incomplete',
      createdAt: timestamp,
      updatedAt: timestamp
    };

    await docClient.send(new PutCommand({
      TableName: TABLES.BUYERS,
      Item: buyer
    }));

    res.status(201).json({
      success: true,
      data: {
        buyerId,
        marketplaceId,
        message: 'Buyer registration initiated successfully'
      }
    });
  } 
  
  catch (error) {
    console.error('Error registering buyer:', error);
    console.error('Error details:', {
      name: error.name,
      message: error.message,
      code: error.code,
      stack: error.stack
    });
    res.status(500).json({ 
      error: { 
        message: 'Failed to register buyer',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      } 
    });
  }
};

// Get buyer details
export const getBuyer = async (req, res) => {
  try {
    const { buyerId } = req.params;

    const result = await docClient.send(new GetCommand({
      TableName: TABLES.BUYERS,
      Key: { buyerId }
    }));

    if (!result.Item) {
      return res.status(404).json({ error: { message: 'Buyer not found' } });
    }

    res.json({
      success: true,
      data: result.Item
    });
  } catch (error) {
    console.error('Error fetching buyer:', error);
    res.status(500).json({ error: { message: 'Failed to fetch buyer details' } });
  }
};

// Update buyer information
export const updateBuyer = async (req, res) => {
  try {
    const { buyerId } = req.params;
    const updateData = req.body;

    // Build update expression dynamically
    const updateExpressions = [];
    const expressionAttributeValues = {};
    const expressionAttributeNames = {};

    // Fields that can be updated
    const allowedFields = [
      'companyName', 'companyWebsite', 'industry', 'companySize',
      'jobTitle', 'yearsOfExperience', 'linkedinProfile',
      'investmentRange', 'sectorsOfInterest', 'geographicPreference'
    ];

    Object.keys(updateData).forEach((key) => {
      if (allowedFields.includes(key) && updateData[key] !== undefined) {
        const placeholder = `:${key}`;
        const namePlaceholder = `#${key}`;
        updateExpressions.push(`${namePlaceholder} = ${placeholder}`);
        expressionAttributeValues[placeholder] = updateData[key];
        expressionAttributeNames[namePlaceholder] = key;
      }
    });

    if (updateExpressions.length === 0) {
      return res.status(400).json({ error: { message: 'No valid fields to update' } });
    }

    // Add updatedAt timestamp
    updateExpressions.push('#updatedAt = :updatedAt');
    expressionAttributeValues[':updatedAt'] = new Date().toISOString();
    expressionAttributeNames['#updatedAt'] = 'updatedAt';

    const result = await docClient.send(new UpdateCommand({
      TableName: TABLES.BUYERS,
      Key: { buyerId },
      UpdateExpression: `SET ${updateExpressions.join(', ')}`,
      ExpressionAttributeValues: expressionAttributeValues,
      ExpressionAttributeNames: expressionAttributeNames,
      ReturnValues: 'ALL_NEW'
    }));

    res.json({
      success: true,
      data: result.Attributes,
      message: 'Buyer information updated successfully'
    });
  } catch (error) {
    console.error('Error updating buyer:', error);
    res.status(500).json({ error: { message: 'Failed to update buyer information' } });
  }
};

// Upload document
export const uploadDocument = async (req, res) => {
  try {
    const { buyerId } = req.params;
    const { documentType } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ error: { message: 'No file uploaded' } });
    }

    const { error } = validateDocumentUpload({ documentType, file: req.file });
    if (error) {
      return res.status(400).json({ error: { message: error.details[0].message } });
    }

    // Get buyer to verify existence
    const buyerResult = await docClient.send(new GetCommand({
      TableName: TABLES.BUYERS,
      Key: { buyerId }
    }));

    if (!buyerResult.Item) {
      return res.status(404).json({ error: { message: 'Buyer not found' } });
    }

    // Upload to S3
    const fileExtension = req.file.originalname.split('.').pop();
    const fileName = `buyers/${buyerId}/${documentType}-${Date.now()}.${fileExtension}`;

    try {
      await s3Client.send(new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: fileName,
        Body: req.file.buffer,
        ContentType: req.file.mimetype
      }));
    } catch (s3Error) {
      console.error('S3 Upload Error:', s3Error);
      // If bucket doesn't exist, try to create it
      if (s3Error.name === 'NoSuchBucket' || s3Error.Code === 'NoSuchBucket') {
        try {
          await s3Client.send(new CreateBucketCommand({ Bucket: BUCKET_NAME }));
          console.log(`✅ Created S3 bucket: ${BUCKET_NAME}`);
          // Retry upload
          await s3Client.send(new PutObjectCommand({
            Bucket: BUCKET_NAME,
            Key: fileName,
            Body: req.file.buffer,
            ContentType: req.file.mimetype
          }));
        } catch (createError) {
          console.error('Failed to create bucket:', createError);
          throw new Error('S3 bucket does not exist and could not be created. Please run: npm run init-db');
        }
      } else {
        throw s3Error;
      }
    }

    // Get signed URL for access
    const signedUrl = await getSignedUrl(s3Client, new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: fileName
    }), { expiresIn: 3600 });

    // Update buyer record
    const documentRecord = {
      documentId: uuidv4(),
      documentType,
      fileName: req.file.originalname,
      s3Key: fileName,
      uploadedAt: new Date().toISOString(),
      size: req.file.size,
      mimeType: req.file.mimetype
    };

    await docClient.send(new UpdateCommand({
      TableName: TABLES.BUYERS,
      Key: { buyerId },
      UpdateExpression: 'SET documents = list_append(if_not_exists(documents, :empty_list), :doc), updatedAt = :timestamp',
      ExpressionAttributeValues: {
        ':doc': [documentRecord],
        ':empty_list': [],
        ':timestamp': new Date().toISOString()
      }
    }));

    res.json({
      success: true,
      data: {
        document: documentRecord,
        signedUrl
      }
    });
  } catch (error) {
    console.error('Error uploading document:', error);
    res.status(500).json({ error: { message: 'Failed to upload document' } });
  }
};

// Create payment order
export const createPaymentOrder = async (req, res) => {
  try {
    const { buyerId, subscriptionTier } = req.body;

    if (!SUBSCRIPTION_TIERS[subscriptionTier]) {
      return res.status(400).json({ error: { message: 'Invalid subscription tier' } });
    }

    const tierInfo = SUBSCRIPTION_TIERS[subscriptionTier];

    // TEST MODE: If Razorpay is not configured or fails, return mock order
    if (!razorpayInstance) {
      console.log('⚠️  TEST MODE: Razorpay not configured, returning mock order');
      return res.json({
        success: true,
        data: {
          orderId: `test_order_${Date.now()}`,
          amount: tierInfo.price,
          currency: tierInfo.currency || 'USD',
          keyId: 'test_key',
          testMode: true
        }
      });
    }

    try {
      // Convert USD to cents (smallest currency unit)
      // tierInfo.price is already in cents, so use directly
      const amountInCents = tierInfo.price;
      const currency = tierInfo.currency || 'USD';

      const options = {
        amount: amountInCents,
        currency: currency,
        receipt: `receipt_${buyerId}_${Date.now()}`,
        notes: {
          buyerId,
          subscriptionTier,
          marketplaceId: buyerId
        }
      };

      const order = await razorpayInstance.orders.create(options);

      res.json({
        success: true,
        data: {
          orderId: order.id,
          amount: order.amount,
          currency: order.currency,
          keyId: process.env.RAZORPAY_KEY_ID
        }
      });
    } catch (razorpayError) {
      // If Razorpay fails, use test mode
      console.log('⚠️  TEST MODE: Razorpay error, returning mock order:', razorpayError.error || razorpayError.message);
      return res.json({
        success: true,
        data: {
          orderId: `test_order_${Date.now()}`,
          amount: tierInfo.price,
          currency: tierInfo.currency || 'USD',
          keyId: 'test_key',
          testMode: true
        }
      });
    }
  } catch (error) {
    console.error('Error creating payment order:', error);
    res.status(500).json({ error: { message: 'Failed to create payment order' } });
  }
};

// Verify payment
export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, buyerId, subscriptionTier } = req.body;

    // TEST MODE: If order_id starts with 'test_order_', skip verification
    if (razorpay_order_id && razorpay_order_id.startsWith('test_order_')) {
      console.log('⚠️  TEST MODE: Skipping payment verification for test order');
      
      // Update buyer subscription
      await docClient.send(new UpdateCommand({
        TableName: TABLES.BUYERS,
        Key: { buyerId },
        UpdateExpression: 'SET subscriptionTier = :tier, subscriptionStatus = :status, paymentId = :paymentId, registrationStatus = :regStatus, updatedAt = :timestamp',
        ExpressionAttributeValues: {
          ':tier': subscriptionTier,
          ':status': 'active',
          ':paymentId': razorpay_payment_id || 'test_payment',
          ':regStatus': 'complete',
          ':timestamp': new Date().toISOString()
        }
      }));

      return res.json({
        success: true,
        message: 'Payment verified and subscription activated successfully (TEST MODE)'
      });
    }

    // Verify signature
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    const isAuthentic = expectedSignature === razorpay_signature;

    if (!isAuthentic) {
      return res.status(400).json({ error: { message: 'Payment verification failed' } });
    }

    // Update buyer subscription
    await docClient.send(new UpdateCommand({
      TableName: TABLES.BUYERS,
      Key: { buyerId },
      UpdateExpression: 'SET subscriptionTier = :tier, subscriptionStatus = :status, paymentId = :paymentId, registrationStatus = :regStatus, updatedAt = :timestamp',
      ExpressionAttributeValues: {
        ':tier': subscriptionTier,
        ':status': 'active',
        ':paymentId': razorpay_payment_id,
        ':regStatus': 'complete',
        ':timestamp': new Date().toISOString()
      }
    }));

    res.json({
      success: true,
      message: 'Payment verified and subscription activated successfully'
    });
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ error: { message: 'Failed to verify payment' } });
  }
};

// Update subscription
export const updateSubscription = async (req, res) => {
  try {
    const { buyerId } = req.params;
    const { subscriptionTier } = req.body;

    if (!SUBSCRIPTION_TIERS[subscriptionTier]) {
      return res.status(400).json({ error: { message: 'Invalid subscription tier' } });
    }

    await docClient.send(new UpdateCommand({
      TableName: TABLES.BUYERS,
      Key: { buyerId },
      UpdateExpression: 'SET subscriptionTier = :tier, updatedAt = :timestamp',
      ExpressionAttributeValues: {
        ':tier': subscriptionTier,
        ':timestamp': new Date().toISOString()
      }
    }));

    res.json({
      success: true,
      message: 'Subscription updated successfully'
    });
  } catch (error) {
    console.error('Error updating subscription:', error);
    res.status(500).json({ error: { message: 'Failed to update subscription' } });
  }
};

