import React from 'react';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';
import { has } from 'lodash';

const BaseModal = ({
  isOpen, toggle, modalTitle, className = '', children = {},
}) => (
  <div>
    <Modal isOpen={isOpen} toggle={toggle} className={className}>
      <ModalHeader toggle={toggle}>{modalTitle}</ModalHeader>
      {has(children, 'body') && (
      <ModalBody>
        {children.body}
      </ModalBody>
      )}
      <ModalFooter>
        {children.confirmButton}
        {' '}
        <Button color="secondary" onClick={toggle}>Отмена</Button>
      </ModalFooter>
    </Modal>
  </div>
);
export default BaseModal;
