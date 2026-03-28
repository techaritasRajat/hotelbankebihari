import { Router } from 'express';
import rateLimit from 'express-rate-limit';

import { requireAuth } from '../middleware/auth.js';
import { validateLogin, validateStatusUpdate } from '../middleware/validate.js';
import {
  login,
  getSubmissions,
  getPersons,
  getPersonSubmissions,
  updateStatus,
  deleteSubmission,
  getStats,
} from '../controllers/adminController.js';

const router = Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: 'Too many login attempts. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post('/login', loginLimiter, validateLogin, login);

router.use(requireAuth);

router.get('/submissions', getSubmissions);
router.get('/persons', getPersons);
router.get('/persons/:personId/submissions', getPersonSubmissions);
router.patch('/submissions/:pk/:sk/status', validateStatusUpdate, updateStatus);
router.delete('/submissions/:pk/:sk', deleteSubmission);
router.get('/stats', getStats);

export default router;
