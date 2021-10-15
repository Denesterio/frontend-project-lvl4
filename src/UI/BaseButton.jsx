import React from 'react';
import cn from 'classnames';

const BaseButton = ({
  children, className, onClick, ...props
}) => {
  const buttonClasses = cn('btn', className);
  return <button onClick={onClick} type="button" className={buttonClasses} {...props}>{ children }</button>;
};

export default BaseButton;
