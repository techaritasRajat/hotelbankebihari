import './LoadingSpinner.css';

function LoadingSpinner({ size = 'md', className = '' }) {
  const sizeClass = `spinner--${size}`;
  const classes = ['spinner', sizeClass, className].filter(Boolean).join(' ');

  return (
    <div className={classes} role="status" aria-label="Loading">
      <div className="spinner-circle"></div>
    </div>
  );
}

export default LoadingSpinner;
