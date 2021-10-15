import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Nav } from 'reactstrap';
import { changeChannel } from '../store/channelsSlice.js';
import BaseNavItem from '../UI/BaseNavItem.jsx';
import BaseDropdownNavItem from '../UI/BaseDropdownNavItem.jsx';

const isChannelBasic = (channel) => !channel.removable;
const isChannelNew = (channel) => channel.removable;

const NavChannels = ({ deleteItem, renameItem, channels }) => {
  const baseChannels = useMemo(() => channels.filter(isChannelBasic), [channels]);
  const newChannels = useMemo(() => channels.filter(isChannelNew), [channels]);

  const dispatch = useDispatch();
  const changeCurrentChannel = (id) => () => {
    dispatch(changeChannel(id));
  };

  return (
    <Nav pills vertical className="nav-fill px-2">
      {baseChannels.map(
        (ch) => <BaseNavItem item={ch} onClick={changeCurrentChannel} key={ch.id} />,
      )}
      {newChannels.map((ch) => (
        <BaseDropdownNavItem
          onClick={changeCurrentChannel}
          item={ch}
          deleteItem={deleteItem}
          renameItem={renameItem}
          key={ch.id}
        />
      ))}
    </Nav>
  );
};

export default NavChannels;
