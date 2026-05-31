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
  iconLeft,
  inputProps,
}) {
  const { className: inputClassNameProp, ...restInputProps } = inputProps || {};
  const inputClassName = [
    'text-field__input',
    iconLeft ? 'text-field__input--with-icon' : '',
    inputClassNameProp,
  ]
    .filter(Boolean)
    .join(' ');

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
          className={inputClassName}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          {...restInputProps}
        />
      </div>
    </div>
  );
}