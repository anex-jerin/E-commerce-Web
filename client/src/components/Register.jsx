import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import avatar from '../assets/avatar.jpg';
import styles from '../styles/Login.module.css';
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { loginValidate } from './pages/validate';
import convertToBase64 from './pages/convert';

const Login = () => {
  const [file, setFile] = useState();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      email:''
    },
    validate: loginValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = Object.assign(values, { profile: file || '' });
      console.log(values);
    },
  });

  // converting file
  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  };

  return (
    <div className='container mx-auto'>
      <Toaster position='bottom-center'></Toaster>
      <div className='flex justify-center items-center h-screen'>
        <div className={styles.glass}>
          <div className='title flex flex-col items-center '>
            <h4 className='text-5xl font-bold'>Register</h4>
            <form className='py-1' onSubmit={formik.handleSubmit}>
              <div className='profile flex justify-center py-4'>
                <div className={styles.profile}>
                  <label htmlFor='profile'>
                    <img src={file || avatar} alt='avatar' />
                  </label>
                  <input type='file' id='profile' name='profile' onChange={onUpload} />
                </div>
              </div>
              <div className='textbox flex flex-col items-center gap-5'>
                <input
                  {...formik.getFieldProps('email')}
                  className={styles.input}
                  type='text'
                  placeholder='Email'
                />
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
                  sign in
                </button>
              </div>
              <div className='text-center py-4'>
                <span className='text-gray-500'>
                  Already signed up?&nbsp;
                  <Link to='/login' className='text-red-500'>
                    Login
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
