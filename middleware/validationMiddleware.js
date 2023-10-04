import { body, param, validationResult } from 'express-validator'
import { BadRequestError, NotFoundError } from '../errors/customErrors.js'
import { JOB_STATUS, JOB_TYPE } from '../utils/constants.js'
import mongoose from 'mongoose'
import Job from '../models/jobModel.js'
import User from '../models/userModel.js'
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

export const validateRegisterInput = withValidationErrors([
  body('name').notEmpty().withMessage('You cannot be nameless here'),
  body('email')
    .isEmail()
    .withMessage('invalid email format')
    .notEmpty()
    .withMessage('email is required also')
    .custom(async (email) => {
      const user = await User.findOne({ email })
      if (user) {
        throw new BadRequestError('Email already exist')
      }
    }),
  body('password')
    .notEmpty()
    .withMessage('password is required')
    .isLength({ min: 5 })
    .withMessage('password must be at least 5 character long'),
  body('location').notEmpty().withMessage('where you are sitauted is required'),
  body('lastName')
    .notEmpty()
    .withMessage("last name is required please, don't be angry"),
])

export const validateLoginInput = withValidationErrors([
  body('email')
    .notEmpty()
    .withMessage('email is required for login')
    .isEmail()
    .withMessage('please enter a valid email'),
  body('password').notEmpty().withMessage('password cannot be empty'),
])