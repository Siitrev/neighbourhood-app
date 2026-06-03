import React from 'react';

export default function SendIcon({ width = 24, height = 24, className = '', ...props }) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none"
      xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"
      className={className} {...props}>
      <path
        d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"
        fill="currentColor"
      />
    </svg>
  );
}
