import { Link } from 'react-router-dom';
import './PalacePage.css';
import {
  HeroSection,
  AboutSection,
  AmenitiesSection,
  GallerySection,
  ContactSection,
  QuickContactSection,
} from '../components/sections';
import { hotelInfo, amenities } from '../constants';

function PalacePage() {
  const handleBookNow = () => {
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContactSubmit = async (formData) => {
    console.log('Contact form submitted:', formData);
  };

  return (
    <div className="palace-page">
      <HeroSection
        title="Welcome to Hotel Shri Banke Bihari Palace"
        subtitle="Experience royal grandeur and heritage elegance"
        ctaText="Contact Us"
        onCtaClick={handleBookNow}
      />
      <AboutSection
        title="About Hotel Shri Banke Bihari Palace"
        description="Hotel Shri Banke Bihari Palace offers a regal experience with its majestic architecture and royal ambiance. Our palace accommodation combines traditional heritage with modern comfort, providing guests with an unforgettable stay in the heart of heritage."
        features={[
          'Royal palace architecture and design',
          'Premium heritage accommodation',
          'Exclusive palace amenities',
          'Central heritage location',
        ]}
      />
      <AmenitiesSection
        title="Palace Amenities"
        subtitle="Everything you need for a royal stay"
        amenities={amenities}
      />
      <GallerySection
        title="Palace Gallery"
        subtitle="A glimpse of our majestic palace"
        images={[]}
      />
      <QuickContactSection
        title="Quick Booking & Enquiry"
        subtitle="Contact us directly for room bookings"
        contactInfo={hotelInfo}
      />
      <ContactSection
        title="Contact Us"
        subtitle="Get in touch with us for any inquiries"
        contactInfo={hotelInfo}
        onSubmit={handleContactSubmit}
      />
      <div className="palace-page-back-link">
        <Link to="/" className="palace-page-back-link-anchor">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}

export default PalacePage;
