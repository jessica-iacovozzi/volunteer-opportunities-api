const winston = require('winston')
const mongoose = require('mongoose')
require('dotenv').config();


module.exports = async function() {
  let db = process.env.MONGODB
  await mongoose.connect(db, { useUnifiedTopology: true })
    .then(() => winston.info(`Connected to ${db}`))
}
