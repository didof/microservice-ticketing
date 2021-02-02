import { app } from '../../app'
import request from 'supertest'
import mongoose from 'mongoose'

it('returs a status 404 if the ticket is not found', async () => {
  const id = new mongoose.Types.ObjectId().toHexString()

  const response = await request(app)
    .get(`/api/tickets/${id}`)
    .send()
    .expect(404)
})

it('returs the ticket if it is found', async () => {
  const payload = {
    title: 'Pink Floyd',
    price: 10,
  }

  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.mockAuthentication())
    .send(payload)
    .expect(201)

  const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send()
    .expect(200)

  expect(ticketResponse.body.title).toEqual(payload.title)
  expect(ticketResponse.body.price).toEqual(payload.price)
})
