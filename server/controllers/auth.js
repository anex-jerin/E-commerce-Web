const bcrypt = require('bcrypt');
const User = require('../models/user.js');

const registerUser = async (req, res) => {
  try {
    const { username, password, email, profile } = req.body;
    const checkDuplicate = User.find({ email });
    if (checkDuplicate) {
      console.log('duplicate');
      return res.status(409).json({ message: 'duplicate found' });
    }
    const saltRounds = Math.floor(Math.random() * (20 - 10) + 10);
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const data = { username, password: hashedPassword, email, profile };
    const user = await User.create(data);
    res.status(200).json(user.username);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const userLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({
      $or: [{ username }, { email: username }],
    });
    if (!user) {
      return res.status(404).json({ message: 'user not found' });
    }
    const validate = await bcrypt.compare(password, user.password);
    if (!validate) {
      return res.status(404).json({ message: 'wrong password' });
    }
    user.password = undefined;
    // const user = await User.find();
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { registerUser, userLogin };
