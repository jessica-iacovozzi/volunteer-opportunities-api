const mongoose = require('mongoose')
const Joi = require('joi')
const organization = require('./organization')

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
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization'
  }
}))

function validateOpportunity(opportunity) {
  const schema = Joi.object({
    title: Joi.string().min(10).max(140).required(),
    description: Joi.string().min(10).max(255).required(),
    organization: Joi.required()
  })

  return schema.validate(opportunity)
}

exports.Opportunity = Opportunity
exports.validate = validateOpportunity
