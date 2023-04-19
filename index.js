require('express-async-errors')
require('winston-mongodb')
const winston = require('winston')
const error = require('./middleware/error')
const config = require('config')
const mongoose = require('mongoose')
const sectors = require('./routes/sectors')
const organisations = require('./routes/organisations')
const opportunities = require('./routes/opportunities')
const cities = require('./routes/cities')
const users = require('./routes/users')
const auth = require('./routes/auth')
const express = require('express')
const app = express()

winston.exceptions.handle(
  new winston.transports.File({ filename: 'exceptions.log '})
)

process.on('unhandledRejection', (ex) => {
  throw ex
})

winston.add(new winston.transports.File({ filename: 'logfile.log' }))
winston.add(new winston.transports.MongoDB({
  db: 'mongodb://localhost/contriboot',
  level: 'info',
  options: { useUnifiedTopology: true }
}))

if (!config.get('jwtPrivateKey')) {
  console.log('FATAL ERROR: jwtPrivateKey not defined.')
  process.exit(1)
}

mongoose.connect('mongodb://localhost/contriboot', { useUnifiedTopology: true })
  .then(() => console.log('Connected to mongodb'))
  .catch(err => console.error('Could not connect to mongodb'))

app.use(express.json())
app.use('/api/sectors', sectors)
app.use('/api/organisations', organisations)
app.use('/api/cities', cities)
app.use('/api/opportunities', opportunities)
app.use('/api/users', users)
app.use('/api/auth', auth)
app.use(error)

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}...`))
