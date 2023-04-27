const request = require('supertest')
const { User } = require('../../models/user')
const { Organization } = require('../../models/organization')

describe('/api/organizations', () => {
  beforeEach(() => {
    server = require('../../startup/server')
    token = new User().generateAuthToken()
    id = '644869f90e1588764905ce69' // Invalid ID
    name = 'Test Organization'
  })
  afterEach(async () => {
    await Organization.collection.deleteMany({ name: 'Test Organization'})
    await server.close()
  })

  let token
  let id
  let name

  const post = () => {
    return request(server)
      .post('/api/organizations')
      .set('x-api-key', token)
      .send({ name,
              email: 'test@email.com',
              registration_number: '12345678',
              sector: id
            })
  }

  const get = () => {
    return request(server)
      .get('/api/organizations/' + id)
  }

  describe('GET /', () => {
    it('should return all organizations', async () => {
      await Organization.collection.insertOne({ name: 'Test Organization'})

      const res = await request(server).get('/api/organizations')

      expect(res.status).toBe(200)
      expect(res.body.some(org => org.name === 'Test Organization')).toBeTruthy()
    })
  })

  describe('POST /', () => {
    it('should return 400 if organization name is less than 3 characters', async () => {
      name = 'Hi'

      const res = await post()

      expect(res.status).toBe(400)
    })

    it('should return 400 if organization name is more than 140 characters', async () => {
      name = new Array(142).join('a')

      const res = await post()

      expect(res.status).toBe(400)
    })

    it('should return 400 if an invalid sector id is given', async () => {
      const res = await post()

      expect(res.status).toBe(400)
    })

    it('should save the organization if it is valid', async () => {
      id = '64486180bea5c44011c80870' // Valid ID

      await post()

      const organization = await Organization.find({ name: 'Test Organization' })

      expect(organization).not.toBeNull()
    })

    it('should return the organization if it is valid', async () => {
      id = '64486180bea5c44011c80870' // Valid ID

      const res = await post()

      expect(res.body).toHaveProperty('name', 'Test Organization')
    })
  })

  describe('GET /:id', () => {
    it('should return 404 if an invalid organization id is given', async () => {
      const res = await get()

      expect(res.status).toBe(404)
    })

    it('should return organization if a valid id is given', async () => {
      const organization = new Organization({
        name: 'Test Organization',
        email: 'test@email.com',
        registration_number: '12345678',
        sector: id
      })

      await organization.save()

      const res = await request(server).get('/api/organizations/' + organization._id)

      expect(res.status).toBe(200)
      expect(res.body).toHaveProperty('name', organization.name)
    })
  })
})
