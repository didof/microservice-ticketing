import { app } from './app'
import mongoose from 'mongoose'

const start = async () => {
  // check if env variables are defined
  if (!process.env.JWT_KEY) throw new Error('JWT_KEY must be defined')
  if (!process.env.MONGO_URI) throw new Error('MONGO_URI must be defined')

  // connect to DB
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    console.info(`Successfully connected to mongoDB - ${process.env.MONGO_URI}`)
  } catch (err) {
    console.error(err)
  }

  // start to listen
  app.listen(3000, () => {
    console.log('Listening on port 3000')
  })
}

start()
