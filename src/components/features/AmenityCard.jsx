import './AmenityCard.css';
import { Card, UIcon } from '../ui';

function AmenityCard({ amenity, className = '' }) {
  const { icon, title, description } = amenity;

  return (
    <Card className={`amenity-card ${className}`} variant="outlined">
      {icon && (
        <div className="amenity-card-icon">
          <UIcon name={icon} size="2rem" />
        </div>
      )}
      <h3 className="amenity-card-title">{title}</h3>
      {description && <p className="amenity-card-description">{description}</p>}
    </Card>
  );
}

export default AmenityCard;
