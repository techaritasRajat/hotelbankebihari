import { useState } from 'react';
import './BookingForm.css';
import { Card, Input, Button, LoadingSpinner, Modal } from '../ui';

function BookingForm({ onSubmit, className = '', whatsappNumber }) {
  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    guests: '1',
    name: '',
    email: '',
    phone: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

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

    if (formData.checkIn && formData.checkOut && formData.checkIn >= formData.checkOut) {
      newErrors.checkOut = 'Check-out must be after check-in';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatWhatsAppMessage = (data) => {
    const checkInDate = new Date(data.checkIn).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
    const checkOutDate = new Date(data.checkOut).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

    const message = `*New Booking Enquiry*

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}

Check-in: ${checkInDate}
Check-out: ${checkOutDate}
Guests: ${data.guests}`;

    return encodeURIComponent(message);
  };

  const sendWhatsAppEnquiry = (data) => {
    if (!whatsappNumber) {
      console.error('WhatsApp number not configured');
      return;
    }

    const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '');
    const message = formatWhatsAppMessage(data);
    const whatsappUrl = `https://wa.me/${cleanNumber}?text=${message}`;
    
    window.open(whatsappUrl, '_blank');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      // Send WhatsApp enquiry
      sendWhatsAppEnquiry(formData);
      
      // Call onSubmit if provided
      if (onSubmit) {
        await onSubmit(formData);
      }
      
      // Show success modal
      setShowSuccessModal(true);
    } catch (error) {
      console.error('Booking enquiry error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleModalClose = () => {
    setShowSuccessModal(false);
    // Reset form after modal closes
    setFormData({
      checkIn: '',
      checkOut: '',
      guests: '1',
      name: '',
      email: '',
      phone: '',
    });
  };

  return (
    <Card className={`booking-form ${className}`} variant="elevated">
      {/* <h2 className="booking-form-title">Send Booking Enquiry</h2> */}
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
        <Input
          label="Guests"
          type="number"
          name="guests"
          value={formData.guests}
          onChange={handleChange}
          min="1"
          max="10"
          required
        />
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
          <div className="success-icon">✓</div>
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
