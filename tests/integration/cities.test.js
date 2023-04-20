const request = require('supertest')
const { City } = require('../../models/city')
const { User } = require('../../models/user')
let server

describe('/api/cities', () => {
  beforeEach(() => { server = require('../../startup/server') })
  afterEach(async () => {
    await City.collection.deleteMany({})
    server.close()
  })

  describe('GET /', () => {
    it('should return all cities', async () => {
      await City.collection.insertMany([
        { name: 'City1' },
        { name: 'City2'}
      ])

      const res = await request(server).get('/api/cities')

      expect(res.status).toBe(200)
      expect(res.body.length).toBe(2)
      expect(res.body.some(city => city.name === 'City1')).toBeTruthy()
      expect(res.body.some(city => city.name === 'City2')).toBeTruthy()
    })
  })

  describe('GET /:id', () => {
    it('should return a city if a valid id is given', async () => {
      const city = new City({ name: 'City3 '})
      await city.save()

      const res = await request(server).get('/api/cities/' + city._id)

      expect(res.status).toBe(200)
      expect(res.body).toHaveProperty('name', city.name)
    })

    it('should return 404 if invalid ID is given', async () => {
      const res = await request(server).get('/api/cities/1')

      expect(res.status).toBe(404)
    })
  })

  describe('POST /', () => {
    let token
    let name

    const exec = async () => {
      return await request(server)
      .post('/api/cities')
      .set('x-api-key', token)
      .send({ name })
    }

    beforeEach(() => {
      token = new User().generateAuthToken()
      name = 'City1'
    })

    it('should return 401 if client is not logged in', async () => {
      token = ''

      const res = await exec()

      expect(res.status).toBe(401)
    })

    it('should return 400 if city is less than 3 characters', async () => {
      name = 'Hi'

      const res = await exec()

      expect(res.status).toBe(400)
    })

    it('should return 400 if city is more than 50 characters', async () => {
      name = new Array(52).join('a')

      const res = await exec()

      expect(res.status).toBe(400)
    })

    it('should save the city if it is valid', async () => {
      await exec()

      const city = await City.find({ name: 'City4' })

      expect(city).not.toBeNull()
    })

    it('should return the city if it is valid', async () => {
      const res = await exec()

      expect(res.body).toHaveProperty('_id')
      expect(res.body).toHaveProperty('name', 'City1')
    })
  })
})
