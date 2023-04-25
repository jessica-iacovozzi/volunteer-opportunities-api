const mongoose = require('mongoose')
const Joi = require('joi')
const { organizationSchema } = require('./organization')

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
  organizationId: {
    type: organizationSchema,
    required: true
  }
}))

function validateOpportunity(opportunity) {
  const schema = Joi.object({
    title: Joi.string().min(10).max(140).required(),
    description: Joi.string().min(10).max(255).required(),
    organizationId: Joi.required()
  })

  return schema.validate(opportunity)
}

exports.Opportunity = Opportunity
exports.validate = validateOpportunity
