import React from 'react';
import './AuthFooter.css';

export default function AuthFooter({ text }) {
  const year = new Date().getFullYear();
  const footerText = text ?? `NEIGHBOURHOOD SYSTEM © ${year}`;

  return <div className="auth-footer">{footerText}</div>;
}
