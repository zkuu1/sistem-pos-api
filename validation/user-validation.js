const Joi = require('joi');

const registerUserValidation = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    address: Joi.string().min(6).required(),
    role: Joi.string().valid('user', 'admin').optional(),
    membership: Joi.string().valid('non_member', 'member').optional(),
});

const loginUserValidation = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

const getUserValidation = Joi.string().max(100)

const searchUserValidation = Joi.object({
  keyword: Joi.string().min(1).required()
});


const updateUserValidation = Joi.object({
    name: Joi.string().min(3).max(30),
    email: Joi.string().email(),
    password: Joi.string().min(6),
    address: Joi.string().min(6),
    role: Joi.string().valid('user', 'admin').optional(),
    membership: Joi.string().valid('non_member', 'member').optional(),
});

module.exports = {
    registerUserValidation,
    loginUserValidation,
    getUserValidation,
    searchUserValidation,
    updateUserValidation
}