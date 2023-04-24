const winston = require('winston')
require('dotenv').config();
require('winston-mongodb')
require('express-async-errors')

module.exports = function() {
  winston.exceptions.handle(
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
  )

  process.on('unhandledRejection', (ex) => {
    throw ex
  })

  winston.add(new winston.transports.MongoDB({
    db: process.env.MONGODB,
    level: 'info',
    options: { useUnifiedTopology: true }
  }))
}
