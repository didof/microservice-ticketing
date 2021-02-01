import express, { Request, Response } from 'express'

import jwt from 'jsonwebtoken'

import { User } from '../models/user'

import { body } from 'express-validator'
import { validateRequest, BadRequestError } from '@ticketing-didof/common'

const router = express.Router()

router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('E-mail must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body

    const existingUser = await User.findOne({ email })

    if (existingUser) {
      throw new BadRequestError('E-mail is already in use')
    }

    // generate and persist user
    const user = User.build({
      email,
      password,
    })
    await user.save()

    // generate jsonwebtoken
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY!
    )

    // store it on session object
    req.session = {
      jwt: userJwt,
    }

    return res.status(201).send(user)
  }
)

export { router as signupRouter }
