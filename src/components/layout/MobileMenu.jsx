import { useState } from 'react';
import './MobileMenu.css';
import Navigation from './Navigation';
// import logoImage from '../../assets/icons/Banke Bihari Hotel.png';

function MobileMenu({ items = [], className = '' }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = !isOpen ? 'hidden' : '';
  };

  const closeMenu = () => {
    setIsOpen(false);
    document.body.style.overflow = '';
  };

  const classes = ['mobile-menu', className].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      <div className="mobile-menu-header">
        {/* <div className="mobile-menu-logo">
          {logo || <img src={logoImage} alt="Shree Banke Bihari Heritage Hotel" className="mobile-menu-logo-img" />}
        </div> */}
        <button
          className={`mobile-menu-toggle ${isOpen ? 'mobile-menu-toggle--open' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      <div className={`mobile-menu-overlay ${isOpen ? 'mobile-menu-overlay--open' : ''}`} onClick={closeMenu}>
        <div className="mobile-menu-content" onClick={(e) => e.stopPropagation()}>
          <Navigation items={items} />
        </div>
      </div>
    </div>
  );
}

export default MobileMenu;
