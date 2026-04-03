import './AmenitiesSection.css';
import Container from '../layout/Container';
import { AmenityCard } from '../features';

function AmenitiesSection({ 
  eyebrow,
  title, 
  subtitle,
  amenities = [],
  className = '' 
}) {
  return (
    <section className={`amenities-section ${className}`} id="amenities">
      <Container>
        <div className="amenities-section-header">
          {eyebrow && <span className="section-eyebrow">{eyebrow}</span>}
          {title && <h2 className="amenities-section-title">{title}</h2>}
          {subtitle && <p className="amenities-section-subtitle">{subtitle}</p>}
        </div>
        {amenities.length > 0 && (
          <div className="amenities-section-grid">
            {amenities.map((amenity, index) => (
              <AmenityCard key={index} amenity={amenity} />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}

export default AmenitiesSection;
