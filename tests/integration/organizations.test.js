const request = require('supertest')
const { User } = require('../../models/user')

describe('organization route', () => {
  beforeAll(() => {
    server = require('../../startup/server')
    token = new User().generateAuthToken()
  })
  afterAll(async () => {
    await server.close()
  })

  let token

  const exec = () => {
    return request(server)
      .post('/api/organizations')
      .set('x-api-key', token)
      .send({ name: 'Test Organisation',
              email: 'test@email.com',
              registration_number: '12345678',
              sector: "54486180bea5c44011c80870"
            })
  }

  it('should return 400 if an invalid sector id is given', async () => {
    res = await exec()

    expect(res.status).toBe(400)
  })
})
