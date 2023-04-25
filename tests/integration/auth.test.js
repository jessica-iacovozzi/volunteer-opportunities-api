const request = require('supertest')
const { Sector } = require('../../models/sector')

describe('auth middleware', () => {
  beforeEach(() => {
    server = require('../../startup/server')
  })
  afterEach(async () => {
    await Sector.collection.deleteMany({})
    await server.close()
  })

  let token

  const exec = () => {
    return request(server)
      .post('/api/sectors')
      .set('x-api-key', token)
      .send({ name: 'Animal Welfare' })
  }

  it('should return 401 if no token is provided', async () => {
    token = ''

    const res = await exec()

    expect(res.status).toBe(401)
  })

  it('should return 400 if token is invalid', async () => {
    token = 'a'

    const res = await exec()

    expect(res.status).toBe(400)
  })

  it('should return 400 if no email was given', async () => {
    res = await request(server)
      .post('/api/auth')
      .send({ email: '', password: '123456' })

    expect(res.status).toBe(400)
  })
})
