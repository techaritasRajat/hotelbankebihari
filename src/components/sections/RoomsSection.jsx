import './RoomsSection.css';
import Container from '../layout/Container';
import { RoomCard } from '../features';

function RoomsSection({ 
  eyebrow,
  title, 
  subtitle,
  rooms = [],
  onBookNow,
  className = '' 
}) {
  return (
    <section className={`rooms-section ${className}`} id="rooms">
      <Container>
        <div className="rooms-section-header">
          {eyebrow && <span className="section-eyebrow">{eyebrow}</span>}
          {title && <h2 className="rooms-section-title">{title}</h2>}
          {subtitle && <p className="rooms-section-subtitle">{subtitle}</p>}
        </div>
        {rooms.length > 0 && (
          <div className="rooms-section-grid">
            {rooms.map((room) => (
              <RoomCard key={room.id} room={room} onBookNow={onBookNow} />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}

export default RoomsSection;
