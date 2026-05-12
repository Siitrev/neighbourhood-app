import React from 'react';
import { Link } from 'react-router-dom';
import './LinkButton.css';

export default function LinkButton({
  children,
  to,
  type = 'button',
  className = '',
  onClick,
  ...props
}) {
  const combinedClassName = `link-button ${className}`.trim();

  if (to) {
    return (
      <Link to={to} className={combinedClassName} onClick={onClick} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={combinedClassName} onClick={onClick} {...props}>
      {children}
    </button>
  );
}