const mongoose = require('mongoose')
const Joi = require('joi')

const City = mongoose.model('City', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  }
}))

function validateCity(city) {
  const schema = {
    name: Joi.string().min(3).max(50).required()
  }

  return Joi.validate(city, schema)
}

exports.City = City
exports.validate = validateCity
