import React, { useMemo, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import MessagesBoxChannelInfo from './MessageBoxChannelInfo.jsx';
import MessageBoxMessageForm from './MessageBoxMessageForm.jsx';

const MessagesBox = () => {
  const { messages, currentChannelId } = useSelector((state) => state.channels);

  const channelMessages = useMemo(() => messages.filter(
    (message) => message.channelId === currentChannelId,
  ));

  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current.scrollTo(0, scrollRef.current.offsetHeight);
  }, [channelMessages]);

  return (
    <div className="d-flex flex-column justify-content-between h-100">
      <MessagesBoxChannelInfo
        currentChannelId={currentChannelId}
        messagesCount={channelMessages.length}
      />
      <div ref={scrollRef} className="overflow-auto px-4 py-2">
        {
                channelMessages.length > 0
                  ? channelMessages.map((m) => (
                    <p key={m.id}>
                      <b>{m.username}</b>
                      :
                      {' '}
                      {m.message}
                    </p>
                  ))
                  : 'Сообщений нет'
              }
      </div>
      <MessageBoxMessageForm currentChannelId={currentChannelId} />
    </div>
  );
};

export default MessagesBox;
