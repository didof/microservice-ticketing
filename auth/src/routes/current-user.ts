import express, { Request, Response } from 'express'

import { currentUser } from '../middlewares/current-user'
import { requireAuth } from '../middlewares/require-auth'

const router = express.Router()

router.get(
  '/api/users/currentuser',
  currentUser,
  requireAuth,
  (req: Request, res: Response) => {
    return res.status(200).send({ currentUser: req.currentUser })
  }
)

export { router as currentUserRouter }
