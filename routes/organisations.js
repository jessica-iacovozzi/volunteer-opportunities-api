const { Organisation, validate } = require('../models/organisation')
const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
  const organisations = await Organisation.find().sort('name')
  res.send(organisations)
})

router.post('/', async (req, res) => {
  const { error } = validate(req.body)
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
  const { error } = validate(req.body)
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

module.exports = router
