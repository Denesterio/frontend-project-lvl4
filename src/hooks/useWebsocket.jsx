import React, { useEffect, useContext } from 'react';
import { useDispatch } from 'react-redux';
import createSocket from '../api/websockets.js';
import {
  addChannel, changeChannel, removeChannel, renameChannel, addMessage,
} from '../store/channelsSlice.js';

const SocketContext = React.createContext();

const useSocketProvider = () => {
  const socket = createSocket();

  const useSocketOn = (event, callback) => {
    useEffect(() => {
      socket.on(event, callback);
      return () => {
        socket.disconnect();
        socket.close();
      };
    }, []);
  };

  const emit = (event, payload) => (
    new Promise((resolve) => socket.emit(event, payload, (data) => resolve(data)))
  );

  return [socket, useSocketOn, emit];
};

const SocketProvider = ({ children }) => {
  const [, socketOn, emit] = useSocketProvider();
  const dispatch = useDispatch();

  socketOn('newChannel', (data) => {
    dispatch(addChannel(data));
    dispatch(changeChannel(data.id));
  });
  socketOn('removeChannel', (data) => dispatch(removeChannel(data)));
  socketOn('renameChannel', (data) => dispatch(renameChannel(data)));
  socketOn('newMessage', (data) => {
    if ('id' in data) {
      dispatch(addMessage(data));
    }
  });

  return <SocketContext.Provider value={emit}>{children}</SocketContext.Provider>;
};

const useSocketContext = () => useContext(SocketContext);

export { SocketProvider, useSocketContext };
