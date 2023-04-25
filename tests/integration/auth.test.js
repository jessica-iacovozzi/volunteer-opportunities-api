const request = require('supertest')
const { User } = require('../../models/user')
const { Opportunity } = require('../../models/opportunity')
const { Organization } = require('../../models/organization')

describe('auth middleware', () => {
  beforeEach(() => {
    server = require('../../startup/server')
    token = new User().generateAuthToken()
  })
  afterEach(async () => {
    await Opportunity.collection.deleteMany({})
    await User.collection.deleteMany({})
    await Organization.collection.deleteMany({})
    await server.close()
  })

  let token

  const exec = () => {
    return request(server)
      .post('/api/opportunities')
      .set('x-api-key', token)
      .send({ title: 'New opportunity',
              description: 'Opportunity description',
              organizationId: '64434edc2d49a774937f219d' })
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

  // it('should return 200 if token is valid', async () => {

  //   const res = await exec()
  //   console.log(res.text)
  //   expect(res.status).toBe(200)
  // })

  it('should return 400 if no email was given', async () => {
    res = await request(server)
      .post('/api/auth')
      .send({ email: '', password: '123456' })

    expect(res.status).toBe(400)
  })
})
