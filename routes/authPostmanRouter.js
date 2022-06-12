const router = require('express').Router();
const auth = require('../controllers/authController');

//Register Page
router.post('/register', auth.register);

// Login Page
router.post('/login', auth.login);

module.exports = router;
