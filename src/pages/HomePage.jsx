import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
// import { Link } from 'react-router-dom';
import { fetchChannels } from '../store/channelsSlice.js';
import LayoutHome from '../components/LayoutHome.jsx';
import ChannelsBox from '../components/ChannelsBox.jsx';
import MessagesBox from '../components/MessagesBox.jsx';
import BasePreloader from '../UI/BasePreloader.jsx';

const HomePage = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchChannels()).finally(() => setIsLoading(false));
  }, []);

  return isLoading
    ? <BasePreloader />
    : (
      <LayoutHome>
        {{
          leftColumn: <ChannelsBox />,
          rightColumn: <MessagesBox />,
        }}
      </LayoutHome>
    );
};

export default HomePage;