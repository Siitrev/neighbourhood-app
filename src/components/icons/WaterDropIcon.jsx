import React from 'react';

export default function WaterDropIcon({ width = 24, height = 24, className = '', ...props }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      className={className}
      {...props}
    >
      <path
        d="M12 2L6.5 11.5C6.5 15.09 8.91 18 12 18s5.5-2.91 5.5-6.5L12 2z"
        fill="currentColor"
      />
    </svg>
  );
}
