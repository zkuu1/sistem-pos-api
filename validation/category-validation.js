const Joi = require('joi');

const CategoryValidation = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required()
})

const searchCategoryValidation = Joi.object({
    keyword: Joi.string().min(1).required()
})

const getCategoryByIdValidation = Joi.object({
    id: Joi.number().required()
})

module.exports = {
    CategoryValidation,
    searchCategoryValidation,
    getCategoryByIdValidation
}