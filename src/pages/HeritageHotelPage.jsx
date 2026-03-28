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
import { scrollTo } from '../utils';

function HeritageHotelPage() {
  const handleBookNow = () => scrollTo('booking');

  return (
    <div className="home-page">
      <HeroSection
        title="Welcome to Shree Banke Bihari Heritage Hotel"
        subtitle="Experience luxury and comfort in the heart of heritage"
        ctaText="Book Your Stay"
        onCtaClick={handleBookNow}
      />
      <AboutSection
        title="About Our Hotel"
        description="Shree Banke Bihari Heritage Hotel offers a unique blend of traditional heritage and modern comfort. Our hotel provides an unforgettable experience with world-class amenities and exceptional service in Maheshwar."
        features={[
          'Heritage architecture with modern amenities',
          'Prime location in Maheshwar',
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
      />
      <ContactSection
        title="Contact Us"
        subtitle="Get in touch with us for any inquiries"
        contactInfo={hotelInfo}
      />
    </div>
  );
}

export default HeritageHotelPage;
