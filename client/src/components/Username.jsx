// import React from 'react';
// import { Link } from 'react-router-dom';
// import avatar from '../assets/profile.jpg';
// import styles from '../styles/Login.module.css';
// import { Toaster } from 'react-hot-toast';
// import { useFormik } from 'formik';
// import { userNameValidate } from './pages/validate';

// const Username = () => {


//   const formik = useFormik({
//     initialValues: {
//       username: '',
//     },
//     validate: userNameValidate,
//     validateOnBlur: false,
//     validateOnChange: false,
//     onSubmit: async (values) => {
//       console.log(values);
//     },
//   });
//   return (
//     <div className='container mx-auto'>
//       <Toaster position='bottom-center'></Toaster>
//       <div className='flex justify-center items-center h-screen'>
//         <div className={styles.glass}>
//           <div className='title flex flex-col items-center '>
//             <h4 className='text-5xl font-bold'>Hello</h4>
//             <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
//               explore more with the connectivity
//             </span>
//             <form className='py-1' onSubmit={formik.handleSubmit}>
//               <div className='profile flex justify-center py-4'>
//                 <div className={styles.profile}>
//                   <img src={avatar} alt='avatar' />
//                 </div>
//               </div>
//               <div className='textbox flex flex-col items-center gap-5'>
//                 <input
//                   {...formik.getFieldProps('username')}
//                   className={styles.input}
//                   type='text'
//                   placeholder='Username'
//                 />
//                 <button className={styles.btn} type='submit'>
//                   sign in
//                 </button>
//               </div>
//               <div className='text-center py-4'>
//                 <span className='text-gray-500'>
//                   Not a Register
//                   <Link to='/register' className='text-red-500'>
//                     Register
//                   </Link>
//                 </span>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Username;
