const { Organization, validate } = require('../models/organization')
const { Sector } = require('../models/sector')
const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const auth = require('../middleware/auth')

router.get('/', async (req, res) => {
  const organizations = await Organization.find().sort('name').select('-__v')
  res.send(organizations)
})

router.post('/', auth, async (req, res) => {
  const { error } = validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  const sector = await Sector.findById(req.body.sector)
  if (!sector) return res.status(400).send('Invalid sector.')

  let organization = new Organization({
    name: req.body.name,
    email: req.body.email,
    registration_number: req.body.registration_number,
    sector: sector.name
  })

  organization = await organization.save()

  res.status(201).send(organization)
})

// router.put('/:id', async (req, res) => {
//   const { error } = validate(req.body)
//   if (error) return res.status(400).send(error.details[0].message)

//   const city = await City.findById(req.body.cityId)
//   if (!city) return res.status(400).send('Invalid city.')

//   const sector = await Sector.findById(req.body.sectorId)
//   if (!sector) return res.status(400).send('Invalid sector.')

//   if(mongoose.Types.ObjectId.isValid(req.params.id)) {
//     const organization = await Organization.findByIdAndUpdate(req.params.id, {
//       name: req.body.name,
//     email: req.body.email,
//     city: {
//       _id: city._id,
//       name: city.name
//     },
//     sector: {
//       _id: sector._id,
//       name: sector.name
//     }
//     }, { new: true })

//     res.send(organization)
//   } else {
//     return res.status(404).send('The organization with the given ID was not found.')
//   }
// })

// router.delete('/:id', async (req, res) => {
//   if(mongoose.Types.ObjectId.isValid(req.params.id)) {
//     const organization = await Organization.findByIdAndRemove(req.params.id)
//     res.send(organization)
//   } else {
//     return res.status(404).send('The organization with the given ID was not found.')
//   }

// })

router.get('/:id', async (req, res) => {
  if(mongoose.Types.ObjectId.isValid(req.params.id)) {
    const organization = await Organization.findById(req.params.id)
    res.send(organization)
  } else {
    return res.status(404).send('The organization with the given ID was not found.')
  }
})

module.exports = router
