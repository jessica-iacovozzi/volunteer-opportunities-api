const mongoose = require('mongoose')
const Joi = require('joi')
const { organisationSchema } = require('./organisation')

const Opportunity = mongoose.model('Opportunity', new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 140
  },
  description: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 255
  },
  organisation: {
    type: organisationSchema,
    required: true
  }
}))

function validateOpportunity(opportunity) {
  const schema = Joi.object({
    title: Joi.string().min(10).max(140).required(),
    description: Joi.string().min(10).max(255).required(),
    organisationId: Joi.string().required()
  })

  return schema.validate(opportunity)
}

exports.Opportunity = Opportunity
exports.validate = validateOpportunity
