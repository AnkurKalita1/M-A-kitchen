export const TABLES = {
  BUYERS: 'MAKitchen-Buyers',
  SELLERS: 'MAKitchen-Sellers',
  AGENTS: 'MAKitchen-Agents'
};

export const BUCKET_NAME = process.env?.S3_BUCKET_NAME || 'ma-kitchen-documents';
