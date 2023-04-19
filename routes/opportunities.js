const { Opportunity, validate } = require('../models/opportunity')
const { Organisation } = require('../models/organisation')
const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const auth = require('../middleware/auth')

router.get('/', async (req, res) => {
  const opportunities = await Opportunity.find().sort('name')
  res.send(opportunities)
})

router.post('/', auth, async (req, res) => {
  const { error } = validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  const organisation = await Organisation.findById(req.body.organisationId)
  if (!organisation) return res.status(400).send('Invalid organisation.')

  let opportunity = new Opportunity({
    title: req.body.name,
    description: req.body.email,
    organisation: {
      _id: organisation._id,
      name: organisation.name
    }
  })

  opportunity = await opportunity.save()

  res.send(opportunity)
})

// router.put('/:id', async (req, res) => {
//   const { error } = validate(req.body)
//   if (error) return res.status(400).send(error.details[0].message)

//   const organisation = await Organisation.findById(req.body.organisationId)
//   if (!organisation) return res.status(400).send('Invalid organisation.')

//   if(mongoose.Types.ObjectId.isValid(req.params.id)) {
//     const opportunity = await Opportunity.findByIdAndUpdate(req.params.id, {
//       title: req.body.name,
//     description: req.body.email,
//     organisation: {
//       _id: organisation._id,
//       name: organisation.name
//     }
//     }, { new: true })

//     res.send(opportunity)
//   } else {
//     return res.status(404).send('The opportunity with the given ID was not found.')
//   }
// })

// router.delete('/:id', async (req, res) => {
//   if(mongoose.Types.ObjectId.isValid(req.params.id)) {
//     const opportunity = await Opportunity.findByIdAndRemove(req.params.id)
//     res.send(opportunity)
//   } else {
//     return res.status(404).send('The opportunity with the given ID was not found.')
//   }

// })

router.get('/:id', async (req, res) => {
  if(mongoose.Types.ObjectId.isValid(req.params.id)) {
    const opportunity = await Opportunity.findById(req.params.id)
    res.send(opportunity)
  } else {
    return res.status(404).send('The opportunity with the given ID was not found.')
  }
})

module.exports = router
