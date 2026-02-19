import { useState, useEffect } from 'react';
import './Header.css';
import Container from './Container';
import Navigation from './Navigation';
import MobileMenu from './MobileMenu';
import { Button } from '../ui';
import logoFallback from '../../assets/icons/Banke Bihari Hotel.png';

function Header({ logo, navigationItems = [], className = '' }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Split navigation items into links and button
  const navLinks = navigationItems.filter(item => item.type !== 'button');
  const bookButton = navigationItems.find(item => item.type === 'button');

  const classes = ['header', isScrolled ? 'header--scrolled' : '', className]
    .filter(Boolean)
    .join(' ');

  return (
    <header className={classes}>
      <Container>
        <div className="header-content">
          <div className="header-left">
            <div className="header-logo">
              {logo || <img src={logoFallback} alt="Banke Bihari Maheshwar" className="header-logo-img" />}
            </div>
          </div>
          <div className="header-center">
            <Navigation items={navLinks} />
          </div>
          <div className="header-right">
            {bookButton && (
              <Button
                variant={bookButton.variant || 'primary'}
                size="sm"
                onClick={bookButton.onClick}
              >
                {bookButton.label}
              </Button>
            )}
          </div>
          <div className="header-mobile">
            <MobileMenu items={navigationItems} logo={logo} />
          </div>
        </div>
      </Container>
    </header>
  );
}

export default Header;
