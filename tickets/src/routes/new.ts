import express, { Request, Response } from 'express'
import { requireAuth, validateRequest } from '@ticketing-didof/common'
import { body } from 'express-validator'

import { Ticket } from '../models/ticket'

const router = express.Router()

router.post(
  '/api/tickets',
  requireAuth,
  [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('price')
      .isFloat({ gt: 0 })
      .withMessage('Price must be greater that zero'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, price } = req.body

    const ticket = Ticket.build({ title, price, userId: req.currentUser!.id })

    const savedTicket = await ticket.save()

    res.status(201).send(savedTicket)
  }
)

export { router as newTicketRouter }
