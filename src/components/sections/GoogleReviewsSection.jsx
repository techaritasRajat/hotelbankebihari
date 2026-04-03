import { ReactGoogleReviews } from "react-google-reviews";
import "react-google-reviews/dist/index.css";
import Container from '../layout/Container';
import ReviewsErrorBoundary from './ReviewsErrorBoundary';
import './GoogleReviewsSection.css';
import './GoogleReviewsOverrides.css';

function GoogleReviewsSection({ 
  eyebrow,
  title = "Guest Reviews",
  subtitle = "What our guests say about us",
  className = '' 
}) {
  const featurableId = "94a7b7bf-bc38-40e5-baa6-2c9f9ed35f5e";

  return (
    <section className={`google-reviews-section ${className}`} id="testimonials">
      <Container>
        <div className="google-reviews-header">
          {eyebrow && <span className="section-eyebrow">{eyebrow}</span>}
          <h2 className="google-reviews-title">{title}</h2>
          {subtitle && <p className="google-reviews-subtitle">{subtitle}</p>}
        </div>
        <div className="google-reviews-widget">
          <ReviewsErrorBoundary>
            <ReactGoogleReviews 
              layout="carousel" 
              featurableId={featurableId}
              maxItems={3}
              carouselAutoplay={true}
              carouselSpeed={5000}
              theme="light"
              reviewVariant="card"
              maxCharacters={200}
              dateDisplay="relative"
              nameDisplay="firstAndLastInitials"
            />
          </ReviewsErrorBoundary>
        </div>
      </Container>
    </section>
  );
}

export default GoogleReviewsSection;
