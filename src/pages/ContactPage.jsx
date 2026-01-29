import './ContactPage.css';
import { ContactSection, BookingSection } from '../components/sections';
import { hotelInfo } from '../constants';

function ContactPage() {
  const handleContactSubmit = async (formData) => {
    // Handle contact form submission
    console.log('Contact form submitted:', formData);
  };

  const handleBookingSubmit = async (formData) => {
    // Handle booking submission
    console.log('Booking submitted:', formData);
  };

  return (
    <div className="contact-page">
      <ContactSection
        title="Contact Us"
        subtitle="We'd love to hear from you"
        contactInfo={hotelInfo}
        onSubmit={handleContactSubmit}
      />
      <BookingSection
        title="Send Booking Enquiry"
        subtitle="Send us your booking details and we'll get back to you shortly"
        onSubmit={handleBookingSubmit}
        whatsappNumber={hotelInfo.whatsappNumber}
      />
    </div>
  );
}

export default ContactPage;
