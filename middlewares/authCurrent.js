const { User } = require('../models/userSchema');

const jwt = require('jsonwebtoken');


const { SECRET_KEY } = process.env;

const authCurrent = async(req, res, next) => {
    const { authorization = '' } = req.headers;
    const [bearer, token] = authorization.split(' ');
    
    try {
        if (bearer !== 'Bearer') {
            res.status(401).json({message: 'Not authrized'})
    }
        const { id } = jwt.verify(token, SECRET_KEY);
        const user = await User.findById(id);
        if (!user || !user.token) {
            res.status(401).json({message: 'Not authrized'})
        }
        req.user = user;
        next()
    } catch (error) {
        if (error.message === 'Invalid sugnature') {
            error.status = 401
        }
        throw error;
    }
}

module.exports = authCurrent;