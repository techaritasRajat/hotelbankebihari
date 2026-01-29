import './HomePage.css';
import {
  HeroSection,
  AboutSection,
  RoomsSection,
  AmenitiesSection,
  GallerySection,
  GoogleReviewsSection,
  ContactSection,
  BookingSection,
} from '../components/sections';
import { hotelInfo, roomTypes, amenities } from '../constants';

function HomePage() {
  const handleBookNow = () => {
    // Scroll to booking section
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookingSubmit = async (formData) => {
    // Handle booking submission
    console.log('Booking submitted:', formData);
    // In a real app, this would call a booking service
  };

  const handleContactSubmit = async (formData) => {
    // Handle contact form submission
    console.log('Contact form submitted:', formData);
    // In a real app, this would call a contact service
  };

  return (
    <div className="home-page">
      <HeroSection
        title="Welcome to Banke Bihari Heritage Hotel"
        subtitle="Experience luxury and comfort in the heart of heritage"
        ctaText="Book Your Stay"
      />
      <AboutSection
        title="About Our Hotel"
        description="Banke Bihari Heritage Hotel offers a unique blend of traditional heritage and modern comfort. Our hotel provides an unforgettable experience with world-class amenities and exceptional service."
        features={[
          'Heritage architecture with modern amenities',
          'Prime location in the heart of the city',
          'Award-winning hospitality service',
          'Eco-friendly and sustainable practices',
        ]}
      />
      <RoomsSection
        title="Our Rooms"
        subtitle="Choose from our selection of beautifully designed rooms"
        rooms={roomTypes}
        onBookNow={handleBookNow}
      />
      <AmenitiesSection
        title="Amenities"
        subtitle="Everything you need for a comfortable stay"
        amenities={amenities}
      />
      <GallerySection
        title="Gallery"
        subtitle="Take a glimpse of our beautiful hotel"
        images={[]}
      />
      <GoogleReviewsSection
        title="Guest Reviews"
        subtitle="What our guests say about us"
      />
      <BookingSection
        title="Send Booking Enquiry"
        subtitle="Send us an enquiry and our team will contact you to confirm your reservation"
        onSubmit={handleBookingSubmit}
        whatsappNumber={hotelInfo.whatsappNumber}
      />
      <ContactSection
        title="Contact Us"
        subtitle="Get in touch with us for any inquiries"
        contactInfo={hotelInfo}
        onSubmit={handleContactSubmit}
      />
    </div>
  );
}

export default HomePage;
