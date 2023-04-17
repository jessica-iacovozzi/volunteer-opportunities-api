const mongoose = require('mongoose')
const Joi = require('joi')
const { citySchema } = require('./city')
const { sectorSchema } = require('./sector')

const organisationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 140,
    trim: true
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 320,
    lowercase: true,
    trim: true,
    match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
  },
  city: {
    type: citySchema,
    required: true
  },
  sector: {
    type: sectorSchema,
    required: true
  }
})

const Organisation = mongoose.model('Organisation', organisationSchema)

function validateOrganisation(organisation) {
  const schema = {
    name: Joi.string().min(3).max(140).required(),
    email: Joi.string().min(3).max(320).required(),
    cityId: Joi.string().required(),
    sectorId: Joi.string().required(),
  }

  return Joi.validate(organisation, schema)
}

exports.organisationSchema = organisationSchema
exports.Organisation = Organisation
exports.validate = validateOrganisation
