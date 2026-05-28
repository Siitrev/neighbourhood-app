import React from 'react';
import './Loader.css';

export default function Loader({ width = '100%', height = '100%', className = '' }) {
  return (
    <div 
      className={`skeleton-loader ${className}`}
      style={{ width, height }}
      role="status" 
      aria-label="Ładowanie zawartości"
    >
      <span className="sr-only" style={{ display: 'none' }}>Ładowanie...</span>
    </div>
  );
}