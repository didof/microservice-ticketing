import { app } from '../../app'
import request from 'supertest'
import { Ticket } from '../../models/ticket'

const route = '/api/tickets'

it('has a route handler listening to /api/tickets for POST request', async () => {
  const response = await request(app).post(route).send({
    title: 'validTitle',
    price: 10,
  })
  expect(response.status).not.toEqual(404)
})

describe('authentication behaviour', () => {
  it('can only be accessed if the user is authenticated', async () => {
    const response = await request(app).post(route).send({
      title: 'validTitle',
      price: 10,
    })
    expect(response.status).toEqual(401)
  })

  it('returns a status other than 401 if user is authenticated', async () => {
    const response = await request(app)
      .post(route)
      .set('Cookie', global.mockAuthentication())
      .send({
        title: 'validTitle',
        price: 10,
      })
    expect(response.status).not.toEqual(400)
  })
})

describe('input validation', () => {
  it('returns an error if title is not provided', async () => {
    const response = await request(app)
      .post(route)
      .set('Cookie', global.mockAuthentication())
      .send({
        price: 10,
      })
    expect(response.status).toEqual(400)
  })

  it('returns an error if an invalid title is provided', async () => {
    const response = await request(app)
      .post(route)
      .set('Cookie', global.mockAuthentication())
      .send({
        title: '',
        price: 10,
      })
    expect(response.status).toEqual(400)
  })

  it('returns an error if price is provided', async () => {
    const response = await request(app)
      .post(route)
      .set('Cookie', global.mockAuthentication())
      .send({
        title: 'Rush',
      })
    expect(response.status).toEqual(400)
  })

  it('returns an error if an invalid price is provided', async () => {
    const response = await request(app)
      .post(route)
      .set('Cookie', global.mockAuthentication())
      .send({
        title: 'Rush',
        price: -10,
      })
    expect(response.status).toEqual(400)
  })
})

it('creates a ticket for valid inputs', async () => {
  let tickets = await Ticket.find({})
  expect(tickets.length).toEqual(0)

  const payload = {
    title: 'Rush',
    price: 10,
  }

  const response = await request(app)
    .post(route)
    .set('Cookie', global.mockAuthentication())
    .send(payload)

  expect(response.status).toEqual(201)

  tickets = await Ticket.find({})
  expect(tickets.length).toEqual(1)
  expect(tickets[0].title).toEqual(payload.title)
  expect(tickets[0].price).toEqual(payload.price)
})
