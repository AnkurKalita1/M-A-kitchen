import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { S3Client } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load .env file
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const envPath = join(__dirname, '..', '.env');
dotenv.config({ path: envPath });

// Shared AWS configuration
const region = process.env.AWS_REGION || 'ap-south-2';
const credentials = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
};

// Factory function to create AWS clients
export const createAwsClients = (userType) => {
  const dynamoDbClient = new DynamoDBClient({ region, credentials });
  
  const docClient = DynamoDBDocumentClient.from(dynamoDbClient, {
    marshallOptions: {
      removeUndefinedValues: true,
      convertEmptyValues: false
    }
  });

  const s3Client = new S3Client({ region, credentials });

  console.log(`☁️  ${userType}: Using PRODUCTION AWS (DynamoDB & S3) - local endpoints ignored`);

  return { dynamoDbClient, docClient, s3Client };
};

