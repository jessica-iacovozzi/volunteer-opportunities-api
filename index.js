const Joi = require('joi');
const sectors = require('./routes/sectors');
const express = require('express');
const app = express();

app.use(express.json());
app.use('/api/sectors', sectors)

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
