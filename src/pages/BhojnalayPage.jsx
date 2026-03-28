import { Link } from 'react-router-dom';
import './BhojnalayPage.css';
import {
  HeroSection,
  AboutSection,
  ContactSection,
  QuickContactSection,
} from '../components/sections';
import Container from '../components/layout/Container';
import { hotelInfo } from '../constants';

function BhojnalayPage() {
  return (
    <div className="bhojnalay-page">
      <HeroSection
        title="Welcome to Banke Bihari Bhojnalaya"
        subtitle="Authentic culinary experience in the heart of heritage"
        ctaText="Contact Us"
        onCtaClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
      />
      <AboutSection
        title="About Banke Bihari Bhojnalaya"
        description="Banke Bihari Bhojnalaya offers an authentic dining experience with traditional recipes passed down through generations. Our restaurant serves pure vegetarian cuisine prepared with the finest ingredients, bringing you the true taste of heritage."
        features={[
          'Pure vegetarian traditional cuisine',
          'Authentic heritage recipes',
          'Fresh and hygienic preparation',
          'Comfortable dining ambiance',
        ]}
      />
      <section className="bhojnalay-timings" id="dine">
        <Container>
        <div className="bhojnalay-timings-content">
          <h2 className="bhojnalay-timings-title">Opening Hours</h2>
          <p className="bhojnalay-timings-subtitle">Visit us for an authentic dining experience</p>
          <div className="bhojnalay-timings-list">
            <div className="bhojnalay-timings-item">
              <span className="bhojnalay-timings-label">Breakfast</span>
              <span className="bhojnalay-timings-value">7:00 AM - 10:00 AM</span>
            </div>
            <div className="bhojnalay-timings-item">
              <span className="bhojnalay-timings-label">Lunch</span>
              <span className="bhojnalay-timings-value">12:00 PM - 3:00 PM</span>
            </div>
            <div className="bhojnalay-timings-item">
              <span className="bhojnalay-timings-label">Dinner</span>
              <span className="bhojnalay-timings-value">7:00 PM - 10:00 PM</span>
            </div>
          </div>
        </div>
        </Container>
      </section>
      <QuickContactSection
        title="Quick Booking & Enquiry"
        subtitle="Contact us directly for table reservations"
        contactInfo={hotelInfo}
      />
      <ContactSection
        title="Contact Us"
        subtitle="Get in touch with us for any inquiries"
        contactInfo={hotelInfo}
      />
      <div className="bhojnalay-page-back-link">
        <Link to="/" className="bhojnalay-page-back-link-anchor">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}

export default BhojnalayPage;
