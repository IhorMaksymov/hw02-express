const { User } = require('../../models/userSchema');
const Jimp = require('jimp');
const path = require('path');
const fs = require('fs/promises');

const { ctrlWrapper } = require('../../helpers');

const avatarsDir = path.join(__dirname, '../../', 'public', 'avatars');

const updateAvatar = async (req, res) => {
    if (!req.body) {
        res.status(401).json({
            message: 'Not authorized'
        })
    }
    const { path: tempUpload, originalname } = req.file;
    const { _id } = req.user;
    const fileName = `${_id}_${originalname}`;
    const resultUpload = path.join(avatarsDir, fileName);
    await fs.rename(tempUpload, resultUpload);
    const resizeImage = await Jimp.read(resultUpload);
    resizeImage.resize(250, 250).write(resultUpload)
    const avatarURL = path.join('avatars', fileName);
    await User.findByIdAndUpdate(_id, { avatarURL });
    res.status(200).json({ avatarURL });
   
}

module.exports = {
    updateAvatar: ctrlWrapper(updateAvatar),
}