import { Link } from 'react-router-dom';
import './PropertyCardsSection.css';
import Container from '../layout/Container';

const defaultProperties = [
  {
    id: 'heritage',
    title: 'Shree Banke Bihari Heritage Hotel',
    description:
      'Experience luxury and comfort in a beautifully restored heritage property. Our hotel blends traditional architecture with modern amenities for an unforgettable stay.',
    image: null,
    href: '/shree-banke-bihari-heritage',
    cta: 'Explore Hotel',
  },
  {
    id: 'bhojnalay',
    title: 'Banke Bihari Bhojnalaya',
    description:
      'Savour authentic pure vegetarian cuisine prepared with traditional recipes passed down through generations. A true taste of heritage dining in Maheshwar.',
    image: null,
    href: '/shree-banke-bihari-bhojnalay',
    cta: 'Visit Bhojnalaya',
  },
  {
    id: 'palace',
    title: 'Shree Banke Bihari Palace',
    description:
      'Step into royal grandeur with our majestic palace accommodation. Premium heritage rooms, exclusive amenities, and unmatched elegance await you.',
    image: null,
    href: '/shree-banke-bihari-palace',
    cta: 'Explore Palace',
  },
];

function PropertyCardsSection({
  title = 'Our Properties',
  subtitle = 'Discover our collection of heritage destinations in Maheshwar',
  properties = defaultProperties,
  id = 'about',
  className = '',
}) {
  return (
    <section className={`property-cards-section ${className}`} id={id}>
      <Container>
        <div className="property-cards-header">
          {title && <h2 className="property-cards-title">{title}</h2>}
          {subtitle && <p className="property-cards-subtitle">{subtitle}</p>}
        </div>
        <div className="property-cards-grid">
          {properties.map((property) => (
            <Link
              key={property.id}
              to={property.href}
              className="property-card"
            >
              <div className="property-card-image-wrapper">
                {property.image ? (
                  <img
                    src={property.image}
                    alt={property.title}
                    className="property-card-image"
                  />
                ) : (
                  <div className="property-card-image-placeholder">
                    <span className="property-card-image-placeholder-icon">🏛</span>
                  </div>
                )}
              </div>
              <div className="property-card-body">
                <h3 className="property-card-title">{property.title}</h3>
                <p className="property-card-description">{property.description}</p>
                <span className="property-card-cta">{property.cta} →</span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default PropertyCardsSection;
