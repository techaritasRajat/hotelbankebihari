import './ContactPage.css';
import { ContactSection, BookingSection } from '../components/sections';
import { hotelInfo } from '../constants';

function ContactPage() {
  return (
    <div className="contact-page">
      <ContactSection
        title="Contact Us"
        subtitle="We'd love to hear from you"
        contactInfo={hotelInfo}
      />
      <BookingSection
        title="Send Booking Enquiry"
        subtitle="Send us your booking details and we'll get back to you shortly"
      />
    </div>
  );
}

export default ContactPage;
