import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Login.module.css';
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { loginValidate } from './pages/validate';


const Login = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password:''
    },
    validate: loginValidate, 
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      console.log(values)
    },
  });
  return (
    <div className='container mx-auto'>
      <Toaster position='bottom-center'></Toaster>
      <div className='flex justify-center items-center h-screen'>
        <div className={styles.glass}>
          <div className='title p-8 flex flex-col items-center '>
            <h4 className='text-5xl font-bold'>Login</h4>
            <span className='py-4 text-xl w-2/3 text-center text-gray-500 my-16'>
              explore more with the connectivity
            </span>
            <form className='py-1' onSubmit={formik.handleSubmit}>
              {/* <div className='profile flex justify-center py-4'>
                <div className={styles.profile}>
                  <img src={hello} alt='avatar' />
                </div>
              </div> */}
              <div className='textbox flex flex-col items-center gap-8'>
                <input
                  {...formik.getFieldProps('username')}
                  className={styles.input} 
                  type='text'
                  placeholder='Username'
                />
                <input
                  {...formik.getFieldProps('password')}
                  className={styles.input}
                  type='text'
                  placeholder='Password'
                />
                <button className={styles.btn} type='submit'>
                  Sign In
                </button>
              </div>
              <div className='text-center py-4'>
                <span className='text-gray-500'>
                  Not a User? &nbsp;  
                  <Link to='/register' className='text-red-500'>
                      Register
                  </Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
