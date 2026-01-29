import { ReactGoogleReviews } from "react-google-reviews";
import "react-google-reviews/dist/index.css";
import Container from '../layout/Container';
import ReviewsErrorBoundary from './ReviewsErrorBoundary';
import './GoogleReviewsSection.css';
import './GoogleReviewsOverrides.css';

function GoogleReviewsSection({ 
  title = "Guest Reviews",
  subtitle = "What our guests say about us",
  className = '' 
}) {
  const featurableId = "94a7b7bf-bc38-40e5-baa6-2c9f9ed35f5e";

  return (
    <section className={`google-reviews-section ${className}`} id="testimonials">
      <Container>
        <div className="google-reviews-header">
          <h2 className="google-reviews-title">{title}</h2>
          {subtitle && <p className="google-reviews-subtitle">{subtitle}</p>}
        </div>
        <div className="google-reviews-widget">
          <ReviewsErrorBoundary>
            <ReactGoogleReviews 
              layout="carousel" 
              featurableId={featurableId}
            />
          </ReviewsErrorBoundary>
        </div>
      </Container>
    </section>
  );
}

export default GoogleReviewsSection;
