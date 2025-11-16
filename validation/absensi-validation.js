const Joi = require('joi');

const AbsensiValidation = Joi.object({
  name: Joi.string().required(),
  isMember: Joi.boolean().required(),
  date: Joi.date().required(),

  status: Joi.string().required()
});

module.exports = { AbsensiValidation };
