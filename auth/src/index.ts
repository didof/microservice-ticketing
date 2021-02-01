import { app } from './app'
import mongoose from 'mongoose'

const start = async () => {
  // check if env variables are defined
  if (!process.env.JWT_KEY) throw new Error('JWT_KEY must be defined')

  // connect to DB
  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    console.info('Successfully connected to mongoDB')
  } catch (err) {
    console.error(err)
  }

  // start to listen
  app.listen(3000, () => {
    console.log('Listening on port 3000')
  })
}

start()
