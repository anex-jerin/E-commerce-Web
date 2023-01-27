import toast from 'react-hot-toast';


//login verification

export const loginValidate = (values) => {
  const errors = loginVerify({}, values);
  return errors;
};

const loginVerify = (error = {}, values) => {
  if (!values.username) {
    error.username = toast.error('Username required');
  }else if(values.username.includes(' ')){
    error.username = toast.error('invalid username')
  }else if(!values.password){
    error.password = toast.error('password required')
  }
  return error;
};


// register verification
