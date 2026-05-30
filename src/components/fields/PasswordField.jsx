import React, { useId, useState } from 'react';

import { EyeIcon, EyeOffIcon, LockIcon } from '../icons';
import './EmailField.css';
import './PasswordField.css';

export default function PasswordField({
  id,
  name = 'password',
  label = 'Hasło',
  value,
  onChange,
  placeholder,
  required,
  autoComplete,
  labelRight,
  toggleIconProps,
  inputProps,
  defaultShowPassword = false,
}) {
  const reactId = useId();
  const inputId = id ?? `password-${reactId}`;

  const [showPassword, setShowPassword] = useState(defaultShowPassword);

  const { className: inputClassNameProp, ...restInputProps } = inputProps || {};
  const inputClassName = ['auth-field__input auth-field__input--with-right-icon', inputClassNameProp]
    .filter(Boolean)
    .join(' ');

  const labelEl = (
    <label className="auth-field__label" htmlFor={inputId}>
      {label}
    </label>
  );

  return (
    <div className="auth-field">
      {labelRight ? (
        <div className="auth-field__label-row">
          {labelEl}
          {labelRight}
        </div>
      ) : (
        labelEl
      )}

      <div className="auth-field__control">
        <LockIcon className="auth-field__icon-left" />

        <input
          id={inputId}
          name={name}
          type={showPassword ? 'text' : 'password'}
          className={inputClassName}
          placeholder={placeholder}
          autoComplete={autoComplete}
          value={value}
          onChange={onChange}
          required={required}
          {...restInputProps}
        />

        <button
          type="button"
          className="auth-field__toggle"
          onClick={() => setShowPassword((prev) => !prev)}
          aria-label={showPassword ? 'Ukryj hasło' : 'Pokaż hasło'}
          aria-pressed={showPassword}
          aria-controls={inputId}
        >
          {showPassword ? (
            <EyeOffIcon {...toggleIconProps} />
          ) : (
            <EyeIcon {...toggleIconProps} />
          )}
        </button>
      </div>
    </div>
  );
}
