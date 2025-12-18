import express from 'express';
import { DescribeTableCommand } from '@aws-sdk/client-dynamodb';
import { ListBucketsCommand } from '@aws-sdk/client-s3';
import { dynamoDbClient } from '../config/aws.buyer.config.js';
import { s3Client, TABLES } from '../config/aws.buyer.config.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const health = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      services: {}
    };

    // Check DynamoDB
    try {
      await dynamoDbClient.send(new DescribeTableCommand({ TableName: TABLES.BUYERS }));
      health.services.dynamodb = 'connected';
    } catch (error) {
      health.services.dynamodb = 'disconnected';
      health.status = 'degraded';
    }

    // Check S3
    try {
      await s3Client.send(new ListBucketsCommand({}));
      health.services.s3 = 'connected';
    } catch (error) {
      health.services.s3 = 'disconnected';
      health.status = 'degraded';
    }

    res.json(health);
  } catch (error) {
    res.status(500).json({
      status: 'unhealthy',
      error: error.message
    });
  }
});

export default router;

