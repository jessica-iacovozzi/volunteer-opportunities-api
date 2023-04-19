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
    unique: true,
    minlength: 5,
    maxlength: 320,
    lowercase: true,
    trim: true
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
  const schema = Joi.object({
    name: Joi.string().min(3).max(140).required(),
    email: Joi.string().min(3).max(320).required().email(),
    cityId: Joi.string().required(),
    sectorId: Joi.string().required()
  })

  return schema.validate(organisation)
}

exports.organisationSchema = organisationSchema
exports.Organisation = Organisation
exports.validate = validateOrganisation
