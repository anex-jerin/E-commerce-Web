const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');

const registerUser = async (req, res) => {
  const data  = req.body;
  const user = await User.create(data)
  res.status(200).json(user)

};

module.exports = { registerUser };
