import './HeroSection.css';
import Container from '../layout/Container';
import { Button } from '../ui';
import { scrollTo } from '../../utils';

function HeroSection({ 
  title, 
  subtitle, 
  backgroundImage,
  ctaText = 'Book Now',
  onCtaClick,
  className = '' 
}) {
  const handleCtaClick = () => {
    if (onCtaClick) {
      onCtaClick();
    } else {
      scrollTo('booking');
    }
  };

  return (
    <section className={`hero-section ${className}`}>
      {backgroundImage && (
        <div className="hero-section-background">
          <img src={backgroundImage} alt="" aria-hidden="true" />
        </div>
      )}
      <div className="hero-section-overlay"></div>
      <Container>
        <div className="hero-section-content">
          {title && <h1 className="hero-section-title">{title}</h1>}
          {subtitle && <p className="hero-section-subtitle">{subtitle}</p>}
          {ctaText && (
            <Button variant="primary" size="lg" onClick={handleCtaClick}>
              {ctaText}
            </Button>
          )}
        </div>
      </Container>
    </section>
  );
}

export default HeroSection;
