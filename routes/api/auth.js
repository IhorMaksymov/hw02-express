const express = require('express');

const router = express.Router();

const { validateBody, authCurrent } = require('../../middlewares');
const userSchema = require('../../schema/userSchema');
const {
    signup,
    login,
    logout,
    current
} = require('../../controllers/authControllers');

router.post('/signup', validateBody(userSchema), signup);

router.post('/login', validateBody(userSchema), login);

router.get('/logout', authCurrent, logout);

router.get('/current', authCurrent, current);

module.exports = router;