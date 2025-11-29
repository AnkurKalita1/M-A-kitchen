import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { S3Client } from '@aws-sdk/client-s3';

export const dynamoDbClient = new DynamoDBClient({
  region: process.env.AWS_REGION || 'us-east-1',
  endpoint: process.env.DYNAMODB_ENDPOINT || 'http://localhost:8000',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'test',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'test'
  }
});

export const docClient = DynamoDBDocumentClient.from(dynamoDbClient, {
  marshallOptions: {
    removeUndefinedValues: true,
    convertEmptyValues: false
  }
});

export const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'us-east-1',
  endpoint: process.env.S3_ENDPOINT || 'http://localhost:4566',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'test',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'test'
  },
  forcePathStyle: true // Required for LocalStack
});

export const TABLES = {
  BUYERS: 'MAKitchen-Buyers',
  SELLERS: 'MAKitchen-Sellers',
  AGENTS: 'MAKitchen-Agents'
};

export const BUCKET_NAME = process.env.S3_BUCKET_NAME || 'ma-kitchen-documents';

 
