const mongoose = require('mongoose')
const sectors = require('./routes/sectors')
const organisations = require('./routes/organisations')
const express = require('express')
const app = express()

mongoose.connect('mongodb://localhost/contriboot')
  .then(() => console.log('Connected to mongodb'))
  .catch(err => console.error('Could not connect to mongodb'))

app.use(express.json())
app.use('/api/sectors', sectors)
app.use('/api/organisations', organisations)

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}...`))
