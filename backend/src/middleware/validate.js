import { z } from 'zod';

function validate(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const errors = result.error.errors.map((e) => ({
        field: e.path.join('.'),
        message: e.message,
      }));
      return res.status(400).json({ error: 'Validation failed', errors });
    }
    req.body = result.data;
    next();
  };
}

const phoneSchema = z
  .string()
  .regex(/^\+?[\d\s\-().]{7,20}$/, 'Invalid phone number')
  .optional();

const emailSchema = z.string().email('Invalid email address').optional();

const nameSchema = z.string().min(1, 'Name is required').max(100, 'Name too long').trim();

const messageSchema = z.string().max(1000, 'Message too long').trim().optional();

export const validateEnquiry = validate(
  z.object({
    name: nameSchema,
    phone: phoneSchema,
    email: emailSchema,
    service: z.enum(
      ['heritage', 'palace', 'bhojnalay', 'events', 'devotional', 'general'],
      { errorMap: () => ({ message: 'Invalid service type' }) }
    ),
    message: messageSchema,
  })
);

export const validateBooking = validate(
  z.object({
    name: nameSchema,
    phone: phoneSchema,
    email: emailSchema,
    checkIn: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'checkIn must be YYYY-MM-DD'),
    checkOut: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'checkOut must be YYYY-MM-DD'),
    adults: z.number().int().min(1).max(20),
    children: z.number().int().min(0).max(20).default(0),
  }).refine((d) => new Date(d.checkOut) > new Date(d.checkIn), {
    message: 'checkOut must be after checkIn',
    path: ['checkOut'],
  })
);

export const validateFeedback = validate(
  z.object({
    name: nameSchema,
    phone: phoneSchema,
    email: emailSchema,
    rating: z.number().int().min(1).max(5, 'Rating must be between 1 and 5'),
    message: z.string().min(1, 'Message is required').max(1000).trim(),
  })
);

export const validateContact = validate(
  z.object({
    name: nameSchema,
    phone: phoneSchema,
    email: emailSchema,
    message: z.string().min(1, 'Message is required').max(1000).trim(),
  })
);

export const validateLogin = validate(
  z.object({
    username: z.string().min(1, 'Username is required'),
    password: z.string().min(1, 'Password is required'),
  })
);

export const validateStatusUpdate = validate(
  z.object({
    status: z.enum(['new', 'read', 'resolved'], {
      errorMap: () => ({ message: 'Status must be new, read, or resolved' }),
    }),
  })
);
