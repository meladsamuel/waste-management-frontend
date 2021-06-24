import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { io } from 'socket.io-client';

const SocketContext = createContext(undefined);

export const useSocket = () => useContext(SocketContext);

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const ws = io(process.env.REACT_APP_WEB_SOCKET);
    setSocket(ws);
    return () => {
      ws.disconnect();
    };
  }, []);

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};

SocketProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default SocketProvider;
