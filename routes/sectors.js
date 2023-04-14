const express = require('express');
const router = express.Router()

router.use(express.json());

const sectors = [
  { id: 1, name: 'Arts & Culture' },
  { id: 2, name: 'Development & Vitality of Territories' },
  { id: 3, name: 'Environment' },
  { id: 4, name: 'Funding & Promotion of Volunteering' },
  { id: 5, name: 'Health & Social Services' },
  { id: 6, name: 'International Activity' },
  { id: 7, name: 'Other' },
  { id: 8, name: 'Rights & Defense of Group Interests' },
  { id: 9, name: 'Sports & Leisures' }
];

router.get('/', (req, res) => {
  res.send(sectors);
});

router.post('/', (req, res) => {
  const { error } = validatesector(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const sector = {
    id: sectors.length + 1,
    name: req.body.name
  };
  sectors.push(sector);
  res.send(sector);
});

router.put('/:id', (req, res) => {
  const sector = sectors.find(c => c.id === parseInt(req.params.id));
  if (!sector) return res.status(404).send('The sector with the given ID was not found.');

  const { error } = validatesector(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  sector.name = req.body.name;
  res.send(sector);
});

router.delete('/:id', (req, res) => {
  const sector = sectors.find(c => c.id === parseInt(req.params.id));
  if (!sector) return res.status(404).send('The sector with the given ID was not found.');

  const index = sectors.indexOf(sector);
  sectors.splice(index, 1);

  res.send(sector);
});

router.get('/:id', (req, res) => {
  const sector = sectors.find(c => c.id === parseInt(req.params.id));
  if (!sector) return res.status(404).send('The sector with the given ID was not found.');
  res.send(sector);
});

function validatesector(sector) {
  const schema = {
    name: Joi.string().min(3).required()
  };

  return Joi.validate(sector, schema);i
}

module.exports = router;
