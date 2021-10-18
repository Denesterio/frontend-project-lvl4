import * as yup from 'yup';
import i18n from '../i18n.js';

yup.setLocale({
  mixed: {
    required: i18n.t('errors.requiredError'),
    notOneOf: i18n.t('errors.notOneOfError'),
  },
  string: {
    min: ({ min }) => i18n.t('errors.minErrorWithCount', { count: min }),
    max: ({ max }) => i18n.t('errors.maxErrorWithCount', { count: max }),
  },
});

export default yup;
