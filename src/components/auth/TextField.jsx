import React from 'react';
import './TextField.css';

export default function TextField({
  id,
  name,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  autoComplete,
  required,
  iconLeft
}) {
  return (
    <div className="text-field">
      <div className="text-field__label-row">
        <label className="text-field__label" htmlFor={id}>
          {label}
        </label>
      </div>
      <div className="text-field__control">
        {iconLeft && <span className="text-field__icon-left">{iconLeft}</span>}
        <input
          id={id}
          name={name}
          type={type}
          className={`text-field__input ${iconLeft ? 'text-field__input--with-icon' : ''}`}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
        />
      </div>
    </div>
  );
}