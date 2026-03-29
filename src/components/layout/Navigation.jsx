import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';
import { Button, UIcon } from '../ui';

function Navigation({ items = [], className = '', isMobile = false, onItemClick }) {
  const [activeItem, setActiveItem] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleItemClick = (item) => {
    setActiveItem(item.id);
    if (item.onClick) {
      item.onClick();
    }
    if (isMobile && onItemClick) {
      onItemClick();
    }
  };

  const handleDropdownToggle = () => {
    if (isMobile) {
      setDropdownOpen((prev) => !prev);
    }
  };

  const handleDropdownLinkClick = () => {
    setDropdownOpen(false);
    if (isMobile && onItemClick) {
      onItemClick();
    }
  };

  const classes = ['navigation', className, isMobile ? 'navigation--mobile' : ''].filter(Boolean).join(' ');

  return (
    <nav className={classes}>
      <ul className="navigation-list">
        {items.map((item) => (
          <li key={item.id} className={`navigation-item ${item.type === 'dropdown' ? 'navigation-item--dropdown' : ''}`}>
            {item.type === 'button' ? (
              <Button
                variant={item.variant || 'primary'}
                size="sm"
                onClick={() => handleItemClick(item)}
              >
                {item.label}
              </Button>
            ) : item.type === 'dropdown' ? (
              <div
                className="navigation-dropdown-wrapper"
                onMouseEnter={!isMobile ? () => setDropdownOpen(true) : undefined}
                onMouseLeave={!isMobile ? () => setDropdownOpen(false) : undefined}
              >
                <button
                  type="button"
                  className={`navigation-link ${dropdownOpen ? 'navigation-link--active' : ''} ${isMobile ? 'navigation-link--expandable' : ''}`}
                  onClick={isMobile ? handleDropdownToggle : undefined}
                  aria-expanded={isMobile ? dropdownOpen : undefined}
                >
                  {item.label}
                  {isMobile && (
                    <span className={`navigation-expand-icon ${dropdownOpen ? 'navigation-expand-icon--open' : ''}`} aria-hidden>
                      <UIcon name="fi-sr-angle-down" size="0.75rem" color="currentColor" />
                    </span>
                  )}
                </button>
                <div className={`navigation-dropdown ${dropdownOpen ? 'navigation-dropdown--open' : ''} ${isMobile ? 'navigation-dropdown--mobile' : ''}`}>
                  {item.dropdownItems?.map((dropdownItem, index) => (
                    <div key={dropdownItem.id}>
                      {index > 0 && <div className="navigation-dropdown-separator" />}
                      <Link
                        to={dropdownItem.href}
                        className="navigation-dropdown-item"
                        onClick={handleDropdownLinkClick}
                      >
                        <h4 className="navigation-dropdown-title">{dropdownItem.title}</h4>
                        <p className="navigation-dropdown-description">{dropdownItem.description}</p>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            ) : item.to ? (
              <Link
                to={item.to}
                className={`navigation-link ${activeItem === item.id ? 'navigation-link--active' : ''}`}
                onClick={() => handleItemClick(item)}
              >
                {item.label}
              </Link>
            ) : (
              <a
                href={item.href}
                className={`navigation-link ${activeItem === item.id ? 'navigation-link--active' : ''}`}
                onClick={() => handleItemClick(item)}
              >
                {item.label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navigation;
