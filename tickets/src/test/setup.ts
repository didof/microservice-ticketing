import { app } from '../app'
import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
import jwt from 'jsonwebtoken'

declare global {
  namespace NodeJS {
    interface Global {
      mockAuthentication(): string[]
    }
  }
}

let mongo: MongoMemoryServer
beforeAll(async () => {
  // mock KWT_KEY
  process.env.JWT_KEY = 'testing'

  // establish mongoDB connection
  mongo = new MongoMemoryServer()
  const mongoUri = await mongo.getUri()

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  // set env variables
  process.env.JWT_KEY = 'fakeJWT'
})

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections()

  for (let collection of collections) {
    await collection.deleteMany({})
  }
})

afterAll(async () => {
  await mongo.stop()
  await mongoose.connection.close()
})

global.mockAuthentication = () => {
  // Build a JWT payload  { id, email }
  const payload = {
    id: 'testId',
    email: 'test@test.com',
  }

  // Create JWT
  const token = jwt.sign(payload, process.env.JWT_KEY!)

  // Build session object { jwt: myJWT }
  const session = { jwt: token }

  // take JSON and encode it as base64
  const sessionJSON = JSON.stringify(session)

  // return express:sess={myJWTencoded64}
  const base64 = Buffer.from(sessionJSON).toString('base64')

  return ['express:sess=' + base64]
}
