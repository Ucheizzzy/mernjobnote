//to access ,env variables
import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express'
const app = express()
//morgan is used to give detailed request made on the server
import morgan from 'morgan'
import jobRouter from './routes/jobRouter.js'
import mongoose from 'mongoose'

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}
//middleware for json
app.use(express.json())

//routes
app.use('/api/v1/jobs', jobRouter)

app.get('/', (req, res) => {
  // console.log(req)
  res.json({ message: 'data received', data: req.body })
})

//not found middleware
app.use('*', (req, res) => {
  res.status(404).json({ msg: 'not found' })
})

//error handler middleware
app.use((err, req, res, next) => {
  console.log(err)
  res.status(500).json({ msg: 'something went wrong' })
})

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
