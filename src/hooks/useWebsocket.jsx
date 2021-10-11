import React, { useState, useEffect, useContext } from 'react';
import createSocket from '../api/websockets.js';

const SocketContext = React.createContext();

const useSocketProvider = () => {
  const [socket, setSocket] = useState(null);
  const initSocket = () => setSocket(createSocket());

  const listen = (event, callback) => {
    useEffect(() => {
      socket.on(event, callback);
    }, []);
  };

  const emit = (event, payload, callback) => {
    socket.emit(event, payload, callback);
  };

  return [initSocket, listen, emit];
};

const SocketProvider = ({ children }) => {
  const connection = useSocketProvider();
  return <SocketContext.Provider value={connection}>{children}</SocketContext.Provider>;
};

const useSocketContext = () => useContext(SocketContext);

export default { SocketProvider, useSocketContext };
