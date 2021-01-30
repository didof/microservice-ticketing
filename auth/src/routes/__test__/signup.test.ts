import request from 'supertest'
import { app } from '../../app'

const route = '/api/users/signup'

describe(route, () => {
  describe('POST', () => {
    describe('successful', () => {
      it('returns status 201 if correct payload', async () => {
        await global.signup()
      })
    })

    describe('payload validation', () => {
      it('returs status 400 if missing email', async () => {
        await request(app)
          .post(route)
          .send({ password: 'password' })
          .expect(400)
      })
      it('returs status 400 if invalid email', async () => {
        await request(app)
          .post(route)
          .send({
            email: 'invalidemail',
            password: 'password',
          })
          .expect(400)
      })

      it('returs status 400 if missing password', async () => {
        await request(app)
          .post(route)
          .send({ email: 'test@test.com' })
          .expect(400)
      })
      it('returs status 400 if invalid password', async () => {
        await request(app)
          .post(route)
          .send({
            email: 'test@test.com',
            password: 'foo',
          })
          .expect(400)
      })

      it('returs status 400 if missing email and password', async () => {
        await request(app).post(route).send({}).expect(400)
      })
    })

    describe('behaviour', () => {
      it('disallows duplicate emails', async () => {
        await global.signup()

        await request(app)
          .post(route)
          .send({
            email: 'test@test.com',
            password: 'password',
          })
          .expect(400)
      })

      it('sets cookie after successful signup', async () => {
        const response = await request(app)
          .post(route)
          .send({
            email: 'test@test.com',
            password: 'password',
          })
          .expect(201)

        expect(response.get('Set-Cookie')).toBeDefined()
      })
    })
  })
})
