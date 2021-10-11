import React from 'react';
import { useSelector } from 'react-redux';

const MessagesBoxChannelInfo = ({ currentChannelId, messagesCount }) => {
  const currentChannel = useSelector(
    (state) => state.channels.channels.find(
      (channel) => channel.id === currentChannelId,
    ),
  );

  return (
    <div className="bg-info mb-4 p-4">
      <p className="m-1">
        <b>
          #
          {currentChannel.name}
        </b>
      </p>
      <p className="m-1 text-muted">
        Сообщений:
        {messagesCount}
      </p>
    </div>
  );
};

export default MessagesBoxChannelInfo;
