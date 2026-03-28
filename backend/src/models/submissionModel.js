import { PutCommand, QueryCommand, UpdateCommand, DeleteCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { v4 as uuidv4 } from 'uuid';
import { docClient, TABLES } from './dynamodb.js';

const TABLE = TABLES.SUBMISSIONS;

function makePK(type) {
  return `TYPE#${type}`;
}

function makeSK(createdAt, id) {
  return `#${createdAt}#${id}`;
}

export const submissionModel = {
  async create({ type, personId, data }) {
    const id = uuidv4();
    const createdAt = new Date().toISOString();
    const PK = makePK(type);
    const SK = makeSK(createdAt, id);

    const item = {
      PK,
      SK,
      id,
      submissionType: type,
      personId,
      status: 'new',
      createdAt,
      data,
    };

    await docClient.send(new PutCommand({ TableName: TABLE, Item: item }));
    return item;
  },

  async listByType(type, { limit = 50, lastKey } = {}) {
    const params = {
      TableName: TABLE,
      KeyConditionExpression: 'PK = :pk',
      ExpressionAttributeValues: { ':pk': makePK(type) },
      ScanIndexForward: false,
      Limit: limit,
    };
    if (lastKey) params.ExclusiveStartKey = lastKey;

    const result = await docClient.send(new QueryCommand(params));
    return { items: result.Items || [], lastKey: result.LastEvaluatedKey };
  },

  async listAll({ status, limit = 50, lastKey } = {}) {
    if (status) {
      const params = {
        TableName: TABLE,
        IndexName: 'status-createdAt-index',
        KeyConditionExpression: '#s = :s',
        ExpressionAttributeNames: { '#s': 'status' },
        ExpressionAttributeValues: { ':s': status },
        ScanIndexForward: false,
        Limit: limit,
      };
      if (lastKey) params.ExclusiveStartKey = lastKey;
      const result = await docClient.send(new QueryCommand(params));
      return { items: result.Items || [], lastKey: result.LastEvaluatedKey };
    }

    const params = {
      TableName: TABLE,
      Limit: limit,
    };
    if (lastKey) params.ExclusiveStartKey = lastKey;
    const result = await docClient.send(new ScanCommand(params));
    return { items: result.Items || [], lastKey: result.LastEvaluatedKey };
  },

  async listByPerson(personId, { limit = 50 } = {}) {
    const result = await docClient.send(
      new QueryCommand({
        TableName: TABLE,
        IndexName: 'personId-createdAt-index',
        KeyConditionExpression: 'personId = :pid',
        ExpressionAttributeValues: { ':pid': personId },
        ScanIndexForward: false,
        Limit: limit,
      })
    );
    return result.Items || [];
  },

  async updateStatus(PK, SK, status) {
    await docClient.send(
      new UpdateCommand({
        TableName: TABLE,
        Key: { PK, SK },
        UpdateExpression: 'SET #s = :s, updatedAt = :u',
        ExpressionAttributeNames: { '#s': 'status' },
        ExpressionAttributeValues: {
          ':s': status,
          ':u': new Date().toISOString(),
        },
      })
    );
  },

  async remove(PK, SK) {
    await docClient.send(new DeleteCommand({ TableName: TABLE, Key: { PK, SK } }));
  },

  async countAll() {
    const today = new Date().toISOString().slice(0, 10);
    const all = [];
    let lastKey;

    do {
      const params = { TableName: TABLE, Limit: 1000 };
      if (lastKey) params.ExclusiveStartKey = lastKey;
      const result = await docClient.send(new ScanCommand(params));
      all.push(...(result.Items || []));
      lastKey = result.LastEvaluatedKey;
    } while (lastKey);

    const byType = { enquiry: 0, booking: 0, feedback: 0, contact: 0 };
    const byStatus = { new: 0, read: 0, resolved: 0 };
    let todayCount = 0;

    for (const item of all) {
      if (byType[item.submissionType] !== undefined) byType[item.submissionType]++;
      if (byStatus[item.status] !== undefined) byStatus[item.status]++;
      if (item.createdAt?.startsWith(today)) todayCount++;
    }

    return { total: all.length, today: todayCount, byType, byStatus };
  },
};
