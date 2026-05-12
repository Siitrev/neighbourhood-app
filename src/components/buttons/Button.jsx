import React from 'react';
import './Button.css';

export default function Button({
  children,
  type = 'button',
  className = '',
  onClick,
  ...props
}) {
  return (
    <button
      type={type}
      className={`btn-primary ${className}`.trim()}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}