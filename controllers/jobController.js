import Job from '../models/jobModel.js'
import { StatusCodes } from 'http-status-codes'

export const getAllJobs = async (req, res) => {
  const jobs = await Job.find({})
  res.status(StatusCodes.OK).json({ jobs })
}

export const createJob = async (req, res) => {
  //destructure the fields from req.body
  // const { company, position } = req.body
  const job = await Job.create(req.body)
  res.status(StatusCodes.CREATED).json({ job })
}

export const getSingleJob = async (req, res) => {
  const { id } = req.params
  const job = await Job.findById(id)
  res.status(StatusCodes.OK).json({ job })
}

export const updateJob = async (req, res) => {
  const { id } = req.params
  // find the job
  const updateJob = await Job.findByIdAndUpdate(id, req.body, {
    new: true,
  })

  res.status(StatusCodes.OK).json({ msg: 'job modified', updateJob })
}

export const deleteJob = async (req, res) => {
  const { id } = req.params
  const removedJob = await Job.findByIdAndDelete(id)
  res.status(StatusCodes.OK).json({ msg: 'job deleted', removedJob })
}
