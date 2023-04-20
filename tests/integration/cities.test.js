const request = require('supertest')
const { City } = require('../../models/city')
let server

describe('/api/cities', () => {
  beforeEach(() => { server = require('../../startup/server') })
  afterEach(async () => {
    server.close();
    await City.collection.deleteMany({});
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
      const city = new City({ name: 'City1 '})
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
})
