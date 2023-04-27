const request = require('supertest')
const mongoose = require('mongoose')
const { Sector } = require('../../models/sector')
const { User } = require('../../models/user')
let server

describe('/api/sectors', () => {
  beforeEach(() => { server = require('../../startup/server') })
  afterEach(async () => {
    await Sector.collection.deleteMany({ name: 'Sector1'})
    await server.close()
  })

  describe('GET /', () => {
    it('should return all sectors', async () => {
      await Sector.collection.insertOne({ name: 'Sector1'})

      const res = await request(server).get('/api/sectors')

      expect(res.status).toBe(200)
      expect(res.body.some(sector => sector.name === 'Sector1')).toBeTruthy()
    })
  })

  describe('GET /:id', () => {
    it('should return a sector if a valid id is given', async () => {
      const sector = new Sector({ name: 'Sector1 '})
      await sector.save()

      const res = await request(server).get('/api/sectors/' + sector._id)

      expect(res.status).toBe(200)
      expect(res.body).toHaveProperty('name', sector.name)
    })

    it('should return 404 if invalid ID is given', async () => {
      const id = new mongoose.Types.ObjectId()
      const res = await request(server).get('/api/sectors/' + id)

      expect(res.status).toBe(404)
    })
  })

  describe('POST /', () => {
    let token
    let name

    const exec = async () => {
      return await request(server)
      .post('/api/sectors')
      .set('x-api-key', token)
      .send({ name })
    }

    beforeEach(() => {
      token = new User().generateAuthToken()
      name = 'Sector1'
    })

    it('should return 401 if client is not logged in', async () => {
      token = ''

      const res = await exec()

      expect(res.status).toBe(401)
    })

    it('should return 400 if sector name is less than 5 characters', async () => {
      name = 'Sect'

      const res = await exec()

      expect(res.status).toBe(400)
    })

    it('should return 400 if sector name is more than 50 characters', async () => {
      name = new Array(52).join('a')

      const res = await exec()

      expect(res.status).toBe(400)
    })

    it('should save the sector if it is valid', async () => {
      await exec()

      const sector = await Sector.find({ name: 'Sector1' })

      expect(sector).not.toBeNull()
    })

    it('should return the sector if it is valid', async () => {
      const res = await exec()

      expect(res.body).toHaveProperty('_id')
      expect(res.body).toHaveProperty('name', 'Sector1')
    })
  })
})
