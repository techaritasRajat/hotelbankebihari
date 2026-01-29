import './BookingSection.css';
import Container from '../layout/Container';
import { BookingForm } from '../features';

function BookingSection({ 
  title, 
  subtitle,
  onSubmit,
  whatsappNumber,
  className = '' 
}) {
  return (
    <section className={`booking-section ${className}`} id="booking">
      <Container>
        <div className="booking-section-content">
          <div className="booking-section-header">
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
