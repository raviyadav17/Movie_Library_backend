const express = require('express');
const { getUser, signUp, signIn } = require('../controllers/authController');

const router = express.Router();

router.get('/users/:userId', getUser);
router.post('/signup', signUp);
router.post('/signin', signIn);

module.exports = router;
