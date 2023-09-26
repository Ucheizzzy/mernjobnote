//to access ,env variables
import * as dotenv from 'dotenv'
dotenv.config()
//initialize express
import express from 'express'
const app = express()
//morgan is used to give detailed request made on the server
import morgan from 'morgan'
import jobRouter from './routes/jobRouter.js'

//middleware for json
app.use(express.json())

//find all jobs
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
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`server is listening on port ${port}`)
})
