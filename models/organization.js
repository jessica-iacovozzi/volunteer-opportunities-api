const mongoose = require('mongoose')
const Joi = require('joi')
const { Sector } = require('./sector')

const organizationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 140,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    minlength: 5,
    maxlength: 320,
    lowercase: true,
    trim: true
  },
  registration_number: {
    type: String
  },
  sector: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sector'
  }
})

const Organization = mongoose.model('Organization', organizationSchema)

function validateOrganization(organization) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(140).required(),
    email: Joi.string().min(3).max(320).email(),
    registration_number: Joi.string(),
    sector: Joi.required()
  })

  return schema.validate(organization)
}

exports.organizationSchema = organizationSchema
exports.Organization = Organization
exports.validate = validateOrganization
