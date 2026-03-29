import { useState } from 'react';
import './BookingForm.css';
import { Card, Input, Button, LoadingSpinner, Modal, UIcon } from '../ui';
import { submitBooking } from '../../services/apiService';

function BookingForm({ onSubmit, className = '' }) {
  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    adults: '2',
    children: '0',
    name: '',
    email: '',
    phone: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [apiError, setApiError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.checkIn) newErrors.checkIn = 'Check-in date is required';
    if (!formData.checkOut) newErrors.checkOut = 'Check-out date is required';
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.phone) newErrors.phone = 'Phone is required';

    // Validate adults
    const adults = parseInt(formData.adults);
    if (!formData.adults || isNaN(adults) || adults < 1 || adults > 10) {
      newErrors.adults = 'Adults must be between 1 and 10';
    }

    // Validate children (optional)
    const children = parseInt(formData.children || 0);
    if (isNaN(children) || children < 0 || children > 5) {
      newErrors.children = 'Children must be between 0 and 5';
    }

    if (formData.checkIn && formData.checkOut && formData.checkIn >= formData.checkOut) {
      newErrors.checkOut = 'Check-out must be after check-in';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setApiError('');

    try {
      await submitBooking({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        checkIn: formData.checkIn,
        checkOut: formData.checkOut,
        adults: parseInt(formData.adults, 10),
        children: parseInt(formData.children || 0, 10),
      });

      if (onSubmit) await onSubmit(formData);
      setShowSuccessModal(true);
    } catch (error) {
      console.error('Booking enquiry error:', error);
      setApiError(error.message || 'Failed to send booking enquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleModalClose = () => {
    setShowSuccessModal(false);
    setApiError('');
    // Reset form after modal closes
    setFormData({
      checkIn: '',
      checkOut: '',
      adults: '2',
      children: '0',
      name: '',
      email: '',
      phone: '',
    });
  };

  return (
    <Card className={`booking-form ${className}`} variant="elevated">
      {/* <h2 className="booking-form-title">Send Booking Enquiry</h2> */}
      {apiError && (
        <div className="booking-form-error" style={{ 
          padding: '12px', 
          marginBottom: '16px', 
          backgroundColor: '#fee', 
          color: '#c00', 
          borderRadius: '8px',
          border: '1px solid #fcc'
        }}>
          {apiError}
        </div>
      )}
      <form onSubmit={handleSubmit} className="booking-form-content">
        <div className="booking-form-row">
          <Input
            label="Check-in"
            type="date"
            name="checkIn"
            value={formData.checkIn}
            onChange={handleChange}
            error={errors.checkIn}
            required
          />
          <Input
            label="Check-out"
            type="date"
            name="checkOut"
            value={formData.checkOut}
            onChange={handleChange}
            error={errors.checkOut}
            required
          />
        </div>
        <div className="booking-form-row">
          <Input
            label="Adults"
            type="number"
            name="adults"
            value={formData.adults}
            onChange={handleChange}
            error={errors.adults}
            min="1"
            max="10"
            required
          />
          <Input
            label="Children"
            type="number"
            name="children"
            value={formData.children}
            onChange={handleChange}
            error={errors.children}
            min="0"
            max="5"
          />
        </div>
        <Input
          label="Full Name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          required
        />
        <Input
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          required
        />
        <Input
          label="Phone"
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          error={errors.phone}
          required
        />
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={isSubmitting}
          className="booking-form-submit"
        >
          {isSubmitting ? <LoadingSpinner size="sm" /> : 'Send Enquiry'}
        </Button>
      </form>

      <Modal
        isOpen={showSuccessModal}
        onClose={handleModalClose}
        title="Enquiry Submitted Successfully"
        className="booking-success-modal"
      >
        <div className="booking-success-content">
          <div className="success-icon">
            <UIcon name="fi-sr-check-circle" size="3rem" color="var(--color-primary-500)" />
          </div>
          <p className="success-message">
            Thank you for your interest in Banke Bihari Heritage Hotel. Our team will contact you shortly to confirm your booking details.
          </p>
          <Button
            variant="primary"
            onClick={handleModalClose}
            className="success-modal-button"
          >
            Close
          </Button>
        </div>
      </Modal>
    </Card>
  );
}

export default BookingForm;
