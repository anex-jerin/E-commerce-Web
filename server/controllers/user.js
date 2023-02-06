const bcrypt = require('bcrypt');
const User = require('../models/user.js');
const jwt = require('jsonwebtoken');
const otpGenerator = require('otp-generator');

/* middleware for verify user */
const verifyUser = async (req, res, next) => {
  try {
    const { username } = req.method == 'GET' ? req.query : req.body;
    // check if exist
    let exist = await User.findOne({ username });
    if (!exist) return res.status(409).json({ error: 'cannot find user' });
    next();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const registerUser = async (req, res) => {
  try {
    const { username, password, email, profile } = req.body;
    if (!username || !password || !email) {
      return res.status(404).json({ msg: 'sorry' });
    }
    /* check if another user with same username */
    const checkDuplicate = await User.findOne({ email });

    if (checkDuplicate) {
      console.log('duplicate');
      return res.status(409).json({ message: 'duplicate found' });
    }
    /* password hash */
    const saltRounds = Math.floor(Math.random() * (20 - 10) + 10);
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    /* creating data with hashed password */
    const data = { username, password: hashedPassword, email, profile };
    const user = await User.create(data);
    res.status(201).json({ msg: 'Welcome' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const userLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(username, password);
    if (!username || !password) {
      return res.status(404).json({ msg: 'nothing on the field' });
    }
    /* finding user with username */
    // todo -change username to email
    const user = await User.findOne({ email: username });
    if (!user) {
      return res.status(404).json({ error: 'user not found' });
    }
    /* compare password with hashed password  */
    const validate = await bcrypt.compare(password, user.password);
    if (!validate) {
      return res.status(401).json({ error: 'wrong password' });
    }
    /* creating jwt token */
    const token = await jwt.sign(
      {
        userId: user._id,
        username: user.username,
      },
      process.env.SECRET,
      { expiresIn: '24h' }
    );
    /* response with token and user mail */
    res.status(202).json({
      msg: 'Login success',
      username: user.email,
      token,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const { username } = req.params;
    if (!username) {
      return res.status(404).json({ error: 'Invalid username' });
    }
    /* finding user with email */
    const user = await User.findOne({ email: username });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    /* removing password from data */
    user.password = undefined;
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    // const id = req.query.id;
    /* get data from auth middle */
    const { userId } = req.user;
    console.log(userId);
    if (!userId) return res.status(404).json({ msg: 'id is not available' });
    const data = req.body;
    const user = await User.findOneAndUpdate({ _id: userId }, data);
    // console.log(user)
    return res.status(200).json({ msg: 'updated' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const generateOtp = async (req, res) => {
  try {
    /* generating otp and storing it */
    req.app.locals.OTP = otpGenerator.generate(4, {
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });
    res.status(201).json({ code: req.app.locals.OTP });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { code } = req.query;
    /* comparing otp */
    if (parseInt(req.app.locals.OTP) === parseInt(code)) {
      req.app.locals.OTP = null;
      req.app.locals.resetSession = true;
      return res.status(202).json({ msg: 'verified successfully' });
    }
    return res.status(404).json({ msg: 'Invalid OTP' });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const createResetSession = (req, res) => {
  if (req.app.locals.resetSession) {
    req.app.locals.resetSession = false;
    return res.status(202).json({ msg: 'access granted' });
  }
  return res.status(440).json({ err: 'session expired!' });
};

const resetPassword = async (req, res) => {
  try {
    if(!req.app.locals.resetSession) return res.status(440).json({ err: 'session expired!' });
    const { username, password} = req.body;
    /* finding user */
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: 'user not found' });

    /* hashing new password */
    const saltRounds = Math.floor(Math.random() * (20 - 10) + 10);
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    /* updating new hashed password */
    user.password = hashedPassword;
    await user.save();
    req.app.locals.resetSession = false;
    res.status(200).json({ msg: 'password updated' });
  } catch {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  registerUser,
  userLogin,
  getUser,
  updateUser,
  generateOtp,
  verifyUser,
  verifyOtp,
  createResetSession,
  resetPassword,
};
