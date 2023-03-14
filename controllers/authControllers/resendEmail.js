const { User } = require('../../models/userSchema');

const { ctrlWrapper, sendEmail } = require('../../helpers');

const resendEmail = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        res.status(400).json({message: "missing required field email"})
    }
    if (user.verify) {
        res.status(400).json({message: "Verification has already been passed"})
    }

    const mail = {
        to: email,
        subject: "Let's confirm your email address.",
        html: `<a href="http://localhost:3000/api/users/verify/${user.verificationToken} target="_blank">Comfirm Email Address</a>`
    }

    await sendEmail(mail);

    res.status(200).json({ message: "Verification has already been passed" });

}

module.exports = {
    resendEmail: ctrlWrapper(resendEmail),
}