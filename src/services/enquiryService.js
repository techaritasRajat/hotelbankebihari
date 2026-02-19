const STORAGE_KEY = 'bb_enquiries';

/**
 * Save a new enquiry to localStorage. Newest entries are prepended.
 * @param {Object} data - { name, phone, email, service, message }
 * @returns {Object} The saved enquiry with id and submittedAt
 */
export function saveEnquiry(data) {
  const enquiry = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    submittedAt: new Date().toISOString(),
    name: data.name?.trim() || '',
    phone: data.phone?.trim() || '',
    email: data.email?.trim() || '',
    service: data.service || '',
    message: data.message?.trim() || '',
  };

  const existing = getEnquiries();
  const updated = [enquiry, ...existing];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return enquiry;
}

/**
 * Retrieve all enquiries from localStorage, sorted newest first.
 * @returns {Array} Array of enquiry objects
 */
export function getEnquiries() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/**
 * Delete all enquiries from localStorage.
 */
export function clearEnquiries() {
  localStorage.removeItem(STORAGE_KEY);
}
