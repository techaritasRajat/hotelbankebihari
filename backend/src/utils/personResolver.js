import { v4 as uuidv4 } from 'uuid';
import { personModel } from '../models/personModel.js';
import { normalizePhone, makePersonId, makeAnonPersonId } from './phoneNormalizer.js';

/**
 * Resolves or creates a person record given contact data from a form submission.
 *
 * Resolution order:
 * 1. Normalize phone → lookup by phone PK
 * 2. If not found, lookup by email GSI
 * 3. If still not found, create new person record
 * 4. If neither phone nor email, create anonymous person
 *
 * Returns the personId string used as FK on the submission.
 */
export async function resolveOrCreatePerson({ name, phone, email, submissionType }) {
  const normalizedPhone = normalizePhone(phone);

  // 1. Lookup by phone (primary identifier)
  if (normalizedPhone) {
    const personId = makePersonId(normalizedPhone);
    const existing = await personModel.findByPhone(normalizedPhone);

    if (existing) {
      await personModel.upsert({ personId, name, email, phone: normalizedPhone, submissionType });
      return personId;
    }

    // Not found by phone — check email before creating new
    if (email) {
      const byEmail = await personModel.findByEmail(email);
      if (byEmail) {
        // Person exists via email — merge phone into their record
        await personModel.upsert({
          personId: byEmail.PK,
          name,
          email,
          phone: normalizedPhone,
          submissionType,
        });
        return byEmail.PK;
      }
    }

    // New person — phone known
    await personModel.upsert({ personId, name, email, phone: normalizedPhone, submissionType });
    return personId;
  }

  // 2. No phone — try email
  if (email) {
    const byEmail = await personModel.findByEmail(email);
    if (byEmail) {
      await personModel.upsert({
        personId: byEmail.PK,
        name,
        email,
        phone: null,
        submissionType,
      });
      return byEmail.PK;
    }

    // New person — email only
    const personId = `PERSON#EMAIL#${email}`;
    await personModel.upsert({ personId, name, email, phone: null, submissionType });
    return personId;
  }

  // 3. Anonymous — no phone, no email
  const personId = makeAnonPersonId(uuidv4());
  await personModel.upsert({ personId, name, email: null, phone: null, submissionType });
  return personId;
}
