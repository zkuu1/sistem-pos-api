const Joi = require('joi');

const CategoryValidation = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required()
})

module.exports = {
    CategoryValidation
}