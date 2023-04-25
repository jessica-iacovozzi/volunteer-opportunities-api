const winston = require('winston')
const mongoose = require('mongoose')
require('dotenv').config();

module.exports = function() {
  let db = process.env.NODE_ENV === 'production' ? process.env.MONGODB : "mongodb://127.0.0.1:27017/contriboot_tests"
  mongoose.connect(db, { useUnifiedTopology: true })
    .then(() => winston.info(`Connected to ${db}`))
}
