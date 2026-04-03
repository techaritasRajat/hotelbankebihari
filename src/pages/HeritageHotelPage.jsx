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
import heroImage from '../assets/images/hero/hero-heritage-hotel.png';

function HeritageHotelPage() {
  const handleBookNow = () => scrollTo('booking');

  return (
    <div className="home-page">
      <HeroSection
        titlePrefix="Welcome to"
        title="Shree Banke Bihari"
        titleLine2="Heritage Hotel"
        subtitle="Experience luxury and comfort in the heart of heritage"
        backgroundImage={heroImage}
        ctaText="Book Your Stay"
        onCtaClick={handleBookNow}
      />
      <AboutSection
        eyebrow="our story"
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
        eyebrow="explore"
        title="Our Rooms"
        subtitle="Choose from our selection of beautifully designed rooms"
        rooms={roomTypes}
        onBookNow={handleBookNow}
      />
      <AmenitiesSection
        eyebrow="experience"
        title="Amenities"
        subtitle="Everything you need for a comfortable stay"
        amenities={amenities}
      />
      <GallerySection
        eyebrow="admire"
        title="Gallery"
        subtitle="Take a glimpse of our beautiful hotel"
        images={[]}
      />
      <GoogleReviewsSection
        eyebrow="kind words"
        title="Guest Reviews"
        subtitle="What our guests say about us"
      />
      <BookingSection
        eyebrow="reserve"
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
