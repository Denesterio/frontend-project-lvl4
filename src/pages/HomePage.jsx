import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
import { fetchChannels } from '../store/channelsSlice.js';
import LayoutHome from '../components/LayoutHome.jsx';
import ChannelsBox from '../components/ChannelsBox.jsx';
import MessagesBox from '../components/MessagesBox.jsx';
import BasePreloader from '../UI/BasePreloader.jsx';
import { SocketProvider } from '../hooks/useWebsocket.jsx';
import TheHeader from '../components/TheHeader.jsx';

const HomePage = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.channels.loading);

  useEffect(() => {
    dispatch(fetchChannels());
  }, []);

  return loading
    ? <BasePreloader />
    : (
      <SocketProvider>
        <div className="container d-flex flex-column h-100">
          <TheHeader />
          <LayoutHome>
            {{
              leftColumn: <ChannelsBox />,
              rightColumn: <MessagesBox />,
            }}
          </LayoutHome>
        </div>
      </SocketProvider>
    );
};

export default HomePage;
