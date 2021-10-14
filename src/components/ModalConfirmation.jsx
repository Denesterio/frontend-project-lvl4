import React from 'react';
import BaseModal from './BaseModal.jsx';
import BaseButton from '../UI/BaseButton.jsx';

const ModalConfirmation = ({ buttonValue, confirmHandler, ...props }) => (
  <BaseModal {...props}>
    {{
      confirmButton: <BaseButton onClick={confirmHandler} className="btn-primary">{buttonValue}</BaseButton>,
    }}
  </BaseModal>
);

export default ModalConfirmation;
