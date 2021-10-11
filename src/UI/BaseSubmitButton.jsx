import React from 'react';
import cn from 'classnames';

const BaseSubmitButton = ({ value, className, ...props }) => {
  const inputClasses = cn('btn', className);
  return (
    <input type="submit" value={value} className={inputClasses} {...props} />
  );
};

export default BaseSubmitButton;
