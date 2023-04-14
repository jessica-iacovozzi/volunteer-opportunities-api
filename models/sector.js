const mongoose = require('mongoose')
const Joi = require('joi')

const Sector = mongoose.model('Sector', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  }
}))

function validateSector(sector) {
  const schema = {
    name: Joi.string().min(5).max(50).required()
  }

  return Joi.validate(sector, schema)
}

exports.Sector = Sector
exports.validate = validateSector
