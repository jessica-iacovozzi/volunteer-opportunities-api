const config = require('config')
const jwt = require('jsonwebtoken')
const Joi = require('joi')
const passwordComplexity = require("joi-password-complexity");
const bcrypt = require('bcrypt')
const _ = require('lodash')
const { User } = require('../models/user')
const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

router.post('/', async (req, res) => {
  const { error } = validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  let user = await User.findOne({ email: req.body.email })
  if (!user) return res.status(400).send('Invalid email and/or password.')

  const validPassword = await bcrypt.compare(req.body.password, user.password)
  if (!validPassword) return res.status(400).send('Invalid email and/or password.')

  const token = jwt.sign({ _id: user._id }, config.get('jwtPrivateKey'))
  res.send(token)
})

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().min(3).max(320).required().email(),
    password: passwordComplexity()
  })

  return schema.validate(req)
}

module.exports = router