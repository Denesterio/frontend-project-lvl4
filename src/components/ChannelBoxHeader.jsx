import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import * as yup from 'yup';
import { useSocketContext } from '../hooks/useWebsocket.jsx';
import useModal from '../hooks/useModal.js';
import ModalWithInput from './ModalWithInput.jsx';

const ChannelsBoxHeader = ({ className, children, channelsNames }) => {
  const boxClasses = cn('d-flex', 'justify-content-around', className);
  const socketEmit = useSocketContext();
  const { t } = useTranslation();

  // имя нового канала
  const [newChannelName, setNewChannelName] = useState('');
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const newNameSchema = yup.string().required().notOneOf(channelsNames);

  const [modal, toggle] = useModal();

  const submitAddChannel = (e) => {
    e.preventDefault();
    setProcessing(true);
    newNameSchema.validate(newChannelName)
      .then((name) => socketEmit('newChannel', { name }))
      .then((response) => {
        if (response.status === 'ok') toggle();
      })
      .catch((err) => setError(err.errors[0]))
      .finally(() => setProcessing(false));
  };

  const formAttrs = {
    id: 'addChannel_form',
    onSubmit: submitAddChannel,
  };

  const inputAttrs = {
    type: 'text',
    name: 'name',
    readOnly: processing,
    placeholder: t('channel.insertName'),
    value: newChannelName,
    onChange: (e) => setNewChannelName(e.target.value),
    error,
    labelText: t('channel.name'),
  };

  return (
    <>
      <ModalWithInput
        toggle={toggle}
        isOpen={modal}
        modalTitle={t('channel.add')}
        buttonValue={t('add')}
        isButtonDisabled={processing}
        formAttrs={formAttrs}
        inputAttrs={inputAttrs}
      />
      <div className={boxClasses}>
        <div>{children}</div>
        <div>
          <svg
            onClick={toggle}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-plus-circle"
            viewBox="0 0 16 16"
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
        </div>
      </div>
    </>
  );
};

export default ChannelsBoxHeader;
