import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthContext } from '../hooks/useAuthContext.jsx';
import BaseInputGroup from '../UI/BaseInputGroup.jsx';
import BaseSubmitButton from '../UI/BaseSubmitButton.jsx';
import FormAlertBox from '../UI/FormAlertBox.jsx';

const signupSchema = yup.object().shape({
  username: yup.string()
    .min(3, 'Too Short!')
    .max(20, 'Too Long!')
    .required('Required'),
  password: yup.string()
    .min(6, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  confirmPassword: yup.string()
    .min(6, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required')
    .when('password', (value, schema) => schema.oneOf([value])),
});

const Signup = () => {
  const { signup } = useAuthContext();
  const [serverErrorMsg, setServerErrorMsg] = useState('');
  const history = useHistory();
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: signupSchema,
    onSubmit: (values) => {
      signup(values).then(() => history.push('/')).catch((err) => setServerErrorMsg(err.message));
    },
  });

  return (
    <div className="row justify-content-center align-items-center h-100">
      <div className="col-md-6">
        <div className="card">
          <div className="card-header text-center">{ t('signup') }</div>
          <div className="card-body">
            <form id="authForm" onSubmit={formik.handleSubmit} className="mb-3">
              <BaseInputGroup
                type="text"
                name="username"
                labelText={t('username')}
                onChange={formik.handleChange}
                value={formik.values.username}
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
              <BaseInputGroup
                type="password"
                name="confirmPassword"
                labelText={t('confirmPassword')}
                onChange={formik.handleChange}
                value={formik.values.confirmPassword}
                error={formik.errors.confirmPassword}
              />
              <BaseSubmitButton className="btn-primary" value={t('register')} />
            </form>
            <FormAlertBox message={serverErrorMsg} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
