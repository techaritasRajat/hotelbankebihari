import './Footer.css';
import Container from './Container';
import logoImage from '../../assets/icons/Banke Bihari Hotel.png';

function Footer({ 
  logo, 
  description,
  links = [],
  socialLinks = [],
  copyright,
  className = '' 
}) {
  const classes = ['footer', className].filter(Boolean).join(' ');

  return (
    <footer className={classes}>
      <Container>
        <div className="footer-content">
          <div className="footer-section footer-section--about">
            <div className="footer-logo">
              {logo || <img src={logoImage} alt="Shree Banke Bihari Heritage Hotel" className="footer-logo-img" />}
            </div>
            {description && <p className="footer-description">{description}</p>}
          </div>

          {links.length > 0 && (
            <div className="footer-section footer-section--links">
              <h3 className="footer-title">Quick Links</h3>
              <ul className="footer-list">
                {links.map((link, index) => (
                  <li key={index}>
                    <a href={link.href} className="footer-link">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {socialLinks.length > 0 && (
            <div className="footer-section footer-section--social">
              <h3 className="footer-title">Follow Us</h3>
              <div className="footer-social">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="footer-social-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                  >
                    {social.icon || social.label}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {copyright && (
          <div className="footer-bottom">
            <p className="footer-copyright">{copyright}</p>
          </div>
        )}
      </Container>
    </footer>
  );
}

export default Footer;
