import { createAwsClients } from './aws.shared.js';
import { TABLES, BUCKET_NAME } from './aws.config.js';

const { dynamoDbClient, docClient, s3Client } = createAwsClients('Buyer');

export { dynamoDbClient, docClient, s3Client, TABLES, BUCKET_NAME };

