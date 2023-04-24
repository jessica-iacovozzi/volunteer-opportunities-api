const express = require('express')
const app = express()

require('./startup/logging')()
require('./startup/routes')(app)
require('./startup/db')()
require('./startup/config')()

if (process.env.NODE_ENV === 'production') {
  require('./startup/prod')(app)
}

module.exports = app
