const express = require('express');
const { registerUser } = require('../controllers/auth.js');
const router = express.Router();

router.post('/register', registerUser);

module.exports = router;