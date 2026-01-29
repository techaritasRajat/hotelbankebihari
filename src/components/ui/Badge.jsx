import './Badge.css';

function Badge({ children, variant = 'default', size = 'md', className = '' }) {
  const baseClass = 'badge';
  const variantClass = `badge--${variant}`;
  const sizeClass = `badge--${size}`;
  const classes = [baseClass, variantClass, sizeClass, className].filter(Boolean).join(' ');

  return <span className={classes}>{children}</span>;
}

export default Badge;
