import React from 'react';
import './CheckboxField.css';

export default function CheckboxField({
  id,
  name,
  checked,
  onChange,
  label,
  labelledById,
  variant = 'default'
}) {
  const labelId = labelledById || (id ? `${id}-label` : undefined);

  return (
    <div className={`checkbox-group${variant === 'terms' ? ' checkbox-group--terms' : ''}`}>
      <input
        type="checkbox"
        id={id}
        name={name}
        className="checkbox-input"
        checked={checked}
        onChange={onChange}
        aria-labelledby={labelId}
      />
      {label ? (
        <label id={labelId} htmlFor={id} className="checkbox-label">
          {label}
        </label>
      ) : null}
    </div>
  );
}
