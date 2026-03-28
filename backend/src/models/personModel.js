import { GetCommand, PutCommand, UpdateCommand, QueryCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { docClient, TABLES } from './dynamodb.js';

const TABLE = TABLES.PERSONS;

function addToTypeList(existing, newType) {
  if (!existing || !Array.isArray(existing)) return [newType];
  if (existing.includes(newType)) return existing;
  return [...existing, newType];
}

export const personModel = {
  async findByPhone(normalizedPhone) {
    const result = await docClient.send(
      new GetCommand({
        TableName: TABLE,
        Key: { PK: `PERSON#${normalizedPhone}`, SK: 'PROFILE' },
      })
    );
    return result.Item || null;
  },

  async findByEmail(email) {
    const result = await docClient.send(
      new QueryCommand({
        TableName: TABLE,
        IndexName: 'email-index',
        KeyConditionExpression: 'email = :e',
        ExpressionAttributeValues: { ':e': email },
        Limit: 1,
      })
    );
    return result.Items?.[0] || null;
  },

  async upsert({ personId, name, email, phone, submissionType }) {
    const now = new Date().toISOString();

    const existing = await docClient.send(
      new GetCommand({ TableName: TABLE, Key: { PK: personId, SK: 'PROFILE' } })
    );

    if (existing.Item) {
      const updatedTypes = addToTypeList(existing.Item.submissionTypes, submissionType);

      const updateExprParts = [
        '#name = :name',
        'lastSeenAt = :now',
        'submissionCount = submissionCount + :one',
        'submissionTypes = :types',
      ];
      const exprNames = { '#name': 'name' };
      const exprValues = {
        ':name': name,
        ':now': now,
        ':one': 1,
        ':types': updatedTypes,
      };

      if (email) {
        updateExprParts.push('email = :email');
        exprValues[':email'] = email;
      }
      if (phone && !existing.Item.phone) {
        updateExprParts.push('phone = :phone');
        exprValues[':phone'] = phone;
      }

      await docClient.send(
        new UpdateCommand({
          TableName: TABLE,
          Key: { PK: personId, SK: 'PROFILE' },
          UpdateExpression: `SET ${updateExprParts.join(', ')}`,
          ExpressionAttributeNames: exprNames,
          ExpressionAttributeValues: exprValues,
        })
      );
      return { ...existing.Item, lastSeenAt: now };
    }

    const item = {
      PK: personId,
      SK: 'PROFILE',
      personId,
      name,
      phone: phone || undefined,
      email: email || undefined,
      firstSeenAt: now,
      lastSeenAt: now,
      submissionCount: 1,
      submissionTypes: [submissionType],
    };

    await docClient.send(new PutCommand({ TableName: TABLE, Item: item }));
    return item;
  },

  async list({ limit = 50, lastKey } = {}) {
    const params = {
      TableName: TABLE,
      FilterExpression: 'SK = :sk',
      ExpressionAttributeValues: { ':sk': 'PROFILE' },
      Limit: Math.min(limit * 3, 300),
    };
    if (lastKey) params.ExclusiveStartKey = lastKey;

    const result = await docClient.send(new ScanCommand(params));
    const items = (result.Items || [])
      .sort((a, b) => (b.lastSeenAt > a.lastSeenAt ? 1 : -1))
      .slice(0, limit);

    return { items, lastKey: result.LastEvaluatedKey };
  },
};
