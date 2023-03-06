const bcrypt = require('bcryptjs');

const { User } = require('../../models/userSchema');

const { ctrlWrapper } = require('../../helpers');

const signup = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        res.status(409).json({ message: 'Email in use' });
    }

    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    
    const {subscription } = await User.create({ email, password: hashPassword });
    res.status(201).json({
        user: {
            email,
            subscription,
        }
    })
}

module.exports = {
    signup: ctrlWrapper(signup),
}