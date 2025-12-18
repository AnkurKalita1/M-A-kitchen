import { 
  CreateTableCommand, 
  DescribeTableCommand,
  waitUntilTableExists 
} from '@aws-sdk/client-dynamodb';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load .env file
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const envPath = join(__dirname, '..', '.env');
dotenv.config({ path: envPath });

// Use production AWS (no endpoint = production)
const dynamoDbClient = new DynamoDBClient({
  region: process.env.AWS_REGION || 'ap-south-2',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

const tableConfig = {
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
};

async function createSellerTable() {
  console.log('🗄️  Creating MAKitchen-Sellers table in production AWS...\n');

  try {
    // Check if table exists
    try {
      await dynamoDbClient.send(new DescribeTableCommand({ 
        TableName: tableConfig.TableName 
      }));
      console.log(`✅ Table ${tableConfig.TableName} already exists`);
      process.exit(0);
    } catch (error) {
      if (error.name !== 'ResourceNotFoundException') {
        throw error;
      }
    }

    // Create table
    console.log(`⏳ Creating table ${tableConfig.TableName}...`);
    await dynamoDbClient.send(new CreateTableCommand(tableConfig));

    // Wait for table to be created
    await waitUntilTableExists(
      { client: dynamoDbClient, maxWaitTime: 60 },
      { TableName: tableConfig.TableName }
    );
    
    console.log(`✅ Table ${tableConfig.TableName} created successfully\n`);
    process.exit(0);
  } catch (error) {
    console.error(`❌ Error creating table ${tableConfig.TableName}:`, error.message);
    console.error('Full error:', error);
    process.exit(1);
  }
}

createSellerTable();


