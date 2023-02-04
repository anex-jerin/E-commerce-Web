const express = require('express');
const { registerUser, userLogin, getUser, updateUser } = require('../controllers/auth.js');
const router = express.Router();


/* Register user */
router.post('/register', registerUser);
/* user Login */
router.post('/login', userLogin);

/*get user  */

router.get('/user/:username', getUser);
router.put('/user',updateUser)



module.exports = router;
