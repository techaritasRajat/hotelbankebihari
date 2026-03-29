import { useLocation, Link } from 'react-router-dom';
import './MainLayout.css';
import { Header, Footer } from '../components/layout';
import { getLayoutConfig } from '../config/layoutConfig';
import UIcon from '../components/ui/UIcon';
import logoSrc from '../assets/icons/BANKE_BIHARI_LOGO.png';

function MainLayout({ children }) {
  const { pathname } = useLocation();
  const { navigationItems, footerLinks, footerDescription, copyright } =
    getLayoutConfig(pathname);

  const logo = (
    <Link to="/" className="header-logo-link">
      <img src={logoSrc} alt="Shree Banke Bihari Maheshwar" className="header-logo-img" />
    </Link>
  );

  const socialLinks = [
    { label: 'Facebook', href: 'https://facebook.com', icon: 'fi-brands-facebook' },
    { label: 'Instagram', href: 'https://instagram.com', icon: 'fi-brands-instagram' },
    { label: 'WhatsApp', href: 'https://wa.me/918179343060', icon: 'fi-brands-whatsapp' },
  ];

  const socialLinksWithIcons = socialLinks.map((s) => ({
    ...s,
    icon: <UIcon name={s.icon} size="1.25rem" />,
  }));

  return (
    <div className="main-layout">
      <Header logo={logo} navigationItems={navigationItems} />
      <main className="main-layout-content">{children}</main>
      <Footer
        logo={logo}
        description={footerDescription}
        links={footerLinks}
        socialLinks={socialLinksWithIcons}
        copyright={copyright}
      />
    </div>
  );
}

export default MainLayout;
