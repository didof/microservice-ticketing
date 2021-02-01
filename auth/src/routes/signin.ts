import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import { BadRequestError, validateRequest } from '@ticketing-didof/common'

import { User } from '../models/user'
import { Password } from '../services/password'

import jwt from 'jsonwebtoken'

const router = express.Router()

router.post(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('E-mail must be valid'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('You must supply a password'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body

    const existingUser = await User.findOne({ email })
    if (!existingUser) throw new BadRequestError('Invalid credentials')

    const passwordMath = await Password.compare(existingUser.password, password)

    if (!passwordMath) throw new BadRequestError('Invalid credentials')

    // generate jsonwebtoken
    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY!
    )

    // store it on session object
    req.session = {
      jwt: userJwt,
    }

    return res.status(200).send(existingUser)
  }
)

export { router as signinRouter }
