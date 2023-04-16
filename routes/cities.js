const { City, validate } = require('../models/city')
const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

router.get('/', async (req, res) => {
  const cities = await City.find().sort('name')
  res.send(cities)
})

router.post('/', async (req, res) => {
  const { error } = validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  let city = new City({
    name: req.body.name
  })

  city = await city.save()

  res.send(city)
})

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  if(mongoose.Types.ObjectId.isValid(req.params.id)) {
    const city = await City.findByIdAndUpdate(req.params.id, {
      name: req.body.name
    }, { new: true })

    res.send(city)
  } else {
    return res.status(404).send('The city with the given ID was not found.')
  }
})

router.delete('/:id', async (req, res) => {
  if(mongoose.Types.ObjectId.isValid(req.params.id)) {
    const city = await City.findByIdAndRemove(req.params.id)
    res.send(city)
  } else {
    return res.status(404).send('The city with the given ID was not found.')
  }
})

router.get('/:id', async (req, res) => {
  if(mongoose.Types.ObjectId.isValid(req.params.id)) {
    const city = await City.findById(req.params.id)
    res.send(city)
  } else {
    return res.status(404).send('The city with the given ID was not found.')
  }
})

module.exports = router
