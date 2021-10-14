import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { useAuthContext } from '../hooks/useAuthContext.jsx';
import { useSocketContext } from '../hooks/useWebsocket.jsx';
import { addMessage } from '../store/channelsSlice.js';
import BaseSubmitButton from '../UI/BaseSubmitButton.jsx';

const MessageBoxMessageForm = ({ currentChannelId }) => {
  const dispatch = useDispatch();
  const authContext = useAuthContext();
  const username = authContext.getUser();
  const [isProcessing, setIsProcessing] = useState(false);

  const [socketOn, socketEmit] = useSocketContext();

  socketOn('newMessage', (data) => {
    if ('id' in data) {
      dispatch(addMessage(data));
    }
  });

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
      socketEmit('newMessage', message).then((data) => {
        if (data.status === 'ok') {
          setIsProcessing(false);
          formik.resetForm();
        }
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
