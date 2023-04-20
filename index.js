const winston = require('winston')
const express = require('express')
const app = express()

require('./startup/logging')()
require('./startup/routes')(app)
require('./startup/db')()
require('./startup/config')()

winston.add(new winston.transports.File({ filename: 'logfile.log' }))

module.exports = app
