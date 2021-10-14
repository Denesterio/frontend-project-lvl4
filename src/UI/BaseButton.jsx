import React from 'react';
import cn from 'classnames';

const BaseButton = ({
  children, className, onClick,
}) => {
  const buttonClasses = cn('btn', className);
  return <button onClick={onClick} type="button" className={buttonClasses}>{ children }</button>;
};

export default BaseButton;
