import './BookingSection.css';
import Container from '../layout/Container';
import { BookingForm } from '../features';

function BookingSection({ 
  eyebrow,
  title, 
  subtitle,
  onSubmit,
  whatsappNumber,
  id = 'booking',
  className = '' 
}) {
  return (
    <section className={`booking-section ${className}`} id={id}>
      <Container>
        <div className="booking-section-content">
          <div className="booking-section-header">
            {eyebrow && <span className="section-eyebrow">{eyebrow}</span>}
            {title && <h2 className="booking-section-title">{title}</h2>}
            {subtitle && <p className="booking-section-subtitle">{subtitle}</p>}
          </div>
          <div className="booking-section-form-wrapper">
            <BookingForm onSubmit={onSubmit} whatsappNumber={whatsappNumber} />
          </div>
        </div>
      </Container>
    </section>
  );
}

export default BookingSection;
