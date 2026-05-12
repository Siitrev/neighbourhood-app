import React from 'react';

import { MailIcon } from '../icons';
import './EmailField.css';

export default function EmailField({
  id = 'email',
  name = 'email',
  label = 'Email',
  value,
  onChange,
  placeholder,
  required,
  autoComplete,
  inputProps,
}) {
  return (
    <div className="auth-field">
      <label className="auth-field__label" htmlFor={id}>
        {label}
      </label>
      <div className="auth-field__control">
        <MailIcon className="auth-field__icon-left" />
        <input
          id={id}
          name={name}
          type="email"
          className="auth-field__input"
          placeholder={placeholder}
          autoComplete={autoComplete}
          value={value}
          onChange={onChange}
          required={required}
          {...inputProps}
        />
      </div>
    </div>
  );
}
