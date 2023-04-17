const mongoose = require('mongoose')
const Joi = require('joi')

const sectorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
    trim: true
  }
})

const Sector = mongoose.model('Sector', sectorSchema)

function validateSector(sector) {
  const schema = {
    name: Joi.string().min(5).max(50).required()
  }

  return Joi.validate(sector, schema)
}

exports.sectorSchema = sectorSchema
exports.Sector = Sector
exports.validate = validateSector
