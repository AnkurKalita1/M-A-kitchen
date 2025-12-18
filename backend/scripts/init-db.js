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

dotenv.config();

const dynamoDbClient = new DynamoDBClient({
  region: process.env.AWS_REGION || 'ap-south-2',
  endpoint: process.env.DYNAMODB_ENDPOINT || 'http://localhost:8000',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'test',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'test'
  }
});

const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'ap-south-2',
  endpoint: process.env.S3_ENDPOINT || 'http://localhost:4566',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'test',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'test'
  },
  forcePathStyle: true
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
    }
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
    }
  },
  {
    TableName: 'MAKitchen-Sellers',
    KeySchema: [
      { AttributeName: 'sellerId', KeyType: 'HASH' }
    ],
    AttributeDefinitions: [
      { AttributeName: 'sellerId', AttributeType: 'S' },
      { AttributeName: 'marketplaceId', AttributeType: 'S' }
    ],
    GlobalSecondaryIndexes: [
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
    }
  }
];

async function createTables() {
  console.log('🗄️  Creating DynamoDB tables...\n');

  for (const tableConfig of tables) {
    try {
      // Check if table exists
      try {
        await dynamoDbClient.send(new DescribeTableCommand({ 
          TableName: tableConfig.TableName 
        }));
        console.log(`✅ Table ${tableConfig.TableName} already exists`);
        continue;
      } catch (error) {
        if (error.name !== 'ResourceNotFoundException') {
          throw error;
        }
      }

      // Create table
      await dynamoDbClient.send(new CreateTableCommand(tableConfig));
      console.log(`⏳ Creating table ${tableConfig.TableName}...`);

      // Wait for table to be created
      await waitUntilTableExists(
        { client: dynamoDbClient, maxWaitTime: 60 },
        { TableName: tableConfig.TableName }
      );
      
      console.log(`✅ Table ${tableConfig.TableName} created successfully\n`);
    } catch (error) {
      console.error(`❌ Error creating table ${tableConfig.TableName}:`, error.message);
    }
  }
}

async function createS3Bucket() {
  console.log('📦 Creating S3 bucket...\n');

  try {
    // Check if bucket exists
    try {
      await s3Client.send(new HeadBucketCommand({ Bucket: BUCKET_NAME }));
      console.log(`✅ Bucket ${BUCKET_NAME} already exists`);
      return;
    } catch (error) {
      if (error.name !== 'NotFound') {
        throw error;
      }
    }

    // Create bucket
    await s3Client.send(new CreateBucketCommand({ Bucket: BUCKET_NAME }));
    console.log(`✅ Bucket ${BUCKET_NAME} created successfully\n`);
  } catch (error) {
    console.error(`❌ Error creating bucket ${BUCKET_NAME}:`, error.message);
  }
}

async function init() {
  console.log('🚀 Initializing M&A Kitchen Database...\n');
  
  try {
    await createTables();
    await createS3Bucket();
    
    console.log('\n✨ Database initialization completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Database initialization failed:', error);
    process.exit(1);
  }
}

init();

