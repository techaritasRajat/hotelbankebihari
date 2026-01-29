import './Container.css';

function Container({ children, className = '', size = 'xl' }) {
  const sizeClass = `container--${size}`;
  const classes = ['container', sizeClass, className].filter(Boolean).join(' ');

  return <div className={classes}>{children}</div>;
}

export default Container;
