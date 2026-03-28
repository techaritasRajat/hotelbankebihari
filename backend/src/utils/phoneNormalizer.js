/**
 * Normalizes a phone number to a consistent key format for DynamoDB.
 *
 * Rules:
 * - Strip all non-digit characters (+, spaces, dashes, parentheses)
 * - If 10 digits remain and doesn't start with 91, prepend 91 (India default)
 * - If already 12 digits starting with 91, keep as-is
 * - Returns null if the result is not 10–15 digits
 */
export function normalizePhone(raw) {
  if (!raw) return null;

  const digits = String(raw).replace(/\D/g, '');

  if (!digits) return null;

  let normalized = digits;

  // 10-digit Indian number — add country code
  if (normalized.length === 10) {
    normalized = `91${normalized}`;
  }

  // Strip leading 0 (some users enter 0XXXXXXXXXX)
  if (normalized.startsWith('0') && normalized.length === 11) {
    normalized = `91${normalized.slice(1)}`;
  }

  // Validate final length (10–15 digits per E.164)
  if (normalized.length < 10 || normalized.length > 15) {
    return null;
  }

  return normalized;
}

export function makePersonId(normalizedPhone) {
  return `PERSON#${normalizedPhone}`;
}

export function makeAnonPersonId(uuid) {
  return `PERSON#ANON#${uuid}`;
}
