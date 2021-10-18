import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useHistory, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n.js';
import yup from '../locales/yup.js';
import { useAuthContext } from '../hooks/useAuthContext.jsx';
import BaseInputGroup from '../UI/BaseInputGroup.jsx';
import BaseSubmitButton from '../UI/BaseSubmitButton.jsx';
import FormAlertBox from '../UI/FormAlertBox.jsx';
import BaseCard from '../UI/BaseCard.jsx';

const signupSchema = yup.object().shape({
  username: yup.string()
    .required()
    .test(
      'usernameLenght',
      i18n.t('errors.usernameLenght', { minimal: 3, maximal: 20 }),
      (value) => value && value.length >= 3 && value.length <= 20,
    ),
  password: yup.string()
    .min(6)
    .max(50)
    .required(),
  confirmPassword: yup.string()
    .test('confirmPassword_test', i18n.t('errors.notConfirm'), (value, context) => value === context.parent.password),
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
      signup(values)
        .then(() => history.push('/'))
        .catch((err) => setServerErrorMsg(err.message));
    },
  });

  return (
    <div className="d-flex justify-content-center align-items-center h-100">
      <div className="col-md-6">
        <BaseCard>
          {{
            header: t('signup'),
            body: (
              <>
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
                <FormAlertBox message={t(serverErrorMsg)} />
              </>
            ),
            footer: (
              <>
                <span>{t('alreadyRegistered')}</span>
                {' '}
                <Link to="/login">{t('login')}</Link>
              </>
            ),
          }}
        </BaseCard>
      </div>
    </div>
  );
};

export default Signup;
