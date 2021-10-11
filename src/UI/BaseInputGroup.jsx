import React from 'react';
import cn from 'classnames';

const BaseInputGroup = ({
  error = '',
  name,
  ...props
}) => {
  const inputClasses = cn('form-control', {
    'is-invalid': error.length > 0,
  });

  return (
    <div className="form-group">
      <label htmlFor={name} className="input-label">{name}</label>
      <input
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
