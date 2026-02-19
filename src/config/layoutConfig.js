import logoHome from '../assets/icons/Banke Bihari Hotel.png';
import logoHeritage from '../assets/icons/Banke Bihari Hotel 1.png';
import logoPalace from '../assets/icons/Banke Bihari Hotel Logo.png';
// Bhojnalay logo — replace with dedicated asset when available
import logoBhojnalay from '../assets/icons/Banke Bihari Hotel.png';
import { scrollTo } from '../utils';

const serviceDropdownItems = [
  {
    id: 'heritage-hotel',
    title: 'Shree Banke Bihari Heritage Hotel',
    description: 'Luxury heritage stay in the heart of Maheshwar',
    href: '/shree-banke-bihari-heritage',
  },
  {
    id: 'bhojnalay',
    title: 'Banke Bihari Bhojnalaya',
    description: 'Authentic pure vegetarian dining experience',
    href: '/shree-banke-bihari-bhojnalay',
  },
  {
    id: 'palace',
    title: 'Shree Banke Bihari Palace',
    description: 'Royal grandeur and heritage elegance',
    href: '/shree-banke-bihari-palace',
  },
];

const homeNavItems = [
  { id: 'home', label: 'Home', href: '#home', onClick: () => scrollTo('home') },
  { id: 'about', label: 'About', href: '#about', onClick: () => scrollTo('about') },
  { id: 'services', label: 'Services', href: '#services', onClick: () => scrollTo('services') },
  { id: 'contact', label: 'Contact', href: '#contact', onClick: () => scrollTo('contact') },
  {
    id: 'enquiry',
    label: 'Enquire Now',
    type: 'button',
    variant: 'primary',
    onClick: () => scrollTo('enquiry'),
  },
];

const heritageNavItems = [
  { id: 'about', label: 'About', href: '#about', onClick: () => scrollTo('about') },
  { id: 'rooms', label: 'Rooms', href: '#rooms', onClick: () => scrollTo('rooms') },
  { id: 'amenities', label: 'Amenities', href: '#amenities', onClick: () => scrollTo('amenities') },
  { id: 'services', label: 'Services', type: 'dropdown', dropdownItems: serviceDropdownItems },
  { id: 'contact', label: 'Contact', href: '#contact', onClick: () => scrollTo('contact') },
  {
    id: 'book',
    label: 'Book Now',
    type: 'button',
    variant: 'primary',
    onClick: () => scrollTo('booking'),
  },
];

const palaceNavItems = [
  { id: 'about', label: 'About', href: '#about', onClick: () => scrollTo('about') },
  { id: 'amenities', label: 'Amenities', href: '#amenities', onClick: () => scrollTo('amenities') },
  { id: 'gallery', label: 'Gallery', href: '#gallery', onClick: () => scrollTo('gallery') },
  { id: 'services', label: 'Services', type: 'dropdown', dropdownItems: serviceDropdownItems },
  { id: 'contact', label: 'Contact', href: '#contact', onClick: () => scrollTo('contact') },
  {
    id: 'book',
    label: 'Book Now',
    type: 'button',
    variant: 'primary',
    onClick: () => scrollTo('quick-contact'),
  },
];

const bhojnalayNavItems = [
  { id: 'about', label: 'About', href: '#about', onClick: () => scrollTo('about') },
  { id: 'dine', label: 'Dine', href: '#dine', onClick: () => scrollTo('dine') },
  { id: 'services', label: 'Services', type: 'dropdown', dropdownItems: serviceDropdownItems },
  { id: 'contact', label: 'Contact', href: '#contact', onClick: () => scrollTo('contact') },
  {
    id: 'reserve',
    label: 'Reserve Table',
    type: 'button',
    variant: 'primary',
    onClick: () => scrollTo('quick-contact'),
  },
];

const homeFooterLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
  { label: 'Heritage Hotel', href: '/shree-banke-bihari-heritage' },
  { label: 'Bhojnalay', href: '/shree-banke-bihari-bhojnalay' },
  { label: 'Palace', href: '/shree-banke-bihari-palace' },
];

const heritageFooterLinks = [
  { label: 'About', href: '#about' },
  { label: 'Rooms', href: '#rooms' },
  { label: 'Amenities', href: '#amenities' },
  { label: 'Contact', href: '#contact' },
  { label: 'Back to Home', href: '/' },
  { label: 'Palace', href: '/shree-banke-bihari-palace' },
  { label: 'Bhojnalay', href: '/shree-banke-bihari-bhojnalay' },
];

const palaceFooterLinks = [
  { label: 'About', href: '#about' },
  { label: 'Amenities', href: '#amenities' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
  { label: 'Back to Home', href: '/' },
  { label: 'Heritage Hotel', href: '/shree-banke-bihari-heritage' },
  { label: 'Bhojnalay', href: '/shree-banke-bihari-bhojnalay' },
];

const bhojnalayFooterLinks = [
  { label: 'About', href: '#about' },
  { label: 'Dine', href: '#dine' },
  { label: 'Contact', href: '#contact' },
  { label: 'Back to Home', href: '/' },
  { label: 'Heritage Hotel', href: '/shree-banke-bihari-heritage' },
  { label: 'Palace', href: '/shree-banke-bihari-palace' },
];

export function getLayoutConfig(pathname) {
  switch (pathname) {
    case '/shree-banke-bihari-heritage':
      return {
        logoSrc: logoHeritage,
        logoAlt: 'Shree Banke Bihari Heritage Hotel',
        navigationItems: heritageNavItems,
        footerLinks: heritageFooterLinks,
        footerDescription:
          'Shree Banke Bihari Heritage Hotel offers a unique blend of traditional heritage and modern comfort in the heart of Maheshwar.',
        copyright: `© ${new Date().getFullYear()} Shree Banke Bihari Heritage Hotel. All rights reserved.`,
      };
    case '/shree-banke-bihari-palace':
      return {
        logoSrc: logoPalace,
        logoAlt: 'Shree Banke Bihari Palace',
        navigationItems: palaceNavItems,
        footerLinks: palaceFooterLinks,
        footerDescription:
          'Shree Banke Bihari Palace offers a regal experience with majestic architecture and royal ambiance in Maheshwar.',
        copyright: `© ${new Date().getFullYear()} Shree Banke Bihari Palace. All rights reserved.`,
      };
    case '/shree-banke-bihari-bhojnalay':
      return {
        logoSrc: logoBhojnalay,
        logoAlt: 'Banke Bihari Bhojnalaya',
        navigationItems: bhojnalayNavItems,
        footerLinks: bhojnalayFooterLinks,
        footerDescription:
          'Banke Bihari Bhojnalaya serves authentic pure vegetarian cuisine prepared with the finest ingredients and traditional recipes.',
        copyright: `© ${new Date().getFullYear()} Banke Bihari Bhojnalaya. All rights reserved.`,
      };
    default:
      return {
        logoSrc: logoHome,
        logoAlt: 'Banke Bihari Maheshwar',
        navigationItems: homeNavItems,
        footerLinks: homeFooterLinks,
        footerDescription:
          'Banke Bihari Maheshwar — Your gateway to heritage, culture, and hospitality in the heart of Maheshwar.',
        copyright: `© ${new Date().getFullYear()} Banke Bihari Maheshwar. All rights reserved.`,
      };
  }
}

export default getLayoutConfig;
