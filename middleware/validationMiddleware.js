import { body, param, validationResult } from 'express-validator'
import { BadRequestError, NotFoundError } from '../errors/customErrors.js'
import { JOB_STATUS, JOB_TYPE } from '../utils/constants.js'
import mongoose from 'mongoose'
import Job from '../models/jobModel.js'
const withValidationErrors = (validationValues) => {
  return [
    validationValues,
    (req, res, next) => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg)
        if (errorMessages[0].startsWith('no job')) {
          throw new NotFoundError(errorMessages)
        }
        throw new BadRequestError(errorMessages)
      }
      next()
    },
  ]
}

export const validateTest = withValidationErrors([
  body('name')
    .notEmpty()
    .withMessage('name is required here')
    .isLength({ min: 3, max: 50 })
    .withMessage('name must be between 3 and 50 character')
    .trim(),
])

export const validateJobInput = withValidationErrors([
  body('company').notEmpty().withMessage('company is required'),
  body('position').notEmpty().withMessage('position applied for is required'),
  body('jobLocation')
    .notEmpty()
    .withMessage('where this job is situated is required'),
  body('jobStatus')
    .isIn(Object.values(JOB_STATUS))
    .withMessage('invalid status value'),
  body('jobType').isIn(Object.values(JOB_TYPE)).withMessage('invalid job type'),
])

export const validateIdParam = withValidationErrors([
  param('id').custom(async (value) => {
    const isValidId = mongoose.Types.ObjectId.isValid(value)
    if (!isValidId) throw new BadRequestError('invalid mongoDB id')
    const job = await Job.findById(value)
    if (!job) throw new NotFoundError(`no job with id ${value} found`)
  }),
])
