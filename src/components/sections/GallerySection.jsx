import './GallerySection.css';
import Container from '../layout/Container';
import { GalleryItem } from '../features';

function GallerySection({ 
  eyebrow,
  title, 
  subtitle,
  images = [],
  className = '' 
}) {
  return (
    <section className={`gallery-section ${className}`} id="gallery">
      <Container>
        <div className="gallery-section-header">
          {eyebrow && <span className="section-eyebrow">{eyebrow}</span>}
          {title && <h2 className="gallery-section-title">{title}</h2>}
          {subtitle && <p className="gallery-section-subtitle">{subtitle}</p>}
        </div>
        {images.length > 0 && (
          <div className="gallery-section-grid">
            {images.map((image, index) => (
              <GalleryItem key={index} image={image} />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}

export default GallerySection;
