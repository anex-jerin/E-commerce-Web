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
    if (!exist) return res.status(400).json({ error: 'cannot find user' });
    next();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const registerUser = async (req, res) => {
  try {
    const { username, password, email, profile } = req.body;
    if (!username || !password || !email) {
      return res.status(401).json({ msg: 'sorry' });
    }
    const checkDuplicate = await User.findOne({ email });

    if (checkDuplicate) {
      console.log('duplicate');
      return res.status(409).json({ message: 'duplicate found' });
    }

    const saltRounds = Math.floor(Math.random() * (20 - 10) + 10);
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const data = { username, password: hashedPassword, email, profile };
    const user = await User.create(data);
    res.status(200).json({ msg: 'Welcome' });
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
    const user = await User.findOne({ email: username });
    if (!user) {
      return res.status(404).json({ error: 'user not found' });
    }
    const validate = await bcrypt.compare(password, user.password);
    if (!validate) {
      return res.status(404).json({ error: 'wrong password' });
    }

    const token = await jwt.sign(
      {
        userId: user._id,
        username: user.username,
      },
      process.env.SECRET,
      { expiresIn: '24h' }
    );
    res.status(200).json({
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
      return res.status(501).json({ error: 'Invalid username' });
    }
    const user = await User.findOne({ email: username });
    if (!user) {
      return res.status(501).json({ error: 'User not found' });
    }
    user.password = undefined;
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    // const id = req.query.id;
    const { userId } = req.user;
    console.log(userId);
    if (!userId) return res.status(500).json({ msg: 'id is not available' });
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
    req.app.locals.OTP = otpGenerator.generate(4, {
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });
    res.status(201).json({ code: req.app.locals.OTP });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { code } = req.query;
    if (parseInt(req.app.locals.OTP) === parseInt(code)) {
      req.app.locals.OTP = null;
      req.app.locals.resetSession = true;
      return res.status(201).json({ msg: 'verified successfully' });
    }
    return res.status(404).json({ msg: 'Invalid OTP' });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const createResetSession = (req, res) => {
  if (req.app.locals.resetSession) {
    req.app.locals.resetSession = false;
    return res.status(200).json({ msg: 'access granted' });
  }
  return res.status(440).json({ err: 'session expired' });
};

const resetPassword = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ error: 'user not found' });
    const saltRounds = Math.floor(Math.random() * (20 - 10) + 10);
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    user.password = hashedPassword;
    await user.save()
  } catch {
    res.status(404).json({ error: error.message });
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
};
