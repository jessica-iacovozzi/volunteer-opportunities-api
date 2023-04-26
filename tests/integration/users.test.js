const request = require('supertest')

describe('/api/users', () => {
  beforeAll(() => {
    server = require('../../startup/server')
  })
  afterAll(async () => {
    await server.close()
  })

  const exec = () => {
    return request(server)
      .post('/api/users')
      .send({ name: 'Test Name',
              email: 'test@gmail.com',
              password: '123Pass*'
            })
  }

  it('should return 400 if email is already registered', async () => {
    res = await exec()

    expect(res.status).toBe(400)
  })
})
