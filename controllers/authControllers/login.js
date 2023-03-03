const jwt = require('jsonwebtoken');

const { User } = require('../../models/userSchema');

const { ctrlWrapper } = require('../../helpers');

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !user.comparePassword(password)) {
        res.status(401).json({
            message: 'Email or password is wrong'
        })
    }

    const payload = {
        id: user._id,
    }

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '24h' });
    const {subscription} = await User.findByIdAndUpdate(user._id, { token });
    res.status(200).json({
        token,
        user: {
            email,
            subscription,
        }
    })
}

module.exports = {
    login: ctrlWrapper(login),
}