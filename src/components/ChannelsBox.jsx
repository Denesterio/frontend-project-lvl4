import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { changeChannel } from '../store/channelsSlice.js';
import ChannelsBoxHeader from './ChannelBoxHeader.jsx';

const ChannelsBox = () => {
  const channels = useSelector((state) => state.channels.channels);
  const dispatch = useDispatch();
  const changeCurrentChannel = (id) => () => {
    dispatch(changeChannel(id));
  };

  const getNavItem = (channel) => (
    <NavItem className="" key={channel.id}>
      <NavLink onClick={changeCurrentChannel(channel.id)}>{channel.name}</NavLink>
    </NavItem>
  );
  return (
    <>
      <ChannelsBoxHeader className="mt-5 text-center p-2">Каналы:</ChannelsBoxHeader>
      <Nav pills vertical className="nav-fill px-2">
        {channels.map(getNavItem)}
      </Nav>
    </>
  );
};

export default ChannelsBox;
