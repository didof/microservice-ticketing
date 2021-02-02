import { app } from '../../app'
import request from 'supertest'
import { Ticket } from '../../models/ticket'

const createTicket = () => {
  return request(app)
    .post('/api/tickets')
    .set('Cookie', global.mockAuthentication())
    .send({ title: 'test', price: 1 })
}

it('should fetch a list of tickets', async () => {
  await createTicket()
  await createTicket()

  const response = await request(app).get('/api/tickets').send()
  expect(response.body.length).toEqual(2)
})
