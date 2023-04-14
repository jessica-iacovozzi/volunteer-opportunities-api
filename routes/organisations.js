const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()
const Joi = require('joi')

const Organisation = mongoose.model('Organisation', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 140
  },
  email: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 140
  },
  city: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 140
  },
  sectors: {
    type: Array,
    required: true
  }
}))

router.get('/', async (req, res) => {
  const organisations = await Organisation.find().sort('name')
  res.send(organisations)
})

router.post('/', async (req, res) => {
  const { error } = validateOrganisation(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  let organisation = new Organisation({
    name: req.body.name,
    email: req.body.email,
    city: req.body.city,
    sectors: req.body.sectors
  })

  organisation = await organisation.save()

  res.send(organisation)
})

router.put('/:id', async (req, res) => {
  const { error } = validateOrganisation(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  const organisation = await Organisation.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    email: req.body.email,
    city: req.body.city,
    sectors: req.body.sectors
  }, { new: true })

  if (!organisation) return res.status(404).send('The organisation with the given ID was not found.')

  res.send(organisation)
})

router.delete('/:id', async (req, res) => {
  const organisation = await Organisation.findByIdAndRemove(req.params.id)

  if (!organisation) return res.status(404).send('The organisation with the given ID was not found.')

  res.send(organisation)
})

router.get('/:id', async (req, res) => {
  const organisation = await Organisation.findById(req.params.id)

  if (!organisation) return res.status(404).send('The organisation with the given ID was not found.')

  res.send(organisation)
})

function validateOrganisation(organisation) {
  const schema = {
    name: Joi.string().min(3).max(140).required(),
    email: Joi.string().min(3).max(140).required(),
    city: Joi.string().min(3).max(140).required(),
    sectors: Joi.array().required(),
  }

  return Joi.validate(organisation, schema)
}

module.exports = router
