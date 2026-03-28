import { submissionModel } from '../models/submissionModel.js';
import { resolveOrCreatePerson } from '../utils/personResolver.js';

export async function createFeedback(req, res) {
  try {
    const { name, phone, email, rating, message } = req.body;

    const personId = await resolveOrCreatePerson({ name, phone, email, submissionType: 'feedback' });

    const submission = await submissionModel.create({
      type: 'feedback',
      personId,
      data: { name, phone, email, rating, message },
    });

    res.status(201).json({
      success: true,
      submissionId: submission.id,
      personId,
    });
  } catch (err) {
    console.error('createFeedback error:', err);
    res.status(500).json({ error: 'Failed to save feedback' });
  }
}
