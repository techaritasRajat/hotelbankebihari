import './QuickContactSection.css';
import Container from '../layout/Container';
import { Card, Button, UIcon } from '../ui';

function QuickContactSection({ 
  title = 'Quick Booking & Enquiry',
  subtitle,
  contactInfo = {},
  className = '' 
}) {
  const handleWhatsAppClick = () => {
    if (contactInfo.whatsappNumber) {
      const cleanNumber = contactInfo.whatsappNumber.replace(/[^\d+]/g, '');
      window.open(`https://wa.me/${cleanNumber}`, '_blank');
    }
  };

  const handlePhoneClick = () => {
    if (contactInfo.phone) {
      window.location.href = `tel:${contactInfo.phone}`;
    }
  };

  const handleEmailClick = () => {
    if (contactInfo.email) {
      window.location.href = `mailto:${contactInfo.email}`;
    }
  };

  return (
    <section className={`quick-contact-section ${className}`} id="booking">
      <Container>
        <div className="quick-contact-section-content">
          <div className="quick-contact-section-header">
            {title && <h2 className="quick-contact-section-title">{title}</h2>}
            {subtitle && <p className="quick-contact-section-subtitle">{subtitle}</p>}
          </div>
          <div className="quick-contact-cards">
            {contactInfo.whatsappNumber && (
              <Card className="quick-contact-card" variant="elevated">
                <div className="quick-contact-card-icon">
                  <UIcon name="fi-brands-whatsapp" size="2rem" />
                </div>
                <h3 className="quick-contact-card-title">WhatsApp</h3>
                <p className="quick-contact-card-value">{contactInfo.whatsappNumber}</p>
                <p className="quick-contact-card-description">Chat with us instantly</p>
                <Button 
                  variant="primary" 
                  size="md" 
                  onClick={handleWhatsAppClick}
                  className="quick-contact-card-button"
                >
                  Open WhatsApp
                </Button>
              </Card>
            )}
            {contactInfo.phone && (
              <Card className="quick-contact-card" variant="elevated">
                <div className="quick-contact-card-icon">
                  <UIcon name="fi-sr-phone-call" size="2rem" />
                </div>
                <h3 className="quick-contact-card-title">Phone</h3>
                <p className="quick-contact-card-value">{contactInfo.phone}</p>
                <p className="quick-contact-card-description">Call us directly</p>
                <Button 
                  variant="primary" 
                  size="md" 
                  onClick={handlePhoneClick}
                  className="quick-contact-card-button"
                >
                  Call Now
                </Button>
              </Card>
            )}
            {contactInfo.email && (
              <Card className="quick-contact-card" variant="elevated">
                <div className="quick-contact-card-icon">
                  <UIcon name="fi-sr-envelope" size="2rem" />
                </div>
                <h3 className="quick-contact-card-title">Email</h3>
                <p className="quick-contact-card-value">{contactInfo.email}</p>
                <p className="quick-contact-card-description">Send us an email</p>
                <Button 
                  variant="primary" 
                  size="md" 
                  onClick={handleEmailClick}
                  className="quick-contact-card-button"
                >
                  Send Email
                </Button>
              </Card>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default QuickContactSection;
