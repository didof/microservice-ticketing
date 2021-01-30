import request from 'supertest'
import { app } from '../../app'

const route = '/api/users/signin'

describe(route, () => {
  describe('POST', () => {
    describe('successful', () => {
      beforeEach(async () => {
        await global.signup()
      })

      it('returns status 201 if correct payload', async () => {
        await request(app)
          .post(route)
          .send({
            email: 'test@test.com',
            password: 'password',
          })
          .expect(200)
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
      beforeEach(async () => {
        await request(app)
          .post('/api/users/signup')
          .send({
            email: 'test@test.com',
            password: 'password',
          })
          .expect(201)
      })

      it('returns 400 if email not corresponds to any in db', async () => {
        await request(app)
          .post(route)
          .send({
            email: 'johndoe@test.com',
            password: 'password',
          })
          .expect(400)
      })

      it('returns 400 if user exits but password is wrong', async () => {
        await request(app)
          .post(route)
          .send({
            email: 'test@test.com',
            password: 'wrongpassword',
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
          .expect(200)

        expect(response.get('Set-Cookie')).toBeDefined()
      })
    })
  })
})
