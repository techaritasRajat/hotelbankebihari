import { useState, useEffect, useRef, useCallback } from 'react';
import './NearbyAttractionsSection.css';
import Container from '../layout/Container';
import UIcon from '../ui/UIcon';

const defaultAttractions = [
  {
    id: 'maheshwar-fort',
    title: 'Maheshwar Fort',
    description:
      'A stunning 18th-century fort built by Queen Ahilyabai Holkar, overlooking the sacred Narmada River. A symbol of Maratha heritage and architectural grandeur.',
    image: null,
    distance: '0.5 km',
  },
  {
    id: 'maheshwar-ghat',
    title: 'Maheshwar Ghat',
    description:
      'The iconic ghats on the banks of the Narmada River, perfect for witnessing sunrise rituals, boat rides, and the serene aarti ceremony at dusk.',
    image: null,
    distance: '0.3 km',
  },
  {
    id: 'maheshwari-weaving',
    title: 'Maheshwari Silk Weaving',
    description:
      'Witness the traditional craft of Maheshwari saree weaving, a centuries-old art form unique to Maheshwar, known for its distinctive silk and cotton blend.',
    image: null,
    distance: '1 km',
  },
  {
    id: 'sahastrarjun-temple',
    title: 'Sahasrarjun Temple',
    description:
      'An ancient and revered temple dedicated to the legendary warrior king Sahasrarjun, located close to the Maheshwar fort complex.',
    image: null,
    distance: '0.8 km',
  },
  {
    id: 'sahastradhara',
    title: 'Sahastradhara',
    description:
      'A sacred site where a thousand streams of the Narmada cascade over the rocks, creating a breathtaking natural spectacle revered by pilgrims and nature lovers alike.',
    image: null,
    distance: '2 km',
  },
  {
    id: 'narmada-boat-ride',
    title: 'Narmada Boat Ride',
    description:
      'Experience the tranquil beauty of the Narmada River on a traditional boat ride, offering stunning views of the ghats, fort, and the surrounding landscape at golden hour.',
    image: null,
    distance: '0.3 km',
  },
  {
    id: 'rajrajeshwar-temple',
    title: 'Rajrajeshwar Temple',
    description:
      'A magnificent temple dedicated to Lord Shiva, built by Queen Ahilyabai Holkar. Known for its intricate carvings and as a centre of spiritual significance in Maheshwar.',
    image: null,
    distance: '0.6 km',
  },
  {
    id: 'kashivishwanath-temple',
    title: 'Kashivishwanath Temple',
    description:
      'A revered Shiva temple within the Maheshwar fort complex, believed to be as sacred as the Kashi Vishwanath in Varanasi, drawing devotees throughout the year.',
    image: null,
    distance: '0.5 km',
  },
];

const AUTO_ADVANCE_INTERVAL = 4500;

function NearbyAttractionsSection({
  title = 'Nearby Attractions',
  subtitle = 'Explore the rich heritage and culture around us',
  attractions = defaultAttractions,
  className = '',
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef(null);
  const autoTimerRef = useRef(null);
  const activeIndexRef = useRef(0);
  const touchStartX = useRef(null);

  const scrollToIndex = useCallback(
    (index) => {
      const track = trackRef.current;
      if (!track) return;
      const card = track.children[index];
      if (card) {
        track.scrollTo({ left: card.offsetLeft, behavior: 'smooth' });
      }
      activeIndexRef.current = index;
      setActiveIndex(index);
    },
    [],
  );

  const advance = useCallback(() => {
    const next = (activeIndexRef.current + 1) % attractions.length;
    scrollToIndex(next);
  }, [attractions.length, scrollToIndex]);

  const startAutoAdvance = useCallback(() => {
    clearInterval(autoTimerRef.current);
    autoTimerRef.current = setInterval(advance, AUTO_ADVANCE_INTERVAL);
  }, [advance]);

  useEffect(() => {
    startAutoAdvance();
    return () => clearInterval(autoTimerRef.current);
  }, [startAutoAdvance]);

  const handleDotClick = (index) => {
    scrollToIndex(index);
    startAutoAdvance();
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    const threshold = 50;
    if (Math.abs(diff) < threshold) {
      touchStartX.current = null;
      return;
    }
    if (diff > 0) {
      const next = Math.min(activeIndexRef.current + 1, attractions.length - 1);
      scrollToIndex(next);
    } else {
      const prev = Math.max(activeIndexRef.current - 1, 0);
      scrollToIndex(prev);
    }
    startAutoAdvance();
    touchStartX.current = null;
  };

  const handleScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track || !track.children.length) return;
    const cardWidth = track.children[0].offsetWidth;
    if (!cardWidth) return;
    const index = Math.min(
      Math.round(track.scrollLeft / cardWidth),
      attractions.length - 1,
    );
    if (index !== activeIndexRef.current) {
      activeIndexRef.current = index;
      setActiveIndex(index);
    }
  }, [attractions.length]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.addEventListener('scroll', handleScroll, { passive: true });
    return () => track.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <section className={`nearby-section ${className}`} id="nearby">
      <Container>
        <div className="nearby-header">
          {title && <h2 className="nearby-title">{title}</h2>}
          {subtitle && <p className="nearby-subtitle">{subtitle}</p>}
        </div>
      </Container>

      <div
        className="nearby-track-wrapper"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="nearby-track" ref={trackRef}>
          {attractions.map((attraction) => (
            <div key={attraction.id} className="nearby-card">
              <div className="nearby-card-image-wrapper">
                {attraction.image ? (
                  <img
                    src={attraction.image}
                    alt={attraction.title}
                    className="nearby-card-image"
                  />
                ) : (
                  <div className="nearby-card-image-placeholder">
                    <span className="nearby-card-placeholder-icon">
                      <UIcon name="fi-sr-map-marker" size="3rem" />
                    </span>
                  </div>
                )}
                {attraction.distance && (
                  <span className="nearby-card-distance">{attraction.distance} away</span>
                )}
              </div>
              <div className="nearby-card-body">
                <h3 className="nearby-card-title">{attraction.title}</h3>
                <p className="nearby-card-description">{attraction.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="nearby-dots" role="tablist" aria-label="Attraction slides">
        {attractions.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`nearby-dot ${index === activeIndex ? 'nearby-dot--active' : ''}`}
            onClick={() => handleDotClick(index)}
            role="tab"
            aria-selected={index === activeIndex}
            aria-label={`Go to attraction ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

export default NearbyAttractionsSection;
