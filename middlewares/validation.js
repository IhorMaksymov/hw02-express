const Joi = require('joi');

const scheme = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().required(),
});
    
module.exports = { scheme };