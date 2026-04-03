import './RoomCard.css';
import { Card, Badge, Button, ImageCarousel } from '../ui';

function RoomCard({ room, onBookNow, className = '' }) {
  const { id, name, description, price, images = [], amenities = [], featured = false } = room;

  const classes = ['room-card', featured ? 'room-card--featured' : '', className]
    .filter(Boolean)
    .join(' ');

  return (
    <Card className={classes} variant="elevated">
      {featured && (
        <div className="room-card-badge">
          <Badge variant="primary">Featured</Badge>
        </div>
      )}
      {images.length > 0 && (
        <ImageCarousel images={images} alt={name} />
      )}
      <div className="room-card-content">
        <h3 className="room-card-title">{name}</h3>
        {description && <p className="room-card-description">{description}</p>}
        {amenities.length > 0 && (
          <ul className="room-card-amenities">
            {amenities.slice(0, 3).map((amenity, index) => (
              <li key={index} className="room-card-amenity">
                {amenity}
              </li>
            ))}
          </ul>
        )}
        <div className="room-card-footer">
          <div className="room-card-price">
            <span className="room-card-price-amount">${price}</span>
            <span className="room-card-price-period">/night</span>
          </div>
          {onBookNow && (
            <Button variant="primary" size="sm" onClick={() => onBookNow(id)}>
              Book Now
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}

export default RoomCard;
