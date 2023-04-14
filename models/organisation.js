const mongoose = require('mongoose')
const Joi = require('joi')

const Organisation = mongoose.model('Organisation', new mongoose.Schema({
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
    type: String,
    required: true,
    minlength: 3,
    maxlength: 140,
    trim: true
  },
  sectors: {
    type: Array,
    validate: {
      validator: function(v) { return v && v.length > 0; },
      message: 'A organisation should have at least 1 sector.'
    }
  }
}))

function validateOrganisation(organisation) {
  const schema = {
    name: Joi.string().min(3).max(140).required(),
    email: Joi.string().min(3).max(320).required(),
    city: Joi.string().min(3).max(140).required(),
    sectors: Joi.array().required(),
  }

  return Joi.validate(organisation, schema)
}

exports.Organisation = Organisation
exports.validate = validateOrganisation
