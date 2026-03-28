import { submissionModel } from '../models/submissionModel.js';
import { resolveOrCreatePerson } from '../utils/personResolver.js';

export async function createContact(req, res) {
  try {
    const { name, phone, email, message } = req.body;

    const personId = await resolveOrCreatePerson({ name, phone, email, submissionType: 'contact' });

    const submission = await submissionModel.create({
      type: 'contact',
      personId,
      data: { name, phone, email, message },
    });

    res.status(201).json({
      success: true,
      submissionId: submission.id,
      personId,
    });
  } catch (err) {
    console.error('createContact error:', err);
    res.status(500).json({ error: 'Failed to save contact message' });
  }
}
