const express = require('express');

const router = express.Router();

const { validateBody, authCurrent, upload } = require('../../middlewares');
const userSchema = require('../../schema/userSchema');
const verifyEmailSchema = ('../../schema/verifiEmailSchema.js');
const {
    signup,
    login,
    logout,
    current,
    updateAvatar,
    verifyEmail,
    resendEmail,
} = require('../../controllers/authControllers');

router.post('/signup', validateBody(userSchema), signup);

router.get('/verify/:verificationToken', verifyEmail);

router.post('/verify', validateBody(verifyEmailSchema), resendEmail);

router.post('/login', validateBody(userSchema), login);

router.get('/logout', authCurrent, logout);

router.get('/current', authCurrent, current);

router.patch('/avatars', authCurrent, upload.single('avatar'), updateAvatar);

module.exports = router;