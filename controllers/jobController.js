import Job from '../models/jobModel.js'
import { StatusCodes } from 'http-status-codes'
import mongoose from 'mongoose'
import day from 'dayjs'

export const getAllJobs = async (req, res) => {
  console.log(req.user)
  const jobs = await Job.find({ createdBy: req.user.userId })
  // console.log(req)
  res.status(StatusCodes.OK).json({ jobs })
}

export const createJob = async (req, res) => {
  // assign createdBy field in the database
  req.body.createdBy = req.user.userId
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

export const showStats = async (req, res) => {
  let stats = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: '$jobStatus', count: { $sum: 1 } } },
  ])
  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr
    acc[title] = count
    return acc
  }, {})

  const defaultStats = {
    applied: stats.applied || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
    accepted: stats.accepted || 0,
  }

  let monthlyApplications = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
        count: { $sum: 1 },
      },
    },
    { $sort: { '_id.year': -1, '_id.month': -1 } },
    { $limit: 6 },
  ])

  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item
      const date = day()
        .month(month - 1)
        .year(year)
        .format('MMM YY')
      return { date, count }
    })
    .reverse()
  // let monthlyApplications = [
  //   { date: 'Aug 23', count: 12 },
  //   { date: 'Sep 23', count: 9 },
  //   { date: 'Oct 23', count: 5 },
  // ]
  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications })
}
