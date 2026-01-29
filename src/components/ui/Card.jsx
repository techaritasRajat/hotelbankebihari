import './Card.css';

function Card({ children, className = '', variant = 'default', ...props }) {
  const baseClass = 'card';
  const variantClass = `card--${variant}`;
  const classes = [baseClass, variantClass, className].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}

export default Card;
