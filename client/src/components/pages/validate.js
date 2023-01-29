import toast from 'react-hot-toast';

//login verification

export const loginValidate = (values) => {
  const errors = loginVerify({}, values);
  return errors;
};

const loginVerify = (error = {}, values) => {
  if (!values.username) {
    error.username = toast.error('Username required');
  } else if (values.username.includes(' ')) {
    error.username = toast.error('invalid username');
  } else if (!values.password) {
    error.password = toast.error('password required');
  }
  return error;
};

// register verification

export const registerValidation = (values) => {
  const errors = emailVerify(values);
  loginVerify(errors,values);
  return errors
};

const emailVerify = (error = {}, values) => {
  if (!values.email) {
    error.email = toast.error('Email Required...!');
  } else if (values.email.includes(' ')) {
    error.email = toast.error('Wrong Email...!');
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    error.email = toast.error('Invalid email address...!');
  }

  return error;
};
