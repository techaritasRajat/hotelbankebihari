function UIcon({ name, size = '1.25rem', color = 'var(--color-primary-500)', style = {}, className = '' }) {
  return (
    <i
      className={`fi ${name}${className ? ` ${className}` : ''}`}
      style={{ fontSize: size, color, lineHeight: 1, display: 'inline-block', ...style }}
      aria-hidden="true"
    />
  );
}

export default UIcon;
