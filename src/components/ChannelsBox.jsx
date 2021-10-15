import React, { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import NavChannels from './NavChannels.jsx';
import { removeChannel, renameChannel } from '../store/channelsSlice.js';
import { useSocketContext } from '../hooks/useWebsocket.jsx';
import ChannelsBoxHeader from './ChannelBoxHeader.jsx';
import ModalConfirmation from './ModalConfirmation.jsx';
import ModalWithInput from './ModalWithInput.jsx';

const ChannelsBox = () => {
  // получение каналов и списка имен для валидации
  const channels = useSelector((state) => state.channels.channels);
  const channelsNames = useMemo(() => channels.map((ch) => ch.name), [channels]);
  // новое имя канала
  const [newChannelName, setNewChannelName] = useState('');
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  // modal:
  const [modal, setModal] = useState(false);
  const [modalForm, setModalForm] = useState('');
  const [currentModalChannelId, setCurrentModalChannelId] = useState('');
  const toggle = () => setModal(!modal);
  // sokets:
  const [socketOn, socketEmit] = useSocketContext();
  socketOn('removeChannel', (data) => dispatch(removeChannel(data)));
  socketOn('renameChannel', (data) => dispatch(renameChannel(data)));

  // валидация
  const newNameSchema = yup.string().required().notOneOf(channelsNames);

  // delete channel
  const deleteChannel = (id) => () => {
    setModalForm('removeChannel');
    setCurrentModalChannelId(id);
    toggle();
  };
  const submitRemoveChannel = () => {
    setProcessing(true);
    socketEmit('removeChannel', { id: currentModalChannelId })
      .then(() => toggle())
      .finally(() => setProcessing(false));
  };

  // rename channel
  const rename = (id) => () => {
    setModalForm('renameChannel');
    setCurrentModalChannelId(id);
    toggle();
  };

  const submitRenameChannel = (e) => {
    console.dir(channelsNames);
    e.preventDefault();
    setProcessing(true);
    newNameSchema.validate(newChannelName)
      .then((name) => socketEmit('renameChannel', { name, id: currentModalChannelId }))
      .then(() => toggle())
      .catch((err) => {
        setError(err.errors[0]);
      })
      .finally(() => setProcessing(false));
  };

  const formAttrs = {
    id: 'renameChannel_form',
    onSubmit: submitRenameChannel,
  };

  const inputAttrs = {
    type: 'text',
    name: 'name',
    readOnly: processing,
    placeholder: 'Введите название канала',
    value: newChannelName,
    onChange: (e) => setNewChannelName(e.target.value),
    error,
  };

  return (
    <>
      {' '}
      {
         modalForm === 'renameChannel'
           ? (
             <ModalWithInput
               toggle={toggle}
               isOpen={modal}
               modalTitle="Переименовать канал"
               buttonValue="Переименовать"
               isButtonDisabled={processing}
               formAttrs={formAttrs}
               inputAttrs={inputAttrs}
             />
           )
           : (
             <ModalConfirmation
               toggle={toggle}
               isOpen={modal}
               modalTitle="Удалить канал?"
               buttonValue="Удалить"
               isButtonDisabled={processing}
               confirmHandler={submitRemoveChannel}
             />
           )
        }
      <ChannelsBoxHeader className="mt-5 text-center p-2">Каналы:</ChannelsBoxHeader>
      <NavChannels channels={channels} deleteItem={deleteChannel} renameItem={rename} />
    </>
  );
};

export default ChannelsBox;
