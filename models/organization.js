const mongoose = require('mongoose')
const Joi = require('joi')
const { sectorSchema } = require('./sector')

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
  link: {
    type: String,
    unique: true,
    minlength: 5,
    maxlength: 255,
    trim: true
  },
  registration_number: {
    type: String,
    match: /[0-9]{9}(RR)(0001)/
  },
  sector: {
    type: sectorSchema,
    required: true
  }
})

const Organization = mongoose.model('Organization', organizationSchema)

function validateOrganization(organization) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(140).required(),
    email: Joi.string().min(3).max(320).email(),
    link: Joi.string().min(5).max(255),
    registration_number: Joi.string().pattern(new RegExp('^[0-9]{9}(RR)(0001)$')),
    sectorId: Joi.required()
  })

  return schema.validate(organization)
}

exports.organizationSchema = organizationSchema
exports.Organization = Organization
exports.validate = validateOrganization
