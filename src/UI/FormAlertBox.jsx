import React from 'react';

const FormAlertBox = ({ message }) => (
  message.length > 0 ? <div className="alert alert-danger" role="alert">{message}</div> : false
);

export default FormAlertBox;
