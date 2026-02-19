import './AboutSection.css';
import Container from '../layout/Container';
import { Image } from '../ui';

function AboutSection({ 
  title, 
  description, 
  image,
  features = [],
  className = '' 
}) {
  return (
    <section className={`about-section ${className}`} id="about">
      <Container>
        <div className="about-section-header">
          {title && <h2 className="about-section-title">{title}</h2>}
          {description && (
            <p className="about-section-description">{description}</p>
          )}
        </div>
        {(image || features.length > 0) && (
          <div className="about-section-content">
            {image && (
              <div className="about-section-image">
                <Image src={image.src} alt={image.alt || 'About us'} />
              </div>
            )}
            {features.length > 0 && (
              <ul className="about-section-features">
                {features.map((feature, index) => (
                  <li key={index} className="about-section-feature">
                    {feature}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </Container>
    </section>
  );
}

export default AboutSection;
