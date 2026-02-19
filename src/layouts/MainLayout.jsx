import { useLocation, Link } from 'react-router-dom';
import './MainLayout.css';
import { Header, Footer } from '../components/layout';
import { getLayoutConfig } from '../config/layoutConfig';
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';

function MainLayout({ children }) {
  const { pathname } = useLocation();
  const { logoSrc, logoAlt, navigationItems, footerLinks, footerDescription, copyright } =
    getLayoutConfig(pathname);

  const logo = (
    <Link to="/" className="header-logo-link">
      <img src={logoSrc} alt={logoAlt} className="header-logo-img" />
    </Link>
  );

  const socialLinks = [
    { label: 'Facebook', href: 'https://facebook.com', icon: <FaFacebook /> },
    { label: 'Instagram', href: 'https://instagram.com', icon: <FaInstagram /> },
    { label: 'WhatsApp', href: 'https://wa.me/918179343060', icon: <FaWhatsapp /> },
  ];

  return (
    <div className="main-layout">
      <Header logo={logo} navigationItems={navigationItems} />
      <main className="main-layout-content">{children}</main>
      <Footer
        logo={logo}
        description={footerDescription}
        links={footerLinks}
        socialLinks={socialLinks}
        copyright={copyright}
      />
    </div>
  );
}

export default MainLayout;
