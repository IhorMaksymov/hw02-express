const Joi = require('joi');

const joiUserSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(6).required(),
})

module.exports = joiUserSchema;