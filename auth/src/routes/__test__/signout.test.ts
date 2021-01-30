import request from 'supertest'
import { app } from '../../app'

const route = '/api/users/signout'

describe(route, () => {
  describe('POST', () => {
    beforeEach(async () => {
      await request(app)
        .post('/api/users/signup')
        .send({
          email: 'test@test.com',
          password: 'password',
        })
        .expect(201)
    })
    describe('successful', () => {
      it('returns status 200 if successful', async () => {
        await request(app).post(route).send({}).expect(200)
      })
    })

    describe('behaviour', () => {
      it('cookie is not set after successful signout', async () => {
        const response = await request(app)
          .post(route)
          .send({
            email: 'test@test.com',
            password: 'password',
          })
          .expect(200)

        expect(response.get('Set-Cookie')[0]).toEqual(
          'express:sess=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly'
        )
      })
    })
  })
})
