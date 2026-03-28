// DynamoDB DocumentClient — implemented in Phase 1
// Uses DYNAMODB_ENDPOINT from env for local dev; omit for AWS Lambda

import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

const clientConfig = {
  region: process.env.AWS_REGION || 'ap-south-1',
};

if (process.env.DYNAMODB_ENDPOINT) {
  clientConfig.endpoint = process.env.DYNAMODB_ENDPOINT;
  clientConfig.credentials = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'local',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'local',
  };
}

const client = new DynamoDBClient(clientConfig);

export const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

export const TABLES = {
  SUBMISSIONS: process.env.DYNAMODB_SUBMISSIONS_TABLE || 'hotel-submissions-local',
  PERSONS: process.env.DYNAMODB_PERSONS_TABLE || 'hotel-persons-local',
};
