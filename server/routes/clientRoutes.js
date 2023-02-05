const express = require('express');
const {
  registerUser,
  userLogin,
  getUser,
  updateUser,
  generateOtp,
  verifyUser,
  verifyOtp
} = require('../controllers/user.js');
const router = express.Router();
const {Auth, localVariable} = require('../middleware/auth');

/* Register user */
router.post('/register', registerUser);
/* user Login */
router.post('/login',verifyUser, userLogin);
/*get user  */
router.get('/user/:username', getUser);
/* update user */
router.put('/user', Auth, updateUser);
/* generate OTP */
router.get('/generateOTP',verifyUser,localVariable, generateOtp )
/* verify OTP */
router.get('/verifyOTP',verifyUser, verifyOtp )
 

module.exports = router;
