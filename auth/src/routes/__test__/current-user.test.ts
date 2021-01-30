import request from 'supertest'
import { app } from '../../app'

const route = '/api/users/currentuser'

describe(route, () => {
  describe('GET', () => {
    it('responds with details about the current user', async () => {
      const cookie = await global.signup()

      const response = await request(app)
        .get(route)
        .set('Cookie', cookie)
        .send()
        .expect(200)

      expect(response.body.currentUser.email).toEqual('test@test.com')
    })

    it('responds with status 401 if not authorized', async () => {
      const response = await request(app).get(route).send().expect(401)
    })
  })
})
