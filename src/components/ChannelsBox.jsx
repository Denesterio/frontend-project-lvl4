import React, { useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Nav } from 'reactstrap';
import {
  changeChannel, removeChannel, renameChannel,
} from '../store/channelsSlice.js';
import { useSocketContext } from '../hooks/useWebsocket.jsx';
import ChannelsBoxHeader from './ChannelBoxHeader.jsx';
import BaseNavItem from '../UI/BaseNavItem.jsx';
import BaseDropdownNavItem from '../UI/BaseDropdownNavItem.jsx';
// import BaseModal from './BaseModal.jsx';
// import BaseSubmitButton from '../UI/BaseSubmitButton.jsx';
// import BaseInputGroup from '../UI/BaseInputGroup.jsx';
import ModalConfirmation from './ModalConfirmation.jsx';
import ModalWithInput from './ModalWithInput.jsx';

const ChannelsBox = () => {
  const isChannelBasic = (channel) => !channel.removable;
  const isChannelNew = (channel) => channel.removable;

  const channels = useSelector((state) => state.channels.channels);
  const baseChannels = useMemo(() => channels.filter(isChannelBasic), [channels]);
  const newChannels = useMemo(() => channels.filter(isChannelNew), [channels]);

  const dispatch = useDispatch();
  const [newChannelName, setNewChannelName] = useState('');
  // modal:
  const [modal, setModal] = useState(false);
  const [modalForm, setModalForm] = useState('');
  const [currentModalChannelId, setCurrentModalChannelId] = useState('');
  const toggle = () => {
    setModal(!modal);
  };
  // sokets:
  const [socketOn, socketEmit] = useSocketContext();

  socketOn('removeChannel', (data) => dispatch(removeChannel(data)));
  socketOn('renameChannel', (data) => dispatch(renameChannel(data)));

  const changeCurrentChannel = (id) => () => {
    dispatch(changeChannel(id));
  };

  const deleteChannel = (id) => () => {
    setModalForm('removeChannel');
    setCurrentModalChannelId(id);
    dispatch(changeChannel(1));
    toggle();
  };

  const rename = (id) => () => {
    setModalForm('renameChannel');
    setCurrentModalChannelId(id);
    toggle();
  };

  const submitRenameChannel = () => {
    socketEmit('renameChannel', { name: newChannelName, id: currentModalChannelId }).then(() => toggle());
    toggle();
  };

  const submitRemoveChannel = () => {
    socketEmit('removeChannel', { id: currentModalChannelId }).then(() => toggle());
    toggle();
  };

  const formAttrs = {
    id: 'renameChannel_form',
    onSubmit: submitRenameChannel,
  };

  const inputAttrs = {
    type: 'text',
    name: 'name',
    placeholder: 'Введите название канала',
    value: newChannelName,
    onChange: (e) => setNewChannelName(e.target.value),
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
               confirmHandler={submitRemoveChannel}
             />
           )
        }
      <ChannelsBoxHeader className="mt-5 text-center p-2">Каналы:</ChannelsBoxHeader>
      <Nav pills vertical className="nav-fill px-2">
        {baseChannels.map(
          (ch) => <BaseNavItem item={ch} onClick={changeCurrentChannel} key={ch.id} />,
        )}
        {newChannels.map((ch) => (
          <BaseDropdownNavItem
            onClick={changeCurrentChannel}
            item={ch}
            deleteItem={deleteChannel}
            renameItem={rename}
            key={ch.id}
          />
        ))}
      </Nav>
    </>
  );
};

export default ChannelsBox;
