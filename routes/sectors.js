const { Sector, validate } = require('../models/sector')
const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

// const sectors = [
//   { id: 1, name: 'Arts & Culture' },
//   { id: 2, name: 'Development & Vitality of Territories' },
//   { id: 3, name: 'Environment' },
//   { id: 4, name: 'Funding & Promotion of Volunteering' },
//   { id: 5, name: 'Health & Social Services' },
//   { id: 6, name: 'International Activity' },
//   { id: 7, name: 'Other' },
//   { id: 8, name: 'Rights & Defense of Group Interests' },
//   { id: 9, name: 'Sports & Leisures' }
// ]

router.get('/', async (req, res) => {
  const sectors = await Sector.find().sort('name')
  res.send(sectors)
})

router.post('/', async (req, res) => {
  const { error } = validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  let sector = new Sector({
    name: req.body.name
  })

  sector = await sector.save()

  res.send(sector)
})

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  if(mongoose.Types.ObjectId.isValid(req.params.id)) {
    const sector = await Sector.findByIdAndUpdate(req.params.id, {
      name: req.body.name
    }, { new: true })

    res.send(sector)
  } else {
    return res.status(404).send('The sector with the given ID was not found.')
  }
})

router.delete('/:id', async (req, res) => {
  if(mongoose.Types.ObjectId.isValid(req.params.id)) {
    const sector = await Sector.findByIdAndRemove(req.params.id)
    res.send(sector)
  } else {
    return res.status(404).send('The sector with the given ID was not found.')
  }
})

router.get('/:id', async (req, res) => {
  if(mongoose.Types.ObjectId.isValid(req.params.id)) {
    const sector = await Sector.findById(req.params.id)
    res.send(sector)
  } else {
    return res.status(404).send('The sector with the given ID was not found.')
  }
})

module.exports = router
