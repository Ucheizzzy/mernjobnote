import { nanoid } from 'nanoid'

let jobs = [
  { id: nanoid(), company: 'apple', position: 'frontend developer' },
  { id: nanoid(), company: 'goggle', position: 'backend developer' },
]

export const getAllJobs = async (req, res) => {
  res.status(200).json({ jobs })
}

export const createJob = async (req, res) => {
  //destructure the fields from req.body
  const { company, position } = req.body
  if (!company || !position) {
    return res
      .status(400)
      .json({ msg: 'Please provide either company or position' })
  }
  const id = nanoid()
  const job = { id, company, position }
  jobs.push(job)
  res.status(200).json({ job })
}

export const getSingleJob = async (req, res) => {
  const { id } = req.params
  //find the job
  const job = jobs.find((job) => job.id === id)
  if (!job) {
    return res.status(404).json({ msg: `no job with id ${id} found` })
  }
  res.status(200).json({ job })
}

export const updateJob = async (req, res) => {
  const { company, position } = req.body
  if (company === '' || position === '') {
    return res.status(400).json({ msg: 'company and position cannot be empty' })
  }
  const { id } = req.params
  // find the job
  const job = jobs.find((job) => job.id === id)
  if (!job) {
    res.status(404).json({ msg: `no job with id ${id} found` })
  }
  job.company = company
  job.position = position
  res.status(200).json({ msg: 'job modified', job })
}

export const deleteJob = async (req, res) => {
  const { id } = req.params
  //find the job
  const job = jobs.find((job) => job.id === id)
  if (!job) {
    res.status(404).json({ msg: `no job with id ${id} found` })
  }
  // filter the job
  const newJob = jobs.filter((item) => item.id !== id)
  jobs = newJob
  res.status(200).json({ msg: 'job deleted', jobs })
}
