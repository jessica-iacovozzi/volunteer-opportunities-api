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
    maxlength: 999
  },
  link: {
    type: String,
    unique: true,
    minlength: 5,
    maxlength: 255,
    trim: true
  },
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization'
  }
}))

function validateOpportunity(opportunity) {
  const schema = Joi.object({
    title: Joi.string().min(10).max(140).required(),
    description: Joi.string().min(10).max(999).required(),
    link: Joi.string().min(5).max(255),
    organization: Joi.required()
  })

  return schema.validate(opportunity)
}

exports.Opportunity = Opportunity
exports.validate = validateOpportunity
