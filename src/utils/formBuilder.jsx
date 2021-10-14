import React from 'react';
import { useFormik } from 'formik';
import BaseSubmitButton from '../UI/BaseSubmitButton.jsx';
import BaseInputGroup from '../UI/BaseInputGroup.jsx';

const createForm = ({ name, className = '' }) => (
  {
    form: { name, className, id: name },
    inputs: [],
  }
);

const addToForm = (
  formOptions,
  {
    type = 'text', name, placeholder = '', className = '',
  },
) => {
  const inputOplions = { type, name };
  if (type === 'submit') {
    inputOplions.className = className;
  } else {
    inputOplions.placeholder = placeholder;
  }

  return {
    form: { ...formOptions.form },
    inputs: [...formOptions.inputs, inputOplions],
  };
};

const getWithSubmitHander = (formOptions, formikHandler) => {
  const { form, inputs } = formOptions;
  const { id, name, className } = form;
  const initialValues = inputs.reduce((acc, cur) => ({ ...acc, [cur.name]: '' }), {});
  const formik = useFormik({
    initialValues,
    onSubmit: formikHandler,
  });

  return (
    <form id={id} name={name} className={className} onSubmit={formik.handleSubmit}>
      {inputs.map(({
        type, className: cName, placeholder, name: inputName,
      }) => (type === 'submit'
        ? (
          <BaseSubmitButton
            type={type}
            className={cName}
            value={inputName}
            key={inputName}
          />
        )
        : (
          <BaseInputGroup
            type={type}
            placeholder={placeholder}
            name={inputName}
            value={formik.values[inputName]}
            onChange={formik.handleChange}
            error={formik.errors[inputName]}
            key={inputName}
          />
        )))}
    </form>
  );
};

export { addToForm, createForm, getWithSubmitHander };
