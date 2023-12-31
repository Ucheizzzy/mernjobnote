import 'express-async-errors'
//to access ,env variables
import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express'
const app = express()
//morgan is used to give detailed request made on the server
import morgan from 'morgan'
import jobRouter from './routes/jobRouter.js'
import authRouter from './routes/authRouter.js'
import userRouter from './routes/userRouter.js'
import mongoose from 'mongoose'
//middleware
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js'
import { authenticatedUser } from './middleware/authMiddleware.js'
import cookieParser from 'cookie-parser'
import cloudinary from 'cloudinary'
// public
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import path from 'path'
// security
import helmet from 'helmet'
import mongoSanitize from 'express-mongo-sanitize'

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
})

const __dirname = dirname(fileURLToPath(import.meta.url))
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.static(path.resolve(__dirname, './client/dist')))
app.use(express.json())
app.use(cookieParser())
app.use(helmet())
app.use(mongoSanitize())
//routes
app.use('/api/v1/jobs', authenticatedUser, jobRouter)
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', authenticatedUser, userRouter)
//deployment
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/dist', 'index.html'))
})

//not found middleware
app.use('*', (req, res) => {
  res.status(404).json({ msg: 'not found' })
})

//error handler middleware
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000
try {
  await mongoose.connect(process.env.MONGO_URL)
  app.listen(port, () => {
    console.log(`server is listening on port ${port}`)
  })
} catch (error) {
  console.log(error)
  process.exit(1)
}
