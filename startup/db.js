const winston = require('winston')
const mongoose = require('mongoose')
require('dotenv').config();

module.exports = function() {
  mongoose.connect(process.env.MONGODB, { useUnifiedTopology: true })
    .then(() => winston.info(`Connected to ${process.env.MONGODB}`))
}
