const request = require('supertest')
const { User } = require('../../models/user')

describe('/api/users', () => {
  beforeEach(() => {
    server = require('../../startup/server')
  })
  afterEach(async () => {
    await User.collection.deleteMany({ name: 'Test Name'})
    await server.close()
  })

  let email

  const post = async () => {
    return await request(server)
      .post('/api/users')
      .send({
              name: 'Test Name',
              email,
              password: '123Pass*'
            })
  }

  it('should return 400 if email is already registered', async () => {
    email = 'test@gmail.com'

    const res = await post()

    expect(res.status).toBe(400)
  })

  it('should return user if valid api key is given', async () => {
    email = 'test2@gmail.com'

    const key = await post()
    const res = await request(server).get('/api/users/me').set('x-api-key', key.headers['x-api-key'])

    expect(res.body).toHaveProperty('name', 'Test Name')
  })
})
