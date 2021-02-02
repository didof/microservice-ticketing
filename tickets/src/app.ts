import express from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import cookieSession from 'cookie-session'

import { newTicketRouter } from './routes/new'
import { showTicketRouter } from './routes/show'
import { indexTicketRouter } from './routes/index'

import {
  errorHandler,
  NotFoundError,
  currentUser,
} from '@ticketing-didof/common'

const app = express()
app.set('trust proxy', true)
app.use(json())
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
)

app.use(currentUser)

app.use(newTicketRouter)
app.use(showTicketRouter)
app.use(indexTicketRouter)

app.all('*', () => {
  throw new NotFoundError()
})

app.use(errorHandler)

export { app }
