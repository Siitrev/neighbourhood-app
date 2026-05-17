import React from 'react';

export default function WrenchIcon({ width = 24, height = 24, className = '', ...props }) {
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
        d="M22.61 18.99l-9.08-9.08c.93-2.34.45-5.1-1.44-7-1.79-1.79-4.41-2.35-6.71-1.4L9 5.13 5.14 9l-3.62-3.62c-.98 2.31-.43 4.9 1.37 6.71 1.89 1.89 4.65 2.37 7 1.44l9.08 9.08c.39.39 1.02.39 1.41 0l2.19-2.19c.4-.39.4-1.02.04-1.41z"
        fill="currentColor"
      />
    </svg>
  );
}
