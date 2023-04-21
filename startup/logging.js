const winston = require('winston')
require('winston-mongodb') // might need to comment that out
require('express-async-errors')

module.exports = function() {
  winston.exceptions.handle(
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({ filename: 'exceptions.log '})
  )

  process.on('unhandledRejection', (ex) => {
    throw ex
  })

  winston.add(new winston.transports.MongoDB({
    db: 'mongodb://127.0.0.1:27017/contriboot',
    level: 'info',
    options: { useUnifiedTopology: true }
  }))
}