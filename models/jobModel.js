import mongoose from 'mongoose'

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
    },
    position: {
      type: String,
    },
    jobStatus: {
      type: String,
      enum: ['interview', 'declined', 'pending', 'applied', 'accepted'],
      default: 'applied',
    },
    jobType: {
      type: String,
      enum: ['full-time', 'remote', 'hybrid', 'internship', 'part-time'],
      default: 'full-time',
    },
    jobLocation: {
      type: String,
      default: 'my-city',
    },
  },
  { timestamps: true }
)

export default mongoose.model('Job', JobSchema)
