const request = require('supertest')
const { User } = require('../../models/user')

describe('opportunity route', () => {
  beforeAll(() => {
    server = require('../../startup/server')
    token = new User().generateAuthToken()
    id = '54486180bea5c44011c80870'
  })
  afterAll(async () => {
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
      .set('x-api-key', token)
  }

  it('should return 400 if an invalid organization id is given', async () => {
    res = await post()

    expect(res.status).toBe(400)
  })

  it('should return 404 if organization id given is not found', async () => {
    res = await get()

    expect(res.status).toBe(404)
  })
})
