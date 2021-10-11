import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { useAuthContext } from '../hooks/useAuthContext.jsx';
import { addMessage } from '../store/channelsSlice.js';
import createSocket from '../api/websockets.js';
// import LSHandler from '../utils/LSHandler.js';
import BaseSubmitButton from '../UI/BaseSubmitButton.jsx';

const socket = createSocket();

const MessageBoxMessageForm = ({ currentChannelId }) => {
  const dispatch = useDispatch();
  const authContext = useAuthContext();
  const username = authContext.getUser();
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    socket.on('newMessage', (data) => {
      if ('id' in data) {
        dispatch(addMessage(data));
      }
    });
  }, []);

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: (values) => {
      setIsProcessing(true);
      const message = {
        ...values,
        channelId: currentChannelId,
        username,
      };
      socket.emit('newMessage', message, () => {
        setIsProcessing(false);
        formik.resetForm();
      });
    },
  });

  return (
    <div onSubmit={formik.handleSubmit} className="container p-3 mt-auto">
      <form className="row justify-content-around">
        <input
          name="message"
          onChange={formik.handleChange}
          value={formik.values.message}
          type="text"
          className="form-control col-12 col-md-8 col-lg-9"
          readOnly={isProcessing}
        />
        <BaseSubmitButton
          className="btn-info col-12 col-md-3 col-lg-2"
          value="Отправить"
          disabled={isProcessing}
        />
      </form>
    </div>
  );
};

export default MessageBoxMessageForm;
