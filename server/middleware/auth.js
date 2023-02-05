/* authentic middleware */
const jwt = require('jsonwebtoken');

const Auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const dToken = await jwt.verify(token, process.env.SECRET);
    req.user = dToken;
    next();
  } catch (error) {
    res.status(500).json({ error: 'authentication failed' });
  }
};

const localVariable = async (req, res, next) => {
  req.app.locals = {
    OTP: null,
    resetSession: false,
  }
  next()
};

module.exports = { Auth, localVariable };
