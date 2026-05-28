import React from 'react';

export default function ChatBubbleIcon({ width = 12, height = 12, className = '', ...props }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      className={className}
      {...props}
    >
      <path
        d="M2.33333 7H9.33333V5.83333H2.33333V7ZM2.33333 5.25H9.33333V4.08333H2.33333V5.25ZM2.33333 3.5H9.33333V2.33333H2.33333V3.5ZM11.6667 11.6667L9.33333 9.33333H1.16667C0.845833 9.33333 0.571181 9.2191 0.342708 8.99063C0.114236 8.76215 0 8.4875 0 8.16667V1.16667C0 0.845833 0.114236 0.571181 0.342708 0.342708C0.571181 0.114236 0.845833 0 1.16667 0H10.5C10.8208 0 11.0955 0.114236 11.324 0.342708C11.5524 0.571181 11.6667 0.845833 11.6667 1.16667V11.6667ZM1.16667 8.16667H9.82917L10.5 8.82292V1.16667H1.16667V8.16667ZM1.16667 8.16667V1.16667V8.16667Z"
        fill="currentColor"
      />
    </svg>
  );
}
