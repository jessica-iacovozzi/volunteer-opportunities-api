const { Sector, validate } = require('../models/sector')
const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const validateObjectId = require('../middleware/validateObjectId')

router.get('/', async (req, res) => {
  const sectors = await Sector.find().sort('name').select('-__v')

  const filters = req.query;
  const filteredSectors = sectors.filter(sector => {
    let isValid = true;
    for (key in filters) {
      isValid = isValid && sector[key] == filters[key];
    }
    return isValid;
  })

  res.send(filteredSectors)
})

router.post('/', auth, async (req, res) => {
  const { error } = validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  let sector = new Sector({
    name: req.body.name
  })

  sector = await sector.save()

  res.send(sector)
})

// router.put('/:id', async (req, res) => {
//   const { error } = validate(req.body)
//   if (error) return res.status(400).send(error.details[0].message)

//   if(mongoose.Types.ObjectId.isValid(req.params.id)) {
//     const sector = await Sector.findByIdAndUpdate(req.params.id, {
//       name: req.body.name
//     }, { new: true })

//     res.send(sector)
//   } else {
//     return res.status(404).send('The sector with the given ID was not found.')
//   }
// })

// router.delete('/:id', async (req, res) => {
//   if(mongoose.Types.ObjectId.isValid(req.params.id)) {
//     const sector = await Sector.findByIdAndRemove(req.params.id)
//     res.send(sector)
//   } else {
//     return res.status(404).send('The sector with the given ID was not found.')
//   }
// })

router.get('/:id', validateObjectId, async (req, res) => {
  const sector = await Sector.findById(req.params.id)

  if (!sector) return res.status(404).send('The sector with the given ID was not found.')

  res.send(sector)
})

module.exports = router
