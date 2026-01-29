import './TestimonialCard.css';
import { Card } from '../ui';

function TestimonialCard({ testimonial, className = '' }) {
  const { name, role, image, rating, comment } = testimonial;

  return (
    <Card className={`testimonial-card ${className}`} variant="outlined">
      <div className="testimonial-card-header">
        {image && (
          <div className="testimonial-card-avatar">
            <img src={image} alt={name} />
          </div>
        )}
        <div className="testimonial-card-info">
          <h4 className="testimonial-card-name">{name}</h4>
          {role && <p className="testimonial-card-role">{role}</p>}
        </div>
      </div>
      {rating && (
        <div className="testimonial-card-rating">
          {'★'.repeat(rating)}
          {'☆'.repeat(5 - rating)}
        </div>
      )}
      <p className="testimonial-card-comment">{comment}</p>
    </Card>
  );
}

export default TestimonialCard;
