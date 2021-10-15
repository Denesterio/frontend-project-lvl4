import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import cn from 'classnames';
import { addChannel, changeChannel } from '../store/channelsSlice.js';
import { useSocketContext } from '../hooks/useWebsocket.jsx';
import BaseModal from './BaseModal.jsx';
import { addToForm, createForm, getWithSubmitHander } from '../utils/formBuilder.jsx';
import BaseSubmitButton from '../UI/BaseSubmitButton.jsx';
import useModal from '../hooks/useModal.js';

const ChannelsBoxHeader = ({ className, children }) => {
  const boxClasses = cn('d-flex', 'justify-content-around', className);
  const [socketOn, socketEmit] = useSocketContext();
  const dispatch = useDispatch();
  const [isProcessing, setIsProcessing] = useState(false);

  const [modal, toggle] = useModal();

  // в createForm создается форма, передается первым параметром в addToForm,
  // который добавляет к ней инпут и передает первым параметром в getWithSubmitHander,
  // последний добавляет обработчик подтверждения
  const AddForm = getWithSubmitHander(
    addToForm(
      createForm({ name: 'addChannel_form' }),
      { type: 'text', name: 'name', placeholder: 'Введите название канала' },
    ),
    (values) => {
      setIsProcessing(true);
      return socketEmit('newChannel', values).then((response) => {
        if (response.status === 'ok') {
          setIsProcessing(false);
          toggle();
        }
      });
    },
  );

  socketOn('newChannel', (data) => {
    dispatch(addChannel(data));
    dispatch(changeChannel(data.id));
  });

  return (
    <>
      <BaseModal toggle={toggle} isOpen={modal} modalTitle="Добавить канал">
        {{
          body: AddForm,
          confirmButton: <BaseSubmitButton
            className="btn-primary"
            value="Добавить"
            form="addChannel_form"
            disabled={isProcessing}
          />,
        }}
      </BaseModal>
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
