const request = require('supertest')
const { User } = require('../../models/user')
const { Organization } = require('../../models/organization')

describe('/api/organizations', () => {
  beforeEach(() => {
    server = require('../../startup/server')
    token = new User().generateAuthToken()
    id = '644869f90e1588764905ce69' // Invalid ID
  })
  afterEach(async () => {
    await Organization.collection.deleteMany({ name: 'Test Organisation'})
    await server.close()
  })

  let token
  let id

  const post = () => {
    return request(server)
      .post('/api/organizations')
      .set('x-api-key', token)
      .send({ name: 'Test Organisation',
              email: 'test@email.com',
              registration_number: '12345678',
              sector: id
            })
  }

  const get = () => {
    return request(server)
      .get('/api/organizations/' + id)
  }

  describe('POST /', () => {
    it('should return 400 if an invalid sector id is given', async () => {
      const res = await post()

      expect(res.status).toBe(400)
    })

    it('should save the organization if it is valid', async () => {
      id = '64486180bea5c44011c80870' // Valid ID

      await post()

      const organization = await Organization.find({ name: 'Test Organisation' })

      expect(organization).not.toBeNull()
    })

    it('should return the organization if it is valid', async () => {
      id = '64486180bea5c44011c80870' // Valid ID

      const res = await post()

      expect(res.body).toHaveProperty('name', 'Test Organisation')
    })
  })

  describe('GET /:id', () => {
    it('should return 404 if an invalid organization id is given', async () => {
      const res = await get()

      expect(res.status).toBe(404)
    })
  })
})
