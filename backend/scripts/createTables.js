/**
 * Creates DynamoDB tables locally (hotel-submissions-local and hotel-persons-local).
 * Run: npm run db:create
 *
 * Safe to re-run — skips creation if table already exists.
 */

import { DynamoDBClient, CreateTableCommand, DescribeTableCommand } from '@aws-sdk/client-dynamodb';
import 'dotenv/config';

const client = new DynamoDBClient({
  region: process.env.AWS_REGION || 'ap-south-1',
  endpoint: process.env.DYNAMODB_ENDPOINT || 'http://localhost:8000',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'local',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'local',
  },
});

async function tableExists(tableName) {
  try {
    await client.send(new DescribeTableCommand({ TableName: tableName }));
    return true;
  } catch {
    return false;
  }
}

const submissionsTableName = process.env.DYNAMODB_SUBMISSIONS_TABLE || 'hotel-submissions-local';
const personsTableName = process.env.DYNAMODB_PERSONS_TABLE || 'hotel-persons-local';

const submissionsTableDef = {
  TableName: submissionsTableName,
  BillingMode: 'PAY_PER_REQUEST',
  AttributeDefinitions: [
    { AttributeName: 'PK', AttributeType: 'S' },
    { AttributeName: 'SK', AttributeType: 'S' },
    { AttributeName: 'status', AttributeType: 'S' },
    { AttributeName: 'createdAt', AttributeType: 'S' },
    { AttributeName: 'personId', AttributeType: 'S' },
  ],
  KeySchema: [
    { AttributeName: 'PK', KeyType: 'HASH' },
    { AttributeName: 'SK', KeyType: 'RANGE' },
  ],
  GlobalSecondaryIndexes: [
    {
      IndexName: 'status-createdAt-index',
      KeySchema: [
        { AttributeName: 'status', KeyType: 'HASH' },
        { AttributeName: 'createdAt', KeyType: 'RANGE' },
      ],
      Projection: { ProjectionType: 'ALL' },
    },
    {
      IndexName: 'personId-createdAt-index',
      KeySchema: [
        { AttributeName: 'personId', KeyType: 'HASH' },
        { AttributeName: 'createdAt', KeyType: 'RANGE' },
      ],
      Projection: { ProjectionType: 'ALL' },
    },
  ],
};

const personsTableDef = {
  TableName: personsTableName,
  BillingMode: 'PAY_PER_REQUEST',
  AttributeDefinitions: [
    { AttributeName: 'PK', AttributeType: 'S' },
    { AttributeName: 'SK', AttributeType: 'S' },
    { AttributeName: 'email', AttributeType: 'S' },
  ],
  KeySchema: [
    { AttributeName: 'PK', KeyType: 'HASH' },
    { AttributeName: 'SK', KeyType: 'RANGE' },
  ],
  GlobalSecondaryIndexes: [
    {
      IndexName: 'email-index',
      KeySchema: [
        { AttributeName: 'email', KeyType: 'HASH' },
      ],
      Projection: { ProjectionType: 'ALL' },
    },
  ],
};

async function createTable(tableDef) {
  const name = tableDef.TableName;
  if (await tableExists(name)) {
    console.log(`  ✓ ${name} — already exists, skipping`);
    return;
  }
  await client.send(new CreateTableCommand(tableDef));
  console.log(`  ✓ ${name} — created`);
}

async function main() {
  console.log('Creating DynamoDB tables...');
  console.log(`  Endpoint: ${process.env.DYNAMODB_ENDPOINT || 'http://localhost:8000'}\n`);

  await createTable(submissionsTableDef);
  await createTable(personsTableDef);

  console.log('\nAll tables ready.');
}

main().catch((err) => {
  console.error('Error creating tables:', err.message);
  process.exit(1);
});
