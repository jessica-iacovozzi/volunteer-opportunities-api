const winston = require('winston')
const mongoose = require('mongoose')
const config = require('config')
require('dotenv').config();

module.exports = function() {
  let db = process.env.NODE_ENV === 'production' ? process.env.MONGODB : config.get('db')
  mongoose.connect(db, { useUnifiedTopology: true })
    .then(() => winston.info(`Connected to ${db}`))
}
