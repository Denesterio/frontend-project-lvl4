import React from 'react';
import BaseModal from './BaseModal.jsx';
import BaseInputGroup from '../UI/BaseInputGroup.jsx';
import BaseSubmitButton from '../UI/BaseSubmitButton.jsx';

const ModalWithInput = ({
  buttonValue, formAttrs, inputAttrs, ...props
}) => (
  <BaseModal {...props}>
    {{
      body: <form {...formAttrs}><BaseInputGroup {...inputAttrs} /></form>,
      confirmButton: <BaseSubmitButton form={formAttrs.id} value={buttonValue} className="btn-primary" />,
    }}
  </BaseModal>
);

export default ModalWithInput;
