import { 
  CreateTableCommand, 
  DescribeTableCommand,
  waitUntilTableExists 
} from '@aws-sdk/client-dynamodb';
import { 
  CreateBucketCommand, 
  HeadBucketCommand 
} from '@aws-sdk/client-s3';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { S3Client } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load .env file
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const envPath = join(__dirname, '..', '.env');
dotenv.config({ path: envPath });

// AWS Configuration - Use production credentials from .env
const dynamoDbClient = new DynamoDBClient({
  region: process.env.AWS_REGION || 'ap-south-2',
  // No endpoint = use real AWS DynamoDB
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'ap-south-2',
  // No endpoint = use real AWS S3
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

const BUCKET_NAME = process.env.S3_BUCKET_NAME || 'ma-kitchen-documents';

// Table definitions
const tables = [
  {
    TableName: 'MAKitchen-Buyers',
    KeySchema: [
      { AttributeName: 'buyerId', KeyType: 'HASH' }
    ],
    AttributeDefinitions: [
      { AttributeName: 'buyerId', AttributeType: 'S' },
      { AttributeName: 'email', AttributeType: 'S' },
      { AttributeName: 'marketplaceId', AttributeType: 'S' }
    ],
    GlobalSecondaryIndexes: [
      {
        IndexName: 'EmailIndex',
        KeySchema: [
          { AttributeName: 'email', KeyType: 'HASH' }
        ],
        Projection: { ProjectionType: 'ALL' },
        ProvisionedThroughput: {
          ReadCapacityUnits: 5,
          WriteCapacityUnits: 5
        }
      },
      {
        IndexName: 'MarketplaceIdIndex',
        KeySchema: [
          { AttributeName: 'marketplaceId', KeyType: 'HASH' }
        ],
        Projection: { ProjectionType: 'ALL' },
        ProvisionedThroughput: {
          ReadCapacityUnits: 5,
          WriteCapacityUnits: 5
        }
      }
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5
    },
    Tags: [
      { Key: 'Project', Value: 'MAKitchen' },
      { Key: 'Environment', Value: process.env.NODE_ENV || 'production' }
    ]
  },

  

  {
    TableName: 'MAKitchen-Agents',
    KeySchema: [
      { AttributeName: 'agentId', KeyType: 'HASH' }
    ],
    AttributeDefinitions: [
      { AttributeName: 'agentId', AttributeType: 'S' },
      { AttributeName: 'email', AttributeType: 'S' },
      { AttributeName: 'marketplaceId', AttributeType: 'S' }
    ],
    GlobalSecondaryIndexes: [
      {
        IndexName: 'EmailIndex',
        KeySchema: [
          { AttributeName: 'email', KeyType: 'HASH' }
        ],
        Projection: { ProjectionType: 'ALL' },
        ProvisionedThroughput: {
          ReadCapacityUnits: 5,
          WriteCapacityUnits: 5
        }
      },
      {
        IndexName: 'MarketplaceIdIndex',
        KeySchema: [
          { AttributeName: 'marketplaceId', KeyType: 'HASH' }
        ],
        Projection: { ProjectionType: 'ALL' },
        ProvisionedThroughput: {
          ReadCapacityUnits: 5,
          WriteCapacityUnits: 5
        }
      }
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5
    },
    Tags: [
      { Key: 'Project', Value: 'MAKitchen' },
      { Key: 'Environment', Value: process.env.NODE_ENV || 'production' }
    ]
  }
];

async function createTables() {
  console.log('🗄️  Creating DynamoDB tables in AWS...\n');

  for (const tableConfig of tables) {
    try {
      // Check if table exists
      try {
        const result = await dynamoDbClient.send(new DescribeTableCommand({ 
          TableName: tableConfig.TableName 
        }));

        console.log(`✅ Table ${tableConfig.TableName} already exists`);
        console.log(`   Status: ${result.Table.TableStatus}`);
        console.log(`   Region: ${process.env.AWS_REGION || 'ap-south-2'}\n`);
        continue;

      } 
      catch (error) {
        if (error.name !== 'ResourceNotFoundException') {
          throw error;
        }
      }

      // Create table
      console.log(`⏳ Creating table ${tableConfig.TableName} in AWS...`);
      await dynamoDbClient.send(new CreateTableCommand(tableConfig));
      
      // Wait for table to be created
      await waitUntilTableExists(
        { client: dynamoDbClient, maxWaitTime: 120 },
        { TableName: tableConfig.TableName }
      );
      
      console.log(`✅ Table ${tableConfig.TableName} created successfully`);
      console.log(`   Region: ${process.env.AWS_REGION || 'ap-south-2'}`);
      console.log(`   Status: ACTIVE\n`);
    } 
    catch (error) {
      console.error(`❌ Error creating table ${tableConfig.TableName}:`, error.message);
      if (error.name === 'AccessDeniedException') {
        console.error('   ⚠️  Check your IAM user permissions for DynamoDB');
      }
    }
  }
}





async function createS3Bucket() {
  console.log('📦 Creating S3 bucket in AWS...\n');

  try {
    // Check if bucket exists
    try {
      await s3Client.send(new HeadBucketCommand({ Bucket: BUCKET_NAME }));
      console.log(`✅ Bucket ${BUCKET_NAME} already exists`);
      console.log(`   Region: ${process.env.AWS_REGION || 'ap-south-2'}\n`);
      return;
    } catch (error) {
      if (error.name !== 'NotFound' && error.name !== 'NoSuchBucket') {
        throw error;
      }
    }

    // Create bucket
    console.log(`⏳ Creating bucket ${BUCKET_NAME} in AWS...`);
    const region = process.env.AWS_REGION || 'ap-south-2';
    
    await s3Client.send(new CreateBucketCommand({ 
      Bucket: BUCKET_NAME,
      CreateBucketConfiguration: {
        LocationConstraint: region
      }
    }));
    console.log(`✅ Bucket ${BUCKET_NAME} created successfully`);
    console.log(`   Region: ${process.env.AWS_REGION || 'ap-south-2'}\n`);
  } catch (error) {
    console.error(`❌ Error creating bucket ${BUCKET_NAME}:`, error.message);
    if (error.name === 'AccessDeniedException' || error.name === 'Forbidden') {
      console.error('   ⚠️  Check your IAM user permissions for S3');
    }
    if (error.name === 'BucketAlreadyOwnedByYou') {
      console.log(`✅ Bucket ${BUCKET_NAME} already exists (owned by you)`);
    }
  }
}

async function verifyCredentials() {
  console.log('🔐 Verifying AWS Credentials...\n');
  
  if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
    console.error('❌ AWS credentials not found in .env file');
    console.error('   Please add:');
    console.error('   AWS_ACCESS_KEY_ID=your_access_key');
    console.error('   AWS_SECRET_ACCESS_KEY=your_secret_key');
    console.error('   AWS_REGION=ap-south-2\n');
    process.exit(1);
  }

  console.log('✅ AWS Access Key ID: Found');
  console.log('✅ AWS Secret Access Key: Found');
  console.log(`✅ AWS Region: ${process.env.AWS_REGION || 'ap-south-2'}\n`);
}

async function init() {
  console.log('🚀 Initializing M&A Kitchen Database in AWS...\n');
  
  try {
    await verifyCredentials();
    await createTables();
    await createS3Bucket();
    
    console.log('\n✨ Database initialization completed successfully!');
    console.log('\n📋 Summary:');
    console.log(`   DynamoDB Tables: MAKitchen-Buyers, MAKitchen-Agents`);
    console.log(`   S3 Bucket: ${BUCKET_NAME}`);
    console.log(`   Region: ${process.env.AWS_REGION || 'ap-south-2'}`);
    console.log('\n⚠️  Remember to update backend/.env to remove DYNAMODB_ENDPOINT and S3_ENDPOINT');
    console.log('   for production use.\n');
    
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Database initialization failed:', error.message);
    process.exit(1);
  }
}

init();

