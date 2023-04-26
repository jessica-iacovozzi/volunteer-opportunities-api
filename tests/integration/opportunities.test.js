const request = require('supertest')
const { User } = require('../../models/user')
const { Opportunity } = require('../../models/opportunity')

describe('/api/opportunities', () => {
  beforeEach(() => {
    server = require('../../startup/server')
    token = new User().generateAuthToken()
    id = '64486217bea5c44011c80873' // Invalid ID
  })
  afterEach(async () => {
    await Opportunity.collection.deleteMany({ title: 'Test Opportunity'})
    await server.close()
  })

  let token
  let id

  const post = () => {
    return request(server)
      .post('/api/opportunities')
      .set('x-api-key', token)
      .send({ title: 'Test Opportunity',
              description: 'test description',
              link: 'test.link',
              organization: id
            })
  }

  const get = () => {
    return request(server)
      .get('/api/opportunities/' + id)
  }

  describe('POST /', () => {
    it('should return 400 if an invalid organization id is given', async () => {
      const res = await post()

      expect(res.status).toBe(400)
    })

    it('should save the opportunity if it is valid', async () => {
      id = '64486217bea5c44011c80874' // Valid ID

      await post()

      const opportunity = await Opportunity.find({ title: 'Test Opportunity' })

      expect(opportunity).not.toBeNull()
    })

    it('should return the opportunity if it is valid', async () => {
      id = '64486217bea5c44011c80874' // Valid ID

      const res = await post()

      expect(res.body).toHaveProperty('title', 'Test Opportunity')
    })
  })

  describe('GET /:id', () => {
    it('should return 404 if organization id given is not found', async () => {
      const res = await get()

      expect(res.status).toBe(404)
    })
  })
})
