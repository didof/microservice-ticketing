import express, { Request, Response } from 'express'

import { currentUser, requireAuth } from '@ticketing-didof/common'

const router = express.Router()

router.get(
  '/api/users/currentuser',
  currentUser,
  // requireAuth,
  (req: Request, res: Response) => {
    return res.status(200).send({ currentUser: req.currentUser })
  }
)

export { router as currentUserRouter }
