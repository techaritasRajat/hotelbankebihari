import { useState } from 'react';
import Container from '../layout/Container';
import { Card, Input, Button, LoadingSpinner, Modal } from '../ui';
import { submitFeedback } from '../../services/apiService';

const INITIAL_FORM = { name: '', phone: '', email: '', rating: 0, message: '' };

function StarRating({ value, onChange }) {
  const [hovered, setHovered] = useState(0);

  return (
    <div style={{ display: 'flex', gap: '8px', marginBottom: '4px' }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '32px',
            color: star <= (hovered || value) ? '#f59e0b' : '#d1d5db',
            transition: 'color 0.15s',
            padding: '0 2px',
          }}
          aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
        >
          ★
        </button>
      ))}
    </div>
  );
}

function FeedbackSection({
  id = 'feedback',
  title = 'Share Your Experience',
  subtitle = 'Your feedback helps us serve you better',
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

  const handleRating = (rating) => {
    setFormData((prev) => ({ ...prev, rating }));
    if (errors.rating) setErrors((prev) => ({ ...prev, rating: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.rating) newErrors.rating = 'Please select a rating';
    if (!formData.message.trim()) newErrors.message = 'Please share your experience';
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
      await submitFeedback({
        name: formData.name.trim(),
        phone: formData.phone.trim() || undefined,
        email: formData.email.trim() || undefined,
        rating: formData.rating,
        message: formData.message.trim(),
      });
      setShowSuccess(true);
    } catch (err) {
      console.error('Feedback submit error:', err);
      setErrors((prev) => ({ ...prev, _api: err.message || 'Failed to submit feedback. Please try again.' }));
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
    <section className={`feedback-section ${className}`} id={id} style={{ padding: 'var(--spacing-16, 64px) 0' }}>
      <Container>
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            {title && <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '8px' }}>{title}</h2>}
            {subtitle && <p style={{ color: 'var(--color-text-secondary, #6b7280)' }}>{subtitle}</p>}
          </div>

          <Card variant="elevated" style={{ padding: '32px' }}>
            {errors._api && (
              <div style={{ padding: '12px', marginBottom: '16px', backgroundColor: '#fee2e2', color: '#b91c1c', borderRadius: '8px', border: '1px solid #fca5a5', fontSize: '14px' }}>
                {errors._api}
              </div>
            )}
            <form onSubmit={handleSubmit} noValidate>
              <Input
                label="Full Name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                placeholder="Your name"
                required
              />
              <Input
                label="Phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210 (optional)"
              />
              <Input
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                placeholder="you@example.com (optional)"
              />

              <div style={{ marginBottom: '16px' }}>
                <label className="input-label">
                  Rating <span className="input-required">*</span>
                </label>
                <StarRating value={formData.rating} onChange={handleRating} />
                {errors.rating && (
                  <span className="input-error" style={{ display: 'block', marginTop: '4px' }}>{errors.rating}</span>
                )}
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label htmlFor="feedback-message" className="input-label">
                  Your Experience <span className="input-required">*</span>
                </label>
                <textarea
                  id="feedback-message"
                  name="message"
                  className={`input${errors.message ? ' input--error' : ''}`}
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Tell us about your stay or visit..."
                  style={{ resize: 'vertical', minHeight: '100px' }}
                />
                {errors.message && <span className="input-error">{errors.message}</span>}
              </div>

              <Button type="submit" variant="primary" size="lg" disabled={isSubmitting} style={{ width: '100%' }}>
                {isSubmitting ? <LoadingSpinner size="sm" /> : 'Submit Feedback'}
              </Button>
            </form>
          </Card>
        </div>
      </Container>

      <Modal isOpen={showSuccess} onClose={handleModalClose} title="Thank You!" className="feedback-success-modal">
        <div style={{ textAlign: 'center', padding: '16px 0' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🙏</div>
          <p style={{ marginBottom: '24px', color: 'var(--color-text-secondary)' }}>
            Thank you for sharing your experience. Your feedback means a lot to us!
          </p>
          <Button variant="primary" onClick={handleModalClose}>Close</Button>
        </div>
      </Modal>
    </section>
  );
}

export default FeedbackSection;
