const express = require('express');

const router = express.Router();

const { validateBody, authCurrent, upload } = require('../../middlewares');
const userSchema = require('../../schema/userSchema');
const {
    signup,
    login,
    logout,
    current,
    updateAvatar,
} = require('../../controllers/authControllers');

router.post('/signup', validateBody(userSchema), signup);

router.post('/login', validateBody(userSchema), login);

router.get('/logout', authCurrent, logout);

router.get('/current', authCurrent, current);

router.patch('/avatars', authCurrent, upload.single('avatar'), updateAvatar);

module.exports = router;