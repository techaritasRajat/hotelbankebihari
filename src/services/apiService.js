const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

async function request(path, options = {}) {
  const url = `${BASE_URL}${path}`;
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const message = data.errors
      ? data.errors.map((e) => e.message).join(', ')
      : data.error || `Request failed (${res.status})`;
    throw new Error(message);
  }

  return data;
}

// ── Public form submissions ─────────────────────────────────────────────────

export function submitEnquiry(payload) {
  return request('/api/enquiries', { method: 'POST', body: JSON.stringify(payload) });
}

export function submitBooking(payload) {
  return request('/api/bookings', { method: 'POST', body: JSON.stringify(payload) });
}

export function submitFeedback(payload) {
  return request('/api/feedback', { method: 'POST', body: JSON.stringify(payload) });
}

export function submitContact(payload) {
  return request('/api/contacts', { method: 'POST', body: JSON.stringify(payload) });
}

// ── Admin ───────────────────────────────────────────────────────────────────

export function adminLogin(username, password) {
  return request('/api/admin/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });
}

export function getStats(token) {
  return request('/api/admin/stats', { headers: { Authorization: `Bearer ${token}` } });
}

export function getSubmissions(token, params = {}) {
  const q = new URLSearchParams();
  if (params.type) q.set('type', params.type);
  if (params.status) q.set('status', params.status);
  if (params.limit) q.set('limit', params.limit);
  if (params.lastKey) q.set('lastKey', params.lastKey);
  const qs = q.toString();
  return request(`/api/admin/submissions${qs ? `?${qs}` : ''}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export function getPersons(token, params = {}) {
  const q = new URLSearchParams();
  if (params.limit) q.set('limit', params.limit);
  if (params.lastKey) q.set('lastKey', params.lastKey);
  const qs = q.toString();
  return request(`/api/admin/persons${qs ? `?${qs}` : ''}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export function getPersonSubmissions(token, personId) {
  return request(`/api/admin/persons/${encodeURIComponent(personId)}/submissions`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export function updateSubmissionStatus(token, pk, sk, status) {
  return request(
    `/api/admin/submissions/${encodeURIComponent(pk)}/${encodeURIComponent(sk)}/status`,
    {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({ status }),
    }
  );
}

export function deleteSubmission(token, pk, sk) {
  return request(
    `/api/admin/submissions/${encodeURIComponent(pk)}/${encodeURIComponent(sk)}`,
    {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    }
  );
}
