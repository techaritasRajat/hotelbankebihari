import './MainLayout.css';
import { Header, Footer } from '../components/layout';
import { hotelInfo } from '../constants';
import { scrollTo } from '../utils';
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';

function MainLayout({ children }) {
  const navigationItems = [
    { id: 'home', label: 'Home', href: '#home', onClick: () => scrollTo('home') },
    { id: 'about', label: 'About', href: '#about', onClick: () => scrollTo('about') },
    { id: 'rooms', label: 'Rooms', href: '#rooms', onClick: () => scrollTo('rooms') },
    { id: 'amenities', label: 'Amenities', href: '#amenities', onClick: () => scrollTo('amenities') },
    { id: 'gallery', label: 'Gallery', href: '#gallery', onClick: () => scrollTo('gallery') },
    { id: 'contact', label: 'Contact', href: '#contact', onClick: () => scrollTo('contact') },
    { 
      id: 'book', 
      label: 'Book Now', 
      type: 'button', 
      variant: 'primary',
      onClick: () => scrollTo('booking')
    },
  ];

  const footerLinks = [
    { label: 'About Us', href: '#about' },
    { label: 'Rooms', href: '#rooms' },
    { label: 'Amenities', href: '#amenities' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    { label: 'Facebook', href: 'https://facebook.com', icon: <FaFacebook /> },
    { label: 'Instagram', href: 'https://instagram.com', icon: <FaInstagram /> },
    { label: 'WhatsApp', href: 'https://wa.me/918179343060', icon: <FaWhatsapp /> },
  ];

  return (
    <div className="main-layout">
      <Header navigationItems={navigationItems} />
      <main className="main-layout-content">{children}</main>
      <Footer
        description={hotelInfo.description || 'Experience luxury and comfort in the heart of heritage.'}
        links={footerLinks}
        socialLinks={socialLinks}
        copyright={`© ${new Date().getFullYear()} Banke Bihari Heritage Hotel. All rights reserved.`}
      />
    </div>
  );
}

export default MainLayout;
