const Joi = require('joi');

const ProductValidation = Joi.object({
    name: Joi.string().max(30).required(),
    description: Joi.string(),
    image: Joi.string(),
    price: Joi.number().required(),
    stock: Joi.number().required(),
    categoryId: Joi.number().required()
})


module.exports = {
    ProductValidation
}
