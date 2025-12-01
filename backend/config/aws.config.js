import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { S3Client } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load .env file BEFORE creating AWS clients
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const envPath = join(__dirname, '..', '.env');
dotenv.config({ path: envPath });

// DynamoDB Client - Use AWS if endpoint not specified
const dynamoDbConfig = {
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'test',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'test'
  }
};

// Only add endpoint if specified (for local development)
if (process.env.DYNAMODB_ENDPOINT) {
  dynamoDbConfig.endpoint = process.env.DYNAMODB_ENDPOINT;
}

export const dynamoDbClient = new DynamoDBClient(dynamoDbConfig);

export const docClient = DynamoDBDocumentClient.from(dynamoDbClient, {
  marshallOptions: {
    removeUndefinedValues: true,
    convertEmptyValues: false
  }
});

// S3 Client - Use AWS if endpoint not specified
const s3Config = {
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'test',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'test'
  }
};

// Only add endpoint if specified (for local development)
if (process.env.S3_ENDPOINT) {
  s3Config.endpoint = process.env.S3_ENDPOINT;
  s3Config.forcePathStyle = true; // Required for LocalStack
}

export const s3Client = new S3Client(s3Config);

export const TABLES = {
  BUYERS: 'MAKitchen-Buyers',
  SELLERS: 'MAKitchen-Sellers',
  AGENTS: 'MAKitchen-Agents'
};

export const BUCKET_NAME = process.env.S3_BUCKET_NAME || 'ma-kitchen-documents';

 
