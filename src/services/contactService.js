import { api } from './api';

export async function submitContactForm(contactData) {
  try {
    const response = await api.post('/contact', contactData);
    return response;
  } catch (error) {
    console.error('Contact form submission failed:', error);
    throw error;
  }
}

export async function getContactMessages() {
  try {
    const response = await api.get('/contact');
    return response;
  } catch (error) {
    console.error('Failed to fetch contact messages:', error);
    throw error;
  }
}
