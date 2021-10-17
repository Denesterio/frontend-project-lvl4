import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as yup from 'yup';
import resources from './locales/index.js';

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: 'ru',
  debug: false,
  interpolation: {
    escapeValue: false,
  },
});

yup.setLocale({
  mixed: {
    required: i18n.t('errors.requiredError'),
    notOneOf: i18n.t('notOneOfError'),
  },
  number: {
    min: ({ min }) => ({ key: i18n.t('errors.minError'), values: { min } }),
    max: ({ max }) => ({ key: i18n.t('errors.maxError'), values: { max } }),
  },
});

export default i18n;
