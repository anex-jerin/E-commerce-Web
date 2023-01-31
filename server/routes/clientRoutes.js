const express = require('express');
const { registerUser, userLogin } = require('../controllers/auth.js');
const router = express.Router();

router.post('/register', registerUser);
router.get('/login', userLogin);

module.exports = router;
