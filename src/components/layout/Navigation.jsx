import { useState } from 'react';
import './Navigation.css';
import { Button } from '../ui';

function Navigation({ items = [], className = '' }) {
  const [activeItem, setActiveItem] = useState(null);

  const handleItemClick = (item) => {
    setActiveItem(item.id);
    if (item.onClick) {
      item.onClick();
    }
  };

  const classes = ['navigation', className].filter(Boolean).join(' ');

  return (
    <nav className={classes}>
      <ul className="navigation-list">
        {items.map((item) => (
          <li key={item.id} className="navigation-item">
            {item.type === 'button' ? (
              <Button
                variant={item.variant || 'primary'}
                size="sm"
                onClick={() => handleItemClick(item)}
              >
                {item.label}
              </Button>
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
