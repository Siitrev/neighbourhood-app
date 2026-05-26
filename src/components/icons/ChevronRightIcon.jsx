import React from 'react';

export default function ChevronRightIcon({ width = 8, height = 12, className = '', ...props }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 8 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      className={className}
      {...props}
    >
      <path
        d="M2.22 11.11L1.11 10L5.11 6L1.11 2L2.22 0.89L7.33 6L2.22 11.11Z"
        fill="currentColor"
      />
    </svg>
  );
}
