import { PutCommand, GetCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';
import { docClient, s3Client, TABLES, BUCKET_NAME } from '../config/aws.seller.config.js';
import { validateSellerRegistration, validateDocumentUpload } from '../validators/seller.validator.js';
import { razorpayInstance, SUBSCRIPTION_TIERS, convertUsdCentsToInrPaise, capAmountForTestMode, isTestMode } from '../config/razorpay.config.js';
import { generatePassword, generateMarketplaceId, generateReceiptId } from '../utils/helpers.js';

// Register new seller
export const registerSeller = async (req, res) => {
  try {
    const { error, value } = validateSellerRegistration(req.body);
    if (error) {
      console.error('Validation error:', error.details);
      const errorMessages = error.details.map(detail => detail.message).join(', ');
      return res.status(400).json({ 
        error: { 
          message: errorMessages,
          details: error.details 
        } 
      });
    }

    const sellerId = uuidv4();
    const marketplaceId = generateMarketplaceId('SEL');
    const timestamp = new Date().toISOString();

    const seller = {
      sellerId,
      marketplaceId,
      ...value,
      documents: value.documents || [],
      registrationStatus: 'incomplete',
      createdAt: timestamp,
      updatedAt: timestamp
    };

    await docClient.send(new PutCommand({
      TableName: TABLES.SELLERS,
      Item: seller
    }));

    res.status(201).json({
      success: true,
      data: {
        sellerId,
        marketplaceId,
        message: 'Seller registration initiated successfully'
      }
    });
  } 
  
  catch (error) {
    console.error('Error registering seller:', error);
    console.error('Error details:', {
      name: error.name,
      message: error.message,
      code: error.code,
      stack: error.stack
    });
    res.status(500).json({ 
      error: { 
        message: 'Failed to register seller',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      } 
    });
  }
};

// Get seller details
export const getSeller = async (req, res) => {
  try {
    const { sellerId } = req.params;

    const result = await docClient.send(new GetCommand({
      TableName: TABLES.SELLERS,
      Key: { sellerId }
    }));

    if (!result.Item) {
      return res.status(404).json({ error: { message: 'Seller not found' } });
    }

    res.json({
      success: true,
      data: result.Item
    });
  } catch (error) {
    console.error('Error fetching seller:', error);
    res.status(500).json({ error: { message: 'Failed to fetch seller details' } });
  }
};

// Update seller information
export const updateSeller = async (req, res) => {
  try {
    const { sellerId } = req.params;
    const updateData = req.body;

    // Define allowed fields that can be updated
    const allowedFields = [
      'organizationName',
      'headquarter',
      'hqAddress',
      'contactPersonnel',
      'phones',
      'emails',
      'linkedinProfile',
      'organizationLogoUrl',
      'industrySector',
      'offeringCategory',
      'annualTurnover',
      'ebitda',
      'netProfit',
      'entityType',
      'yearEstablished',
      'mrr',
      'ebitdaMargin',
      'productServicesSplit',
      'employeesOnPayroll',
      'employeesOnContract',
      'geographicalPresence',
      'offices',
      'businessGeographySplit',
      'geographySplit',
      'subsidiaries',
      'investmentsAcquisitions',
      'capTableShareholding',
      'coreBusinessModel',
      'keyDifferentiators',
      'investorHistory',
      'totalClientsUsers',
      'totalActiveClientsUsers',
      'avgDealSize',
      'repeatCustomersPercent',
      'biggestDealSize',
      'productPricingPerItem',
      'typicalPricePerItem',
      'aum',
      'assetsUnderManagement',
      'topCustomers',
      'partnershipAlliancesChannels',
      'iprs',
      'founderProfiles',
      'cac',
      'customerAcquisitionCost',
      'clv',
      'customerLifetimeValue',
      'npv',
      'netPresentValue',
      'pendingLegalIssues',
      'legalIssuesDetails',
      'shortLongTermBorrowings',
      'investmentSought',
      'investmentType',
      'resourceSkillsetUrl',
      'forwardProjectionsUrl',
      'incomeStatementUrl',
      'balanceSheetUrl',
      'cashFlowUrl',
      'pitchDeckUrl',
      'businessCollateralsUrl',
      'valuationUrl',
      'ndaUrl',
      'acceptedTerms',
      'acceptedNDA'
    ];

    // Filter out fields that are not allowed
    const fieldsToUpdate = {};
    let hasValidFields = false;

    for (const [key, value] of Object.entries(updateData)) {
      if (allowedFields.includes(key) && value !== undefined) {
        fieldsToUpdate[key] = value;
        hasValidFields = true;
      }
    }

    if (!hasValidFields) {
      return res.status(400).json({ 
        error: { message: 'No valid fields to update' } 
      });
    }

    // Build update expression
    const updateExpressions = [];
    const expressionAttributeNames = {};
    const expressionAttributeValues = {};

    Object.keys(fieldsToUpdate).forEach((key, index) => {
      const nameKey = `#field${index}`;
      const valueKey = `:value${index}`;
      updateExpressions.push(`${nameKey} = ${valueKey}`);
      expressionAttributeNames[nameKey] = key;
      expressionAttributeValues[valueKey] = fieldsToUpdate[key];
    });

    updateExpressions.push('#updatedAt = :updatedAt');
    expressionAttributeNames['#updatedAt'] = 'updatedAt';
    expressionAttributeValues[':updatedAt'] = new Date().toISOString();

    await docClient.send(new UpdateCommand({
      TableName: TABLES.SELLERS,
      Key: { sellerId },
      UpdateExpression: `SET ${updateExpressions.join(', ')}`,
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: expressionAttributeValues
    }));

    res.json({
      success: true,
      message: 'Seller information updated successfully'
    });
  } catch (error) {
    console.error('Error updating seller:', error);
    res.status(500).json({ error: { message: 'Failed to update seller information' } });
  }
};

// Upload document
export const uploadDocument = async (req, res) => {
  try {
    const { sellerId } = req.params;
    const file = req.file;

    console.log('Seller document upload - sellerId:', sellerId);
    console.log('Seller document upload - documentType:', req.body.documentType);
    console.log('Seller document upload - file info:', {
      originalname: file?.originalname,
      mimetype: file?.mimetype,
      size: file?.size,
      fieldname: file?.fieldname
    });

    if (!file) {
      return res.status(400).json({ error: { message: 'No file uploaded' } });
    }

    const { error, value } = validateDocumentUpload({
      documentType: req.body.documentType,
      file: {
        mimetype: file.mimetype,
        size: file.size
      }
    });

    if (error) {
      console.error('Document upload validation error:', error.details);
      return res.status(400).json({ 
        error: { 
          message: error.details.map(d => d.message).join(', ')
        } 
      });
    }

    const documentType = value.documentType;
    const timestamp = Date.now();
    const fileExtension = file.originalname.split('.').pop();
    const fileName = `${documentType}-${timestamp}.${fileExtension}`;
    const s3Key = `sellers/${sellerId}/${fileName}`;

    console.log('Uploading to S3 - Key:', s3Key);

    // Upload to S3
    try {
      await s3Client.send(new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: s3Key,
        Body: file.buffer,
        ContentType: file.mimetype
      }));
      console.log('✅ File uploaded to S3 successfully');
    } catch (s3Error) {
      console.error('S3 Upload Error:', s3Error);
      throw s3Error;
    }

    // Generate signed URL (valid for 1 hour)
    let signedUrl;
    try {
      signedUrl = await getSignedUrl(
        s3Client,
        new GetObjectCommand({
          Bucket: BUCKET_NAME,
          Key: s3Key
        }),
        { expiresIn: 3600 } // 1 hour (max is 604800 = 7 days)
      );
      console.log('✅ Signed URL generated successfully');
    } catch (urlError) {
      console.error('Error generating signed URL:', urlError);
      // If signed URL generation fails, construct a basic URL
      // The file is already in S3, so we can still proceed
      signedUrl = `https://${BUCKET_NAME}.s3.${process.env.AWS_REGION || 'ap-south-2'}.amazonaws.com/${s3Key}`;
      console.log('⚠️  Using fallback URL (signed URL generation failed):', signedUrl);
    }

    // Update seller record with document URL based on document type
    const documentTypeToFieldMap = {
      'organization_logo': 'organizationLogoUrl',
      'resource_skillset': 'resourceSkillsetUrl',
      'forward_projections': 'forwardProjectionsUrl',
      'income_statement': 'incomeStatementUrl',
      'balance_sheet': 'balanceSheetUrl',
      'cash_flow_statement': 'cashFlowUrl',
      'pitch_deck': 'pitchDeckUrl',
      'business_collaterals': 'businessCollateralsUrl',
      'valuation': 'valuationUrl',
      'nda': 'ndaUrl'
    };

    const fieldToUpdate = documentTypeToFieldMap[documentType];
    if (fieldToUpdate) {
      try {
        await docClient.send(new UpdateCommand({
          TableName: TABLES.SELLERS,
          Key: { sellerId },
          UpdateExpression: `SET ${fieldToUpdate} = :url, updatedAt = :updatedAt`,
          ExpressionAttributeValues: {
            ':url': signedUrl,
            ':updatedAt': new Date().toISOString()
          }
        }));
        console.log(`✅ Seller ${fieldToUpdate} updated in DynamoDB`);
      } catch (dbError) {
        console.error('Error updating seller in DynamoDB:', dbError);
        // Don't fail the upload if DB update fails - file is already in S3
        // Continue with response
      }
    }

    // Return response in the format expected by frontend
    res.json({
      success: true,
      data: {
        documentType,
        fileName,
        signedUrl,
        message: 'Document uploaded successfully'
      }
    });
  } catch (error) {
    console.error('Error uploading document:', error);
    console.error('Error details:', {
      name: error.name,
      message: error.message,
      code: error.code
    });
    res.status(500).json({ 
      error: { 
        message: 'Failed to upload document',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      } 
    });
  }
};

// Create payment order for seller
export const createPaymentOrder = async (req, res) => {
  try {
    const { sellerId, subscriptionTier } = req.body;

    if (!SUBSCRIPTION_TIERS[subscriptionTier]) {
      return res.status(400).json({ error: { message: 'Invalid subscription tier' } });
    }

    const tierInfo = SUBSCRIPTION_TIERS[subscriptionTier];

    // Get seller details to prefill email
    const sellerResult = await docClient.send(new GetCommand({
      TableName: TABLES.SELLERS,
      Key: { sellerId }
    }));

    if (!sellerResult.Item) {
      return res.status(404).json({ error: { message: 'Seller not found' } });
    }
    const seller = sellerResult.Item;

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
          testMode: true,
          email: seller.emails && seller.emails.length > 0 ? seller.emails[0] : ''
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

      const receipt = generateReceiptId('sel', sellerId);

      const options = {
        amount: amountInPaise,
        currency: currency,
        receipt: receipt,
        notes: {
          sellerId,
          subscriptionTier,
          marketplaceId: seller.marketplaceId
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
          email: seller.emails && seller.emails.length > 0 ? seller.emails[0] : '',
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
          testMode: true,
          email: seller.emails && seller.emails.length > 0 ? seller.emails[0] : ''
        }
      });
    }
  } catch (error) {
    console.error('Error creating payment order for seller:', error);
    res.status(500).json({ error: { message: 'Failed to create payment order' } });
  }
};

// Verify payment for seller
export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, sellerId, subscriptionTier } = req.body;

    // Get seller to retrieve marketplaceId and organizationName
    const sellerResult = await docClient.send(new GetCommand({
      TableName: TABLES.SELLERS,
      Key: { sellerId }
    }));

    if (!sellerResult.Item) {
      return res.status(404).json({ error: { message: 'Seller not found' } });
    }
    const seller = sellerResult.Item;

    // Generate a default password
    const defaultPassword = seller.defaultPassword || generatePassword();

    // TEST MODE: If order_id starts with 'test_order_', skip verification
    if (razorpay_order_id && razorpay_order_id.startsWith('test_order_')) {
      console.log('⚠️  TEST MODE: Skipping payment verification for test order');

      await docClient.send(new UpdateCommand({
        TableName: TABLES.SELLERS,
        Key: { sellerId },
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
          marketplaceId: seller.marketplaceId,
          defaultPassword: defaultPassword,
          organizationName: seller.organizationName,
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

    // Update seller subscription
    await docClient.send(new UpdateCommand({
      TableName: TABLES.SELLERS,
      Key: { sellerId },
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
        marketplaceId: seller.marketplaceId,
        defaultPassword: defaultPassword,
        organizationName: seller.organizationName,
        subscriptionTier: subscriptionTier
      }
    });
  } catch (error) {
    console.error('Error verifying payment for seller:', error);
    res.status(500).json({ error: { message: 'Failed to verify payment' } });
  }
};

