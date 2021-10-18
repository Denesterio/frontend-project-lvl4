import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const MessagesBoxChannelInfo = ({ currentChannelId, messagesCount }) => {
  const currentChannel = useSelector(
    (state) => state.channels.channels.find(
      (channel) => channel.id === currentChannelId,
    ),
  );

  const { t } = useTranslation();

  return (
    <div className="bg-info mb-4 p-4">
      <p className="m-1">
        <b>
          #
          {currentChannel.name}
        </b>
      </p>
      <p className="m-1 text-muted">
        {t('messages.messagesWithCount', { count: messagesCount })}
      </p>
    </div>
  );
};

export default MessagesBoxChannelInfo;
