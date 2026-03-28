import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { submissionModel } from '../models/submissionModel.js';
import { personModel } from '../models/personModel.js';

export async function login(req, res) {
  try {
    const { username, password } = req.body;

    const expectedUsername = process.env.ADMIN_USERNAME;
    const passwordHash = process.env.ADMIN_PASSWORD_HASH;
    const secret = process.env.JWT_SECRET;

    if (!expectedUsername || !passwordHash || !secret) {
      console.error('Admin credentials not configured in environment');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    if (username !== expectedUsername) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, passwordHash);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ username, role: 'admin' }, secret, { expiresIn: '8h' });
    res.json({ token });
  } catch (err) {
    console.error('login error:', err);
    res.status(500).json({ error: 'Login failed' });
  }
}

export async function getSubmissions(req, res) {
  try {
    const { type, status, limit = '50', lastKey } = req.query;
    const parsedLimit = Math.min(parseInt(limit, 10) || 50, 100);
    const parsedLastKey = lastKey ? JSON.parse(decodeURIComponent(lastKey)) : undefined;

    let result;
    if (type) {
      result = await submissionModel.listByType(type, {
        limit: parsedLimit,
        lastKey: parsedLastKey,
      });
    } else {
      result = await submissionModel.listAll({
        status,
        limit: parsedLimit,
        lastKey: parsedLastKey,
      });
    }

    res.json({
      items: result.items,
      lastKey: result.lastKey
        ? encodeURIComponent(JSON.stringify(result.lastKey))
        : null,
    });
  } catch (err) {
    console.error('getSubmissions error:', err);
    res.status(500).json({ error: 'Failed to fetch submissions' });
  }
}

export async function getPersons(req, res) {
  try {
    const { limit = '50', lastKey } = req.query;
    const parsedLimit = Math.min(parseInt(limit, 10) || 50, 100);
    const parsedLastKey = lastKey ? JSON.parse(decodeURIComponent(lastKey)) : undefined;

    const result = await personModel.list({ limit: parsedLimit, lastKey: parsedLastKey });

    res.json({
      items: result.items,
      lastKey: result.lastKey
        ? encodeURIComponent(JSON.stringify(result.lastKey))
        : null,
    });
  } catch (err) {
    console.error('getPersons error:', err);
    res.status(500).json({ error: 'Failed to fetch persons' });
  }
}

export async function getPersonSubmissions(req, res) {
  try {
    const { personId } = req.params;
    const decodedPersonId = decodeURIComponent(personId);

    const [person, submissions] = await Promise.all([
      personModel.findByPhone(decodedPersonId.replace('PERSON#', '')).catch(() => null),
      submissionModel.listByPerson(decodedPersonId),
    ]);

    res.json({ person: person || { personId: decodedPersonId }, submissions });
  } catch (err) {
    console.error('getPersonSubmissions error:', err);
    res.status(500).json({ error: 'Failed to fetch person submissions' });
  }
}

export async function updateStatus(req, res) {
  try {
    const { pk, sk } = req.params;
    const { status } = req.body;

    const PK = decodeURIComponent(pk);
    const SK = decodeURIComponent(sk);

    await submissionModel.updateStatus(PK, SK, status);
    res.json({ success: true });
  } catch (err) {
    console.error('updateStatus error:', err);
    res.status(500).json({ error: 'Failed to update status' });
  }
}

export async function deleteSubmission(req, res) {
  try {
    const { pk, sk } = req.params;
    const PK = decodeURIComponent(pk);
    const SK = decodeURIComponent(sk);

    await submissionModel.remove(PK, SK);
    res.json({ success: true });
  } catch (err) {
    console.error('deleteSubmission error:', err);
    res.status(500).json({ error: 'Failed to delete submission' });
  }
}

export async function getStats(req, res) {
  try {
    const stats = await submissionModel.countAll();
    res.json(stats);
  } catch (err) {
    console.error('getStats error:', err);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
}
