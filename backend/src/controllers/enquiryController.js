import { submissionModel } from '../models/submissionModel.js';
import { resolveOrCreatePerson } from '../utils/personResolver.js';

export async function createEnquiry(req, res) {
  try {
    const { name, phone, email, service, message } = req.body;

    const personId = await resolveOrCreatePerson({ name, phone, email, submissionType: 'enquiry' });

    const submission = await submissionModel.create({
      type: 'enquiry',
      personId,
      data: { name, phone, email, service, message },
    });

    res.status(201).json({
      success: true,
      submissionId: submission.id,
      personId,
    });
  } catch (err) {
    console.error('createEnquiry error:', err);
    res.status(500).json({ error: 'Failed to save enquiry' });
  }
}
