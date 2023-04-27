const request = require('supertest')
const { User } = require('../../models/user')
const { Opportunity } = require('../../models/opportunity')

describe('/api/opportunities', () => {
  beforeEach(() => {
    server = require('../../startup/server')
    token = new User().generateAuthToken()
    id = '64486217bea5c44011c80874' // Valid ID
    title = 'Test Opportunity'
  })
  afterEach(async () => {
    await Opportunity.collection.deleteMany({ title: 'Test Opportunity'})
    await server.close()
  })

  let token
  let id
  let title

  const post = () => {
    return request(server)
      .post('/api/opportunities')
      .set('x-api-key', token)
      .send({
        title,
        description: 'test description',
        link: 'test.link',
        organization: id
      })
  }

  const get = () => {
    return request(server)
      .get('/api/opportunities/' + id)
  }

  describe('GET /', () => {
    it('should return all opportunities', async () => {
      await Opportunity.collection.insertOne({ title: 'Test Opportunity'})

      const res = await request(server).get('/api/opportunities')

      expect(res.status).toBe(200)
      expect(res.body.some(opp => opp.title === 'Test Opportunity')).toBeTruthy()
    })
  })

  describe('POST /', () => {
    it('should return 400 if opportunity title is less than 10 characters', async () => {
      title = 'Bad opp'

      const res = await post()

      expect(res.status).toBe(400)
    })

    it('should return 400 if opportunity title is more than 140 characters', async () => {
      title = new Array(142).join('a')

      const res = await post()

      expect(res.status).toBe(400)
    })

    it('should return 400 if an invalid organization id is given', async () => {
      id = '64486217bea5c44011c80873' // Invalid ID

      const res = await post()

      expect(res.status).toBe(400)
    })

    it('should save the opportunity if it is valid', async () => {
      await post()

      const opportunity = await Opportunity.find({ title: 'Test Opportunity' })

      expect(opportunity).not.toBeNull()
    })

    it('should return the opportunity if it is valid', async () => {
      const res = await post()

      expect(res.body).toHaveProperty('title', 'Test Opportunity')
    })
  })

  describe('GET /:id', () => {
    it('should return 404 if an invalid opportunity id is given', async () => {
      id = '64486217bea5c44011c80873' // Invalid ID

      const res = await get()

      expect(res.status).toBe(404)
    })

    it('should return opportunity if a valid id is given', async () => {
      const opportunity = new Opportunity({
        title: 'Test Opportunity',
        description: 'test description',
        link: 'test.link',
        organization: id
      })

      await opportunity.save()

      const res = await request(server).get('/api/opportunities/' + opportunity._id)

      expect(res.status).toBe(200)
      expect(res.body).toHaveProperty('title', opportunity.title)
    })
  })
})
