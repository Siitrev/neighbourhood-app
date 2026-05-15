import React from 'react';

export default function LogoutIcon({ width = 18, height = 18, ...props }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path
        d="M7 18H2C1.45 18 0.979167 17.8042 0.5875 17.4125C0.195833 17.0208 0 16.55 0 16V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H7V2H2V16H7V18ZM12.65 13.4L11.25 12.05L14.3 9H5V7H14.3L11.25 3.95L12.65 2.6L18 8L12.65 13.4Z"
        fill="currentColor"
      />
    </svg>
  );
}