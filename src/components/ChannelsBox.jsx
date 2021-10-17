import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import useModal from '../hooks/useModal.js';
import NavChannels from './NavChannels.jsx';
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
  // modal:
  const [modal, toggle] = useModal();
  const [modalForm, setModalForm] = useState('');
  const [currentModalChannelId, setCurrentModalChannelId] = useState('');
  // sokets:
  const socketEmit = useSocketContext();

  // валидация
  const newNameSchema = yup.string().required().notOneOf(channelsNames);
  // переводы
  const { t } = useTranslation();

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
    placeholder: t('channel.insertName'),
    value: newChannelName,
    onChange: (e) => setNewChannelName(e.target.value),
    error,
    labelText: t('channel.name'),
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
               modalTitle={t(`channel.${modalForm}`)}
               buttonValue={t('rename')}
               isButtonDisabled={processing}
               formAttrs={formAttrs}
               inputAttrs={inputAttrs}
             />
           )
           : (
             <ModalConfirmation
               toggle={toggle}
               isOpen={modal}
               modalTitle={t(`channel.${modalForm}`)}
               buttonValue={t('delete')}
               isButtonDisabled={processing}
               confirmHandler={submitRemoveChannel}
             />
           )
        }
      <ChannelsBoxHeader
        channelsNames={channelsNames}
        className="mt-5 text-center p-2"
      >
        {`${t('channel.pl')}:`}
      </ChannelsBoxHeader>
      <NavChannels channels={channels} deleteItem={deleteChannel} renameItem={rename} />
    </>
  );
};

export default ChannelsBox;
