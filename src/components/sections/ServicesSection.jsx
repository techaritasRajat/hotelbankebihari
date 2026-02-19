import { Link } from 'react-router-dom';
import './PropertyCardsSection.css';
import './ServicesSection.css';
import Container from '../layout/Container';

const services = [
  // ── Stays & Dining ──────────────────────────────────────────────
  {
    id: 'heritage-stay',
    category: 'Stays & Dining',
    icon: '🏨',
    title: 'Luxury Heritage Experience',
    description:
      'Immerse yourself in the timeless elegance of Shree Banke Bihari Heritage Hotel. Beautifully restored rooms, period-inspired interiors, and modern comforts come together to offer a stay that feels both regal and deeply personal.',
    cta: 'Explore Hotel',
    href: '/shree-banke-bihari-heritage',
  },
  {
    id: 'palace-stay',
    category: 'Stays & Dining',
    icon: '🏰',
    title: 'Royal & Affordable Palace Stay',
    description:
      'Experience the grandeur of royalty without compromise at Shree Banke Bihari Palace. Well-appointed rooms, heritage ambiance, and warm hospitality deliver a regal getaway that is accessible to every traveller.',
    cta: 'Explore Palace',
    href: '/shree-banke-bihari-palace',
  },
  {
    id: 'dining',
    category: 'Stays & Dining',
    icon: '🍽',
    title: 'Authentic Traditional Dining',
    description:
      'Rediscover the flavours of heritage at Banke Bihari Bhojnalaya. Our chefs craft pure vegetarian meals using time-honoured recipes and fresh, local produce — a soulful culinary journey rooted in tradition and taste.',
    cta: 'Visit Bhojnalaya',
    href: '/shree-banke-bihari-bhojnalay',
  },
  // ── Events & Celebrations ────────────────────────────────────────
  {
    id: 'corporate',
    category: 'Events & Celebrations',
    icon: '💼',
    title: 'Corporate Events & Meetings',
    description:
      'Host productive corporate gatherings in our elegantly appointed heritage venues. From boardroom-style meetings to large-scale conferences, we provide tailored setups, professional audio-visual support, and curated catering to match every business need.',
    cta: 'Enquire Now',
    href: '#enquiry',
  },
  {
    id: 'wedding',
    category: 'Events & Celebrations',
    icon: '💒',
    title: 'Weddings & Engagements',
    description:
      'Create memories that last a lifetime in our beautifully adorned celebration spaces. From intimate engagements to grand weddings and pre-wedding ceremonies, our dedicated event team ensures every detail is handled with care and grace.',
    cta: 'Enquire Now',
    href: '#enquiry',
  },
  {
    id: 'banquet',
    category: 'Events & Celebrations',
    icon: '🎉',
    title: 'Banquet Hall & Buffet Services',
    description:
      'From intimate family gatherings to large-scale receptions, our versatile banquet spaces set the stage for every occasion. Enjoy lavish buffet spreads featuring a curated blend of traditional and contemporary cuisines, prepared with the finest ingredients.',
    cta: 'Enquire Now',
    href: '#enquiry',
  },
  {
    id: 'devotional',
    category: 'Events & Celebrations',
    icon: '🙏',
    title: 'Devotional & Kirtan Ceremonies',
    description:
      'Honour your faith in a spiritually enriching environment. We provide thoughtfully designed spaces, professional sound systems, and devotional catering for bhajans, kirtans, religious discourses, and mandir-based ceremonial gatherings.',
    cta: 'Enquire Now',
    href: '#enquiry',
  },
  {
    id: 'cultural',
    category: 'Events & Celebrations',
    icon: '🎭',
    title: 'Cultural & Heritage Events',
    description:
      'Celebrate art, culture, and community in the heart of Maheshwar\'s living heritage. Our venues are ideal for folk performances, heritage walks, cultural exhibitions, and community events that honour the rich legacy of this sacred city.',
    cta: 'Enquire Now',
    href: '#enquiry',
  },
];

function ServiceCard({ service }) {
  const isInternalRoute = service.href && service.href.startsWith('/');
  const isAnchor = service.href && service.href.startsWith('#');

  const body = (
    <>
      <div className="property-card-image-wrapper services-card-icon-wrapper">
        <div className="services-card-icon-container">
          <span className="services-card-icon" role="img" aria-label={service.title}>
            {service.icon}
          </span>
          <span className="services-card-category">{service.category}</span>
        </div>
      </div>
      <div className="property-card-body">
        <h3 className="property-card-title">{service.title}</h3>
        <p className="property-card-description">{service.description}</p>
        <span className="property-card-cta">{service.cta} →</span>
      </div>
    </>
  );

  if (isInternalRoute) {
    return (
      <Link to={service.href} className="property-card">
        {body}
      </Link>
    );
  }

  if (isAnchor) {
    return (
      <a href={service.href} className="property-card">
        {body}
      </a>
    );
  }

  return <div className="property-card">{body}</div>;
}

function ServicesSection({ className = '' }) {
  return (
    <section className={`property-cards-section services-section ${className}`} id="services">
      <Container>
        <div className="property-cards-header">
          <h2 className="property-cards-title">Our Services</h2>
          <p className="property-cards-subtitle">
            From heritage stays and authentic dining to grand celebrations and spiritual gatherings —
            everything you need, all in one place.
          </p>
        </div>
        <div className="property-cards-grid">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </Container>
    </section>
  );
}

export default ServicesSection;
