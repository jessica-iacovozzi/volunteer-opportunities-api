const request = require('supertest')
const { Sector } = require('../../models/sector')
const { User } = require('../../models/user')

describe('auth', () => {
  beforeAll(() => {
    server = require('../../startup/server')
    token = new User().generateAuthToken()
    email = ''
  })
  afterAll(async () => {
    await Sector.collection.deleteOne({ name: 'Test Sector' })
    await server.close()
  })

  let token

  const postSector = () => {
    return request(server)
      .post('/api/sectors')
      .set('x-api-key', token)
      .send({ name: 'Test Sector' })
  }

  const getToken = () => {
    return request(server)
      .post('/api/auth')
      .send({ email,
              password: 'Abc1234*' })
  }

  describe('auth route', () => {
    it('should return 400 if invalid email is given', async () => {
      email = 'testing@email.com'

      res = await getToken()

      expect(res.status).toBe(400)
    })

    it('should return 400 if invalid password is given', async () => {
      email = 'test@gmail.com'

      res = await getToken()

      expect(res.status).toBe(400)
    })

    it('should return 400 if no email was given', async () => {
      res = await getToken()

      expect(res.status).toBe(400)
    })
  })

  describe('auth middleware', () => {
    it('should return 401 if no token is provided', async () => {
      token = ''

      const res = await postSector()

      expect(res.status).toBe(401)
    })

    it('should return 400 if token is invalid', async () => {
      token = 'a'

      const res = await postSector()

      expect(res.status).toBe(400)
    })

  })
})
