import './ContactSection.css';
import Container from '../layout/Container';
import { Card, Input, Button } from '../ui';

function ContactSection({ 
  title, 
  subtitle,
  contactInfo = {},
  onSubmit,
  className = '' 
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    if (onSubmit) {
      onSubmit(data);
    }
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
            <form onSubmit={handleSubmit} className="contact-section-form">
              <Input
                label="Name"
                type="text"
                name="name"
                required
              />
              <Input
                label="Email"
                type="email"
                name="email"
                required
              />
              <Input
                label="Subject"
                type="text"
                name="subject"
                required
              />
              <div className="contact-form-textarea-wrapper">
                <label htmlFor="message" className="input-label">
                  Message
                  <span className="input-required">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="input contact-form-textarea"
                  rows="5"
                  required
                />
              </div>
              <Button type="submit" variant="primary" size="lg">
                Send Message
              </Button>
            </form>
          </Card>
        </div>
      </Container>
    </section>
  );
}

export default ContactSection;
