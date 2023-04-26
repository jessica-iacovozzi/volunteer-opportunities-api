const request = require('supertest')
const { User } = require('../../models/user')

describe('organization route', () => {
  beforeAll(() => {
    server = require('../../startup/server')
    token = new User().generateAuthToken()
    id = '644869f90e1588764905ce69'
  })
  afterAll(async () => {
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

  it('should return 400 if an invalid sector id is given', async () => {
    res = await post()

    expect(res.status).toBe(400)
  })

  it('should return 404 if an invalid organization id is given', async () => {
    res = await get()

    expect(res.status).toBe(404)
  })
})
