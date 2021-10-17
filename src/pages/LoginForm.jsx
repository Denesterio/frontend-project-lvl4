import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthContext } from '../hooks/useAuthContext.jsx';
import BaseInputGroup from '../UI/BaseInputGroup.jsx';
import BaseSubmitButton from '../UI/BaseSubmitButton.jsx';
import FormAlertBox from '../UI/FormAlertBox.jsx';

const loginSchema = yup.object().shape({
  username: yup.string().required('Required'),
  password: yup.string().required('Required'),
});

const LoginForm = () => {
  const { login } = useAuthContext();
  const [serverErrorMsg, setServerErrorMsg] = useState('');
  const history = useHistory();
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      login(values).then(() => history.push('/')).catch((err) => setServerErrorMsg(err.message));
    },
  });

  return (
    <div className="row justify-content-center align-items-center h-100">
      <div className="col-md-6">
        <div className="card">
          <div className="card-header text-center">{ t('login') }</div>
          <div className="card-body">
            <form id="authForm" onSubmit={formik.handleSubmit} className="mb-3">
              <BaseInputGroup
                type="text"
                name="username"
                onChange={formik.handleChange}
                value={formik.values.username}
                labelText={t('username')}
                error={formik.errors.username}
              />
              <BaseInputGroup
                type="password"
                name="password"
                labelText={t('password')}
                onChange={formik.handleChange}
                value={formik.values.password}
                error={formik.errors.password}
              />
              <BaseSubmitButton className="btn-primary" value={t('enter')} />
            </form>
            <FormAlertBox message={serverErrorMsg} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
