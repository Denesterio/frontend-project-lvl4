import React, { useRef, useEffect } from 'react';
import cn from 'classnames';

// error, name, value, onChange
const BaseInputGroup = ({
  error = '', name, value, onChange, focused, ...props
}) => {
  const inputRef = useRef(null);
  useEffect(() => {
    if (focused) inputRef.current.focus();
  });

  const inputClasses = cn('form-control', {
    'is-invalid': error.length > 0,
  });

  return (
    <div className="form-group">
      <label htmlFor={name} className="input-label">{name}</label>
      <input
        value={value}
        onChange={onChange}
        ref={inputRef}
        className={inputClasses}
        name={name}
        {...props}
      />
      <p className="invalid-feedback">
        { error }
      </p>
    </div>
  );
};

export default BaseInputGroup;
