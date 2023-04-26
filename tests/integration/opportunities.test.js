const request = require('supertest')
const { User } = require('../../models/user')

describe('opportunity route', () => {
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
      .post('/api/opportunities')
      .set('x-api-key', token)
      .send({ title: 'Test Opportunity',
              description: 'test description',
              link: 'test.link',
              organization: "54486180bea5c44011c80870"
            })
  }

  it('should return 400 if an invalid organization id is given', async () => {
    res = await exec()

    expect(res.status).toBe(400)
  })
})
