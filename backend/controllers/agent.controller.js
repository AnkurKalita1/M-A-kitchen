import { PutCommand, GetCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { PutObjectCommand, GetObjectCommand, CreateBucketCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';
import { docClient, s3Client, TABLES, BUCKET_NAME } from '../config/aws.agent.config.js';
import { razorpayInstance, SUBSCRIPTION_TIERS, convertUsdCentsToInrPaise, capAmountForTestMode, isTestMode } from '../config/razorpay.config.js';
import { validateAgentRegistration, validateDocumentUpload } from '../validators/agent.validator.js';
import { generatePassword, generateMarketplaceId, generateReceiptId } from '../utils/helpers.js';

// Register new agent
export const registerAgent = async (req, res) => {
  try {
    const { error, value } = validateAgentRegistration(req.body);
    if (error) {
      console.error('Validation error:', error.details);
      return res.status(400).json({ error: { message: error.details[0].message } });
    }

    const agentId = uuidv4();
    const marketplaceId = generateMarketplaceId('AGT');
    const timestamp = new Date().toISOString();

    const agent = {
      agentId,
      marketplaceId,
      ...value,
      documents: value.documents || [],
      subscriptionStatus: 'pending',
      registrationStatus: 'incomplete',
      createdAt: timestamp,
      updatedAt: timestamp
    };

    await docClient.send(new PutCommand({
      TableName: TABLES.AGENTS,
      Item: agent
    }));

    res.status(201).json({
      success: true,
      data: {
        agentId,
        marketplaceId,
        message: 'Agent registration initiated successfully'
      }
    });
  } 
  
  catch (error) {
    console.error('Error registering agent:', error);
    console.error('Error details:', {
      name: error.name,
      message: error.message,
      code: error.code,
      stack: error.stack
    });
    res.status(500).json({ 
      error: { 
        message: 'Failed to register agent',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      } 
    });
  }
};

// Get agent details
export const getAgent = async (req, res) => {
  try {
    const { agentId } = req.params;

    const result = await docClient.send(new GetCommand({
      TableName: TABLES.AGENTS,
      Key: { agentId }
    }));

    if (!result.Item) {
      return res.status(404).json({ error: { message: 'Agent not found' } });
    }

    res.json({
      success: true,
      data: result.Item
    });
  } catch (error) {
    console.error('Error fetching agent:', error);
    res.status(500).json({ error: { message: 'Failed to fetch agent details' } });
  }
};

// Update agent information
export const updateAgent = async (req, res) => {
  try {
    const { agentId } = req.params;
    const updateData = req.body;

    console.log('Update Agent - agentId:', agentId);
    console.log('Update Agent - updateData:', JSON.stringify(updateData, null, 2));

    // Build update expression dynamically
    const updateExpressions = [];
    const expressionAttributeValues = {};
    const expressionAttributeNames = {};

    // Fields that can be updated
    const allowedFields = [
      'organizationName', 'headquarter', 'hqAddress', 'contactPersonnel',
      'linkedinProfile', 'organizationLogoUrl', 'phones', 'emails',
      'agentType', 'businessSpeciality', 'entityType', 'industrySector',
      'servicesOffered', 'yearEstablished',
      'annualTurnover', 'employeesOnPayroll', 'employeesOnContract',
      'geographicalPresence', 'offices', 'subsidiariesParent',
      'totalTransactions', 'topCustomersGeography', 'topCustomersRevenue',
      'averageFeePerAssignment', 'finraLicenses', 'secRegistration',
      'sellSideTransactions', 'buySideTransactions', 'advisoryFeeAccrued',
      'crossBorderTransactions', 'iposConducted', 'listedEntitiesEngaged',
      'corporateOverviewUrl', 'ndaUrl'
    ];

    Object.keys(updateData).forEach((key) => {
      console.log(`Checking field: ${key}, value: ${JSON.stringify(updateData[key])}, type: ${typeof updateData[key]}`);
      console.log(`Is allowed: ${allowedFields.includes(key)}, Is defined: ${updateData[key] !== undefined}, Is not null: ${updateData[key] !== null}`);
      
      if (allowedFields.includes(key) && updateData[key] !== undefined && updateData[key] !== null) {
        // Skip empty strings for optional text fields
        if (typeof updateData[key] === 'string' && updateData[key].trim() === '') {
          console.log(`❌ Skipping empty string field: ${key}`);
          return;
        }
        
        const placeholder = `:${key}`;
        const namePlaceholder = `#${key}`;
        updateExpressions.push(`${namePlaceholder} = ${placeholder}`);
        expressionAttributeValues[placeholder] = updateData[key];
        expressionAttributeNames[namePlaceholder] = key;
        console.log(`✅ Added field to update: ${key} = ${JSON.stringify(updateData[key])}`);
      } else {
        console.log(`❌ Field ${key} not added - allowed: ${allowedFields.includes(key)}, defined: ${updateData[key] !== undefined}, not null: ${updateData[key] !== null}`);
      }
    });

    console.log('Update expressions:', updateExpressions);
    console.log('Expression values:', expressionAttributeValues);

    if (updateExpressions.length === 0) {
      console.log('No valid fields found in updateData');
      console.log('Received keys:', Object.keys(updateData));
      console.log('Allowed fields:', allowedFields);
      return res.status(400).json({ 
        error: { 
          message: 'No valid fields to update',
          receivedKeys: Object.keys(updateData),
          allowedFields: allowedFields
        } 
      });
    }

    // Add updatedAt timestamp
    updateExpressions.push('#updatedAt = :updatedAt');
    expressionAttributeValues[':updatedAt'] = new Date().toISOString();
    expressionAttributeNames['#updatedAt'] = 'updatedAt';

    const result = await docClient.send(new UpdateCommand({
      TableName: TABLES.AGENTS,
      Key: { agentId },
      UpdateExpression: `SET ${updateExpressions.join(', ')}`,
      ExpressionAttributeValues: expressionAttributeValues,
      ExpressionAttributeNames: expressionAttributeNames,
      ReturnValues: 'ALL_NEW'
    }));

    res.json({
      success: true,
      data: result.Attributes,
      message: 'Agent information updated successfully'
    });
  } catch (error) {
    console.error('Error updating agent:', error);
    res.status(500).json({ error: { message: 'Failed to update agent information' } });
  }
};

// Upload document
export const uploadDocument = async (req, res) => {
  try {
    const { agentId } = req.params;
    const { documentType } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ error: { message: 'No file uploaded' } });
    }

    console.log('Document upload - documentType:', documentType);
    console.log('Document upload - file info:', {
      originalname: req.file?.originalname,
      mimetype: req.file?.mimetype,
      size: req.file?.size,
      fieldname: req.file?.fieldname
    });

    const { error } = validateDocumentUpload({ documentType, file: req.file });
    if (error) {
      console.error('Document upload validation error:', error.details);
      return res.status(400).json({ 
        error: { 
          message: error.details[0].message,
          details: error.details 
        } 
      });
    }

    // Get agent to verify existence
    const agentResult = await docClient.send(new GetCommand({
      TableName: TABLES.AGENTS,
      Key: { agentId }
    }));

    if (!agentResult.Item) {
      return res.status(404).json({ error: { message: 'Agent not found' } });
    }

    // Upload to S3
    const fileExtension = req.file.originalname.split('.').pop();
    const fileName = `agents/${agentId}/${documentType}-${Date.now()}.${fileExtension}`;

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

    // Update agent record
    const documentRecord = {
      documentId: uuidv4(),
      documentType,
      fileName: req.file.originalname,
      s3Key: fileName,
      uploadedAt: new Date().toISOString(),
      size: req.file.size,
      mimeType: req.file.mimetype
    };

    // Update agent record based on document type
    if (documentType === 'organization_logo') {
      await docClient.send(new UpdateCommand({
        TableName: TABLES.AGENTS,
        Key: { agentId },
        UpdateExpression: 'SET documents = list_append(if_not_exists(documents, :empty_list), :doc), organizationLogoUrl = :url, updatedAt = :timestamp',
        ExpressionAttributeValues: {
          ':doc': [documentRecord],
          ':empty_list': [],
          ':url': signedUrl,
          ':timestamp': new Date().toISOString()
        }
      }));
    } else if (documentType === 'corporate_overview') {
      await docClient.send(new UpdateCommand({
        TableName: TABLES.AGENTS,
        Key: { agentId },
        UpdateExpression: 'SET documents = list_append(if_not_exists(documents, :empty_list), :doc), corporateOverviewUrl = :url, updatedAt = :timestamp',
        ExpressionAttributeValues: {
          ':doc': [documentRecord],
          ':empty_list': [],
          ':url': signedUrl,
          ':timestamp': new Date().toISOString()
        }
      }));
    } else if (documentType === 'nda') {
      await docClient.send(new UpdateCommand({
        TableName: TABLES.AGENTS,
        Key: { agentId },
        UpdateExpression: 'SET documents = list_append(if_not_exists(documents, :empty_list), :doc), ndaUrl = :url, updatedAt = :timestamp',
        ExpressionAttributeValues: {
          ':doc': [documentRecord],
          ':empty_list': [],
          ':url': signedUrl,
          ':timestamp': new Date().toISOString()
        }
      }));
    } else {
      await docClient.send(new UpdateCommand({
        TableName: TABLES.AGENTS,
        Key: { agentId },
        UpdateExpression: 'SET documents = list_append(if_not_exists(documents, :empty_list), :doc), updatedAt = :timestamp',
        ExpressionAttributeValues: {
          ':doc': [documentRecord],
          ':empty_list': [],
          ':timestamp': new Date().toISOString()
        }
      }));
    }

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
    const { agentId, subscriptionTier } = req.body;

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
      // Razorpay works best with INR, so convert USD to INR
      // tierInfo.price is in USD cents, convert to INR paise
      let amountInPaise = tierInfo.currency === 'USD' 
        ? convertUsdCentsToInrPaise(tierInfo.price)
        : tierInfo.price; // If already INR, use directly
      
      // Cap amount for test mode (Razorpay test mode limit is ₹1,00,000)
      const originalAmount = amountInPaise;
      amountInPaise = capAmountForTestMode(amountInPaise);
      const wasCapped = originalAmount !== amountInPaise;
      
      const currency = 'INR'; // Always use INR for Razorpay

      // Razorpay maximum amount validation for production (10 crore INR)
      const MAX_AMOUNT_PAISE = 1000000000; // 10 crore INR (1 billion paise)
      if (!isTestMode() && amountInPaise > MAX_AMOUNT_PAISE) {
        return res.status(400).json({ 
          error: { 
            message: `Payment amount exceeds maximum allowed limit (₹${MAX_AMOUNT_PAISE / 100}). Please contact support.` 
          } 
        });
      }

      const receipt = generateReceiptId('agt', agentId);

      const options = {
        amount: amountInPaise,
        currency: currency,
        receipt: receipt,
        notes: {
          agentId,
          subscriptionTier,
          marketplaceId: agentId
        }
      };

      const order = await razorpayInstance.orders.create(options);

      res.json({
        success: true,
        data: {
          orderId: order.id,
          amount: order.amount,
          currency: order.currency,
          keyId: process.env.RAZORPAY_KEY_ID,
          testMode: isTestMode(),
          amountCapped: wasCapped,
          originalAmount: wasCapped ? originalAmount : undefined
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
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, agentId, subscriptionTier } = req.body;

    // Get agent details first
    const agentResult = await docClient.send(new GetCommand({
      TableName: TABLES.AGENTS,
      Key: { agentId }
    }));

    if (!agentResult.Item) {
      return res.status(404).json({ error: { message: 'Agent not found' } });
    }

    const agent = agentResult.Item;

    // TEST MODE: If order_id starts with 'test_order_', skip verification
    if (razorpay_order_id && razorpay_order_id.startsWith('test_order_')) {
      console.log('⚠️  TEST MODE: Skipping payment verification for test order');
      
      // Generate password if not exists
      const defaultPassword = agent.defaultPassword || generatePassword();
      
      // Update agent subscription
      await docClient.send(new UpdateCommand({
        TableName: TABLES.AGENTS,
        Key: { agentId },
        UpdateExpression: 'SET subscriptionTier = :tier, subscriptionStatus = :status, paymentId = :paymentId, registrationStatus = :regStatus, defaultPassword = :password, updatedAt = :timestamp',
        ExpressionAttributeValues: {
          ':tier': subscriptionTier,
          ':status': 'active',
          ':paymentId': razorpay_payment_id || 'test_payment',
          ':regStatus': 'complete',
          ':password': defaultPassword,
          ':timestamp': new Date().toISOString()
        }
      }));

      return res.json({
        success: true,
        data: {
          message: 'Payment verified and subscription activated successfully (TEST MODE)',
          marketplaceId: agent.marketplaceId,
          defaultPassword: defaultPassword,
          organizationName: agent.organizationName,
          subscriptionTier: subscriptionTier
        }
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

    // Generate password if not exists
    const defaultPassword = agent.defaultPassword || generatePassword();

    // Update agent subscription
    await docClient.send(new UpdateCommand({
      TableName: TABLES.AGENTS,
      Key: { agentId },
      UpdateExpression: 'SET subscriptionTier = :tier, subscriptionStatus = :status, paymentId = :paymentId, registrationStatus = :regStatus, defaultPassword = :password, updatedAt = :timestamp',
      ExpressionAttributeValues: {
        ':tier': subscriptionTier,
        ':status': 'active',
        ':paymentId': razorpay_payment_id,
        ':regStatus': 'complete',
        ':password': defaultPassword,
        ':timestamp': new Date().toISOString()
      }
    }));

    res.json({
      success: true,
      data: {
        message: 'Payment verified and subscription activated successfully',
        marketplaceId: agent.marketplaceId,
        defaultPassword: defaultPassword,
        organizationName: agent.organizationName,
        subscriptionTier: subscriptionTier
      }
    });
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ error: { message: 'Failed to verify payment' } });
  }
};

// Update subscription
export const updateSubscription = async (req, res) => {
  try {
    const { agentId } = req.params;
    const { subscriptionTier } = req.body;

    if (!SUBSCRIPTION_TIERS[subscriptionTier]) {
      return res.status(400).json({ error: { message: 'Invalid subscription tier' } });
    }

    await docClient.send(new UpdateCommand({
      TableName: TABLES.AGENTS,
      Key: { agentId },
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

