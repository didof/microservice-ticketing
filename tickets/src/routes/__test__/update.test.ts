import { app } from '../../app'
import request from 'supertest'
import mongoose from 'mongoose'

const id = new mongoose.Types.ObjectId().toHexString()

it('returns 404 if the provided id does not exits', async () => {
  await request(app)
    .put(`/api/tickets/${id}`)
    .set('Cookie', global.mockAuthentication())
    .send({
      title: 'test',
      price: 1,
    })
    .expect(404)
})

it('returns 401 if the user is not authenticated', async () => {
  await request(app)
    .put(`/api/tickets/${id}`)
    .send({
      title: 'test',
      price: 1,
    })
    .expect(401)
})

it('returns 401 if the user does not own the ticket', async () => {
  const response = await request(app)
    .post(`/api/tickets`)
    .set('Cookie', global.mockAuthentication())
    .send({
      title: 'test',
      price: 1,
    })
    .expect(201)

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', global.mockAuthentication())
    .send({
      title: 'updated title',
      price: 3,
    })
    .expect(401)
})

it('return 400 if the user provided invalid input', async () => {
  const cookie = global.mockAuthentication()

  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({
      title: 'title',
      price: 10,
    })
    .expect(201)

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      price: 10,
    })
    .expect(400)

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: 'updated title',
    })
    .expect(400)
})

it('returns 204 if the user is authenticated, is owner and provided valid input', async () => {
  const cookie = global.mockAuthentication()

  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({
      title: 'title',
      price: 10,
    })
    .expect(201)

  const updatedPayload = {
    title: 'updated title',
    price: 42,
  }
  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send(updatedPayload)
    .expect(204)

  const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send()

  expect(ticketResponse.body.title).toEqual(updatedPayload.title)
  expect(ticketResponse.body.price).toEqual(updatedPayload.price)
})
