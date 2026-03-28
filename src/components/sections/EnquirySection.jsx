import { useState } from 'react';
import './EnquirySection.css';
import Container from '../layout/Container';
import { Card, Input, Button, LoadingSpinner, Modal } from '../ui';
import { submitEnquiry } from '../../services/apiService';

const SERVICE_GROUPS = [
  {
    label: 'Stays & Dining',
    options: [
      { value: 'heritage', label: '🏨  Heritage Hotel Stay' },
      { value: 'palace', label: '🏰  Palace Stay' },
      { value: 'bhojnalay', label: '🍽  Bhojnalay (Traditional Dining)' },
    ],
  },
  {
    label: 'Events & Ceremonies',
    options: [
      { value: 'events', label: '🎉  Events & Celebrations (Wedding / Corporate / Banquet)' },
      { value: 'devotional', label: '🙏  Devotional & Kirtan Ceremonies' },
    ],
  },
  {
    label: 'Other',
    options: [
      { value: 'general', label: '💬  General Enquiry' },
    ],
  },
];

const INITIAL_FORM = {
  name: '',
  phone: '',
  email: '',
  service: '',
  message: '',
};

function EnquirySection({
  id = 'enquiry',
  title = 'Send an Enquiry',
  subtitle = 'Reach out to us and our team will get back to you shortly',
  className = '',
}) {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s\-()]{7,15}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.service) newErrors.service = 'Please select a service';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await submitEnquiry({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        service: formData.service,
        message: formData.message.trim() || undefined,
      });
      setShowSuccess(true);
    } catch (err) {
      console.error('Enquiry submit error:', err);
      setErrors((prev) => ({ ...prev, _api: err.message || 'Failed to submit. Please try again.' }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleModalClose = () => {
    setShowSuccess(false);
    setFormData(INITIAL_FORM);
    setErrors({});
  };

  const handleFormChange = (e) => {
    handleChange(e);
    if (errors._api) setErrors((prev) => ({ ...prev, _api: '' }));
  };

  return (
    <section className={`enquiry-section ${className}`} id={id}>
      <Container>
        <div className="enquiry-section-content">
          <div className="enquiry-section-header">
            {title && <h2 className="enquiry-section-title">{title}</h2>}
            {subtitle && <p className="enquiry-section-subtitle">{subtitle}</p>}
          </div>

          <Card className="enquiry-section-card" variant="elevated">
            {errors._api && (
              <div style={{ padding: '12px', marginBottom: '16px', backgroundColor: '#fee2e2', color: '#b91c1c', borderRadius: '8px', border: '1px solid #fca5a5', fontSize: '14px' }}>
                {errors._api}
              </div>
            )}
            <form onSubmit={handleSubmit} className="enquiry-form" noValidate>
              <div className="enquiry-form-row">
                <Input
                  label="Full Name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  error={errors.name}
                  placeholder="Your full name"
                  required
                />
                <Input
                  label="Phone Number"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  error={errors.phone}
                  placeholder="+91 98765 43210"
                  required
                />
              </div>

              <Input
                label="Email Address"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                placeholder="you@example.com"
                required
              />

              <div className={`enquiry-form-field${errors.service ? ' enquiry-field--error' : ''}`}>
                <label htmlFor="enquiry-service" className="input-label">
                  Service Enquiry
                  <span className="input-required">*</span>
                </label>
                <select
                  id="enquiry-service"
                  name="service"
                  className={`input enquiry-select${errors.service ? ' enquiry-select--error' : ''}`}
                  value={formData.service}
                  onChange={handleChange}
                >
                  <option value="" disabled>Select a service...</option>
                  {SERVICE_GROUPS.map((group) => (
                    <optgroup key={group.label} label={group.label}>
                      {group.options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
                {errors.service && (
                  <span className="input-error">{errors.service}</span>
                )}
              </div>

              <div className="enquiry-form-field">
                <label htmlFor="enquiry-message" className="input-label">
                  Message / Query
                  <span className="input-optional"> (optional)</span>
                </label>
                <textarea
                  id="enquiry-message"
                  name="message"
                  className="input enquiry-textarea"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us how we can help you... (For events, mention the type: wedding, corporate, banquet, etc.)"
                  rows={4}
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={isSubmitting}
                className="enquiry-submit-btn"
              >
                {isSubmitting ? <LoadingSpinner size="sm" /> : 'Submit Enquiry'}
              </Button>
            </form>
          </Card>
        </div>
      </Container>

      <Modal
        isOpen={showSuccess}
        onClose={handleModalClose}
        title="Enquiry Submitted!"
        className="enquiry-success-modal"
      >
        <div className="enquiry-success-content">
          <div className="enquiry-success-icon">✓</div>
          <p className="enquiry-success-message">
            Thank you for reaching out to Banke Bihari Maheshwar. We have received your enquiry and our team will get back to you shortly.
          </p>
          <Button variant="primary" onClick={handleModalClose} className="enquiry-success-btn">
            Close
          </Button>
        </div>
      </Modal>
    </section>
  );
}

export default EnquirySection;
