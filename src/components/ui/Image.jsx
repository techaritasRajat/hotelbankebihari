import { useState } from 'react';
import './Image.css';

function Image({ 
  src, 
  alt, 
  className = '', 
  loading = 'lazy',
  onLoad,
  onError,
  ...props 
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = (e) => {
    setIsLoading(false);
    if (onLoad) onLoad(e);
  };

  const handleError = (e) => {
    setIsLoading(false);
    setHasError(true);
    if (onError) onError(e);
  };

  const classes = ['image', className].filter(Boolean).join(' ');

  if (hasError) {
    return (
      <div className={`${classes} image--error`} {...props}>
        <span className="image-placeholder">Image not available</span>
      </div>
    );
  }

  return (
    <div className={`${classes} ${isLoading ? 'image--loading' : ''}`}>
      {isLoading && <div className="image-skeleton" />}
      <img
        src={src}
        alt={alt}
        loading={loading}
        onLoad={handleLoad}
        onError={handleError}
        className="image-element"
        {...props}
      />
    </div>
  );
}

export default Image;
