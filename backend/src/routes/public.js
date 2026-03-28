import { Router } from 'express';
import rateLimit from 'express-rate-limit';

import { createEnquiry } from '../controllers/enquiryController.js';
import { createBooking } from '../controllers/bookingController.js';
import { createFeedback } from '../controllers/feedbackController.js';
import { createContact } from '../controllers/contactController.js';
import {
  validateEnquiry,
  validateBooking,
  validateFeedback,
  validateContact,
} from '../middleware/validate.js';

const router = Router();

const formLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: 'Too many submissions. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post('/enquiries', formLimiter, validateEnquiry, createEnquiry);
router.post('/bookings', formLimiter, validateBooking, createBooking);
router.post('/feedback', formLimiter, validateFeedback, createFeedback);
router.post('/contacts', formLimiter, validateContact, createContact);

export default router;
