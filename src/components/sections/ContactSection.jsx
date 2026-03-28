import { useState } from 'react';
import './ContactSection.css';
import Container from '../layout/Container';
import { Card, Input, Button, LoadingSpinner, Modal } from '../ui';
import { submitContact } from '../../services/apiService';

const INITIAL_FORM = { name: '', email: '', phone: '', message: '' };

function ContactSection({
  title,
  subtitle,
  contactInfo = {},
  mapEmbedUrl,
  className = '',
}) {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name] || errors._api) {
      setErrors((prev) => ({ ...prev, [name]: '', _api: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await submitContact({
        name: formData.name.trim(),
        phone: formData.phone.trim() || undefined,
        email: formData.email.trim() || undefined,
        message: formData.message.trim(),
      });
      setShowSuccess(true);
    } catch (err) {
      console.error('Contact submit error:', err);
      setErrors((prev) => ({ ...prev, _api: err.message || 'Failed to send message. Please try again.' }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleModalClose = () => {
    setShowSuccess(false);
    setFormData(INITIAL_FORM);
    setErrors({});
  };

  return (
    <section className={`contact-section ${className}`} id="contact">
      <Container>
        <div className="contact-section-header">
          {title && <h2 className="contact-section-title">{title}</h2>}
          {subtitle && <p className="contact-section-subtitle">{subtitle}</p>}
        </div>
        <div className="contact-section-content">
          <div className="contact-section-info">
            {mapEmbedUrl && (
              <div className="contact-map-wrapper">
                <iframe
                  title="Location Map"
                  src={mapEmbedUrl}
                  className="contact-map-iframe"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            )}
            {contactInfo.address && (
              <div className="contact-info-item">
                <h3 className="contact-info-label">Address</h3>
                <p className="contact-info-value">{contactInfo.address}</p>
              </div>
            )}
            {contactInfo.phone && (
              <div className="contact-info-item">
                <h3 className="contact-info-label">Phone</h3>
                <p className="contact-info-value">
                  <a href={`tel:${contactInfo.phone}`}>{contactInfo.phone}</a>
                </p>
              </div>
            )}
            {contactInfo.email && (
              <div className="contact-info-item">
                <h3 className="contact-info-label">Email</h3>
                <p className="contact-info-value">
                  <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
                </p>
              </div>
            )}
          </div>

          <Card className="contact-section-form-wrapper">
            {errors._api && (
              <div style={{ padding: '12px', marginBottom: '16px', backgroundColor: '#fee2e2', color: '#b91c1c', borderRadius: '8px', border: '1px solid #fca5a5', fontSize: '14px' }}>
                {errors._api}
              </div>
            )}
            <form onSubmit={handleSubmit} className="contact-section-form" noValidate>
              <Input
                label="Name"
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
              />
              <Input
                label="Phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                error={errors.phone}
              />
              <div className="contact-form-textarea-wrapper">
                <label htmlFor="contact-message" className="input-label">
                  Message
                  <span className="input-required"> *</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  className={`input contact-form-textarea${errors.message ? ' input--error' : ''}`}
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  required
                />
                {errors.message && <span className="input-error">{errors.message}</span>}
              </div>
              <Button type="submit" variant="primary" size="lg" disabled={isSubmitting}>
                {isSubmitting ? <LoadingSpinner size="sm" /> : 'Send Message'}
              </Button>
            </form>
          </Card>
        </div>
      </Container>

      <Modal
        isOpen={showSuccess}
        onClose={handleModalClose}
        title="Message Sent!"
        className="contact-success-modal"
      >
        <div style={{ textAlign: 'center', padding: '16px 0' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>✓</div>
          <p style={{ marginBottom: '24px', color: 'var(--color-text-secondary)' }}>
            Thank you for reaching out. Our team will get back to you shortly.
          </p>
          <Button variant="primary" onClick={handleModalClose}>Close</Button>
        </div>
      </Modal>
    </section>
  );
}

export default ContactSection;
