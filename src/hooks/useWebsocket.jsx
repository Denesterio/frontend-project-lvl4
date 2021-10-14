import React, { useEffect, useContext } from 'react';
import createSocket from '../api/websockets.js';

const SocketContext = React.createContext();

const useSocketProvider = () => {
  const socket = createSocket();

  const useSocketOn = (event, callback) => {
    useEffect(() => {
      socket.on(event, callback);
    }, []);
  };

  const emit = (event, payload) => (
    new Promise((resolve) => socket.emit(event, payload, (data) => resolve(data)))
  );

  return [socket, useSocketOn, emit];
};

const SocketProvider = ({ children }) => {
  const [, ...actions] = useSocketProvider();
  return <SocketContext.Provider value={actions}>{children}</SocketContext.Provider>;
};

const useSocketContext = () => useContext(SocketContext);

export { SocketProvider, useSocketContext };
