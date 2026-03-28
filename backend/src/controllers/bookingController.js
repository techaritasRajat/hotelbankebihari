import { submissionModel } from '../models/submissionModel.js';
import { resolveOrCreatePerson } from '../utils/personResolver.js';

export async function createBooking(req, res) {
  try {
    const { name, phone, email, checkIn, checkOut, adults, children } = req.body;

    const personId = await resolveOrCreatePerson({ name, phone, email, submissionType: 'booking' });

    const submission = await submissionModel.create({
      type: 'booking',
      personId,
      data: { name, phone, email, checkIn, checkOut, adults, children },
    });

    res.status(201).json({
      success: true,
      submissionId: submission.id,
      personId,
    });
  } catch (err) {
    console.error('createBooking error:', err);
    res.status(500).json({ error: 'Failed to save booking enquiry' });
  }
}
