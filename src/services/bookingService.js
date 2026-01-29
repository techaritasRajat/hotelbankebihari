import { api } from './api';

export async function submitBooking(bookingData) {
  try {
    const response = await api.post('/bookings', bookingData);
    return response;
  } catch (error) {
    console.error('Booking submission failed:', error);
    throw error;
  }
}

export async function getBookings() {
  try {
    const response = await api.get('/bookings');
    return response;
  } catch (error) {
    console.error('Failed to fetch bookings:', error);
    throw error;
  }
}

export async function getBookingById(id) {
  try {
    const response = await api.get(`/bookings/${id}`);
    return response;
  } catch (error) {
    console.error('Failed to fetch booking:', error);
    throw error;
  }
}

export async function cancelBooking(id) {
  try {
    const response = await api.delete(`/bookings/${id}`);
    return response;
  } catch (error) {
    console.error('Failed to cancel booking:', error);
    throw error;
  }
}
