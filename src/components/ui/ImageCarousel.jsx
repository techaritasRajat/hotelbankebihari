import { useState, useCallback } from 'react';
import './ImageCarousel.css';

function ImageCarousel({ images = [], alt = '', aspectRatio = '16/9', className = '' }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);

  const count = images.length;
  const showControls = count > 1;

  const prev = useCallback(
    (e) => {
      if (e) e.stopPropagation();
      setCurrentIndex((i) => (i - 1 + count) % count);
    },
    [count]
  );

  const next = useCallback(
    (e) => {
      if (e) e.stopPropagation();
      setCurrentIndex((i) => (i + 1) % count);
    },
    [count]
  );

  const goTo = useCallback((index, e) => {
    if (e) e.stopPropagation();
    setCurrentIndex(index);
  }, []);

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (touchStartX === null) return;
    const delta = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 50) {
      delta > 0 ? next() : prev();
    }
    setTouchStartX(null);
  };

  if (!images || count === 0) return null;

  const classes = ['image-carousel', className].filter(Boolean).join(' ');

  return (
    <div
      className={classes}
      style={{ aspectRatio }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {images.map((src, index) => (
        <img
          key={src}
          src={src}
          alt={count > 1 ? `${alt} — image ${index + 1} of ${count}` : alt}
          className={`image-carousel-img${index === currentIndex ? ' image-carousel-img--active' : ''}`}
          aria-hidden={index !== currentIndex}
        />
      ))}

      {showControls && (
        <>
          <button
            className="image-carousel-arrow image-carousel-arrow--prev"
            onClick={prev}
            aria-label="Previous image"
            type="button"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <button
            className="image-carousel-arrow image-carousel-arrow--next"
            onClick={next}
            aria-label="Next image"
            type="button"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          <div className="image-carousel-dots" role="tablist" aria-label="Image navigation">
            {images.map((_, index) => (
              <button
                key={index}
                role="tab"
                aria-selected={index === currentIndex}
                aria-label={`Go to image ${index + 1}`}
                type="button"
                className={`image-carousel-dot${index === currentIndex ? ' image-carousel-dot--active' : ''}`}
                onClick={(e) => goTo(index, e)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default ImageCarousel;
