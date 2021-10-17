import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { useAuthContext } from '../hooks/useAuthContext.jsx';
import { useSocketContext } from '../hooks/useWebsocket.jsx';
import BaseSubmitButton from '../UI/BaseSubmitButton.jsx';

const MessageBoxMessageForm = ({ currentChannelId }) => {
  const authContext = useAuthContext();
  const username = authContext.getUser();
  const [isProcessing, setIsProcessing] = useState(false);
  const inputRef = useRef(null);
  const { t } = useTranslation();

  const socketEmit = useSocketContext();

  useEffect(() => {
    inputRef.current.focus();
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
          ref={inputRef}
        />
        <BaseSubmitButton
          className="btn-info col-12 col-md-3 col-lg-2"
          value={t('send')}
          disabled={isProcessing}
        />
      </form>
    </div>
  );
};

export default MessageBoxMessageForm;
