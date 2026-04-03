import './LandingPage.css';
import {
  HeroSection,
  PropertyCardsSection,
  ServicesSection,
  NearbyAttractionsSection,
  ContactSection,
  EnquirySection,
} from '../components/sections';
import { hotelInfo } from '../constants';
import { scrollTo } from '../utils';

// Replace this URL with the actual Google Maps embed URL from Maps → Share → Embed a map
const MAP_EMBED_URL =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3672.9!2d75.5925!3d22.1768!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sMaheshwar%2C+Madhya+Pradesh!5e0!3m2!1sen!2sin!4v1000000000000';

// Place a cinematic MP4 file at public/videos/banke-bihari-hero.mp4 and it will play automatically
const HERO_VIDEO = null; // e.g. '/videos/banke-bihari-hero.mp4'

const homeContactInfo = {
  ...hotelInfo,
  address: 'Maheshwar, District Khargone, Madhya Pradesh – 451224',
  phone: '+91 81793 43060',
  email: 'info@banke-bihari-maheshwar.com',
};

function LandingPage() {
  return (
    <div className="landing-page" id="home">
      <HeroSection
        titlePrefix="Welcome to"
        title="Banke Bihari Maheshwar"
        subtitle="Heritage. Hospitality. Home."
        backgroundVideo={HERO_VIDEO}
        ctaText="Explore Our Properties"
        onCtaClick={() => scrollTo('about')}
      />
      <PropertyCardsSection
        eyebrow="discover"
        id="about"
        title="About Us"
        subtitle="Three unique destinations, one extraordinary heritage experience in the heart of Maheshwar"
      />
      <ServicesSection />
      <NearbyAttractionsSection />
      <EnquirySection
        id="enquiry"
        title="Send an Enquiry"
        subtitle="Tell us which service you're interested in and our team will get back to you shortly"
      />
      <ContactSection
        title="Contact Us"
        subtitle="We'd love to hear from you"
        contactInfo={homeContactInfo}
        mapEmbedUrl={MAP_EMBED_URL}
      />
    </div>
  );
}

export default LandingPage;
