const { Organisation, validate } = require('../models/organisation')
const express = require('express')
const mongoose = require('mongoose')
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

  if(mongoose.Types.ObjectId.isValid(req.params.id)) {
    const organisation = await Organisation.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      email: req.body.email,
      city: req.body.city,
      sectors: req.body.sectors
    }, { new: true })

    res.send(organisation)
  } else {
    return res.status(404).send('The organisation with the given ID was not found.')
  }
})

router.delete('/:id', async (req, res) => {
  if(mongoose.Types.ObjectId.isValid(req.params.id)) {
    const organisation = await Organisation.findByIdAndRemove(req.params.id)
    res.send(organisation)
  } else {
    return res.status(404).send('The organisation with the given ID was not found.')
  }

})

router.get('/:id', async (req, res) => {
  if(mongoose.Types.ObjectId.isValid(req.params.id)) {
    const organisation = await Organisation.findById(req.params.id)
    res.send(organisation)
  } else {
    return res.status(404).send('The organisation with the given ID was not found.')
  }
})

module.exports = router
