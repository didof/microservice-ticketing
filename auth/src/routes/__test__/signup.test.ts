import request from 'supertest'
import { app } from '../../app'

const route = '/api/users/signup'

describe(route, () => {
  describe('POST', () => {
    it('returns status 201 on successful signup', async () => {
      return request(app)
        .post(route)
        .send({
          email: 'test@test.com',
          password: 'password',
        })
        .expect(201)
    })
  })
})
