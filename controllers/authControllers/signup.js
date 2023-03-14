const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const { uuid } = require('uuidv4');

const { User } = require('../../models/userSchema');

const { ctrlWrapper, sendEmail } = require('../../helpers');

const signup = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        res.status(409).json({ message: 'Email in use' });
    }

    const avatarURL = gravatar.url(email);

    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    const verificationToken = uuid();
    
    const {subscription } = await User.create({ email, password: hashPassword, avatarURL, verificationToken });
   
    const mail = {
        to: email,
        subject: "Let's confirm your email address.",
        html: `<a href="http://localhost:3000/api/users/verify/${verificationToken} target="_blank">Comfirm Email Address</a>`
    }

    await sendEmail(mail);
    
    res.status(201).json({
        user: {
            email,
            subscription,
            avatarURL,
        }
    })
}

module.exports = {
    signup: ctrlWrapper(signup),
}