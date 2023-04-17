const mongoose = require('mongoose')
const Joi = require('joi')

const citySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
    trim: true
  }
})

const City = mongoose.model('City', citySchema)

function validateCity(city) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required()
  })

  return schema.validate(city)
}

exports.citySchema = citySchema
exports.City = City
exports.validate = validateCity
