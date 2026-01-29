import './TestimonialsSection.css';
import Container from '../layout/Container';
import { TestimonialCard } from '../features';

function TestimonialsSection({ 
  title, 
  subtitle,
  testimonials = [],
  className = '' 
}) {
  return (
    <section className={`testimonials-section ${className}`} id="testimonials">
      <Container>
        <div className="testimonials-section-header">
          {title && <h2 className="testimonials-section-title">{title}</h2>}
          {subtitle && <p className="testimonials-section-subtitle">{subtitle}</p>}
        </div>
        {testimonials.length > 0 && (
          <div className="testimonials-section-grid">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}

export default TestimonialsSection;
