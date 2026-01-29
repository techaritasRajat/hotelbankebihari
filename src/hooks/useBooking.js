import { useState } from 'react';
import { submitBooking } from '../services/bookingService';

function useBooking() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [booking, setBooking] = useState(null);

  const createBooking = async (bookingData) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await submitBooking(bookingData);
      setBooking(result);
      return result;
    } catch (err) {
      setError(err.message || 'Failed to create booking');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setBooking(null);
    setError(null);
  };

  return {
    createBooking,
    isLoading,
    error,
    booking,
    reset,
  };
}

export default useBooking;
