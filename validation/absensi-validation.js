const Joi = require('joi');

const AbsensiValidation = Joi.object({
  name: Joi.string().required(),
  isMember: Joi.boolean().required(),
  date: Joi.date().required(),

  status: Joi.string().required()
});

const searchAbsensiValidation = Joi.object({
  keyword: Joi.string().min(1).required()
})

const getAbsensiByIdValidation = Joi.object({
  id: Joi.number().required()
})

module.exports = { AbsensiValidation, searchAbsensiValidation, getAbsensiByIdValidation };
