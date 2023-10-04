import { StatusCodes } from 'http-status-codes'
import User from '../models/userModel.js'
import { hashedPassword, comparePassword } from '../utils/passwordUtils.js'
import { UnauthenticatedError } from '../errors/customErrors.js'
import { createJWT } from '../utils/tokenUtils.js'

export const register = async (req, res) => {
  const isFirstAccount = (await User.countDocuments()) === 0
  req.body.role = isFirstAccount ? 'admin' : 'user'
  const hashPassword = await hashedPassword(req.body.password)
  req.body.password = hashPassword

  const user = await User.create(req.body)
  res.status(StatusCodes.CREATED).json({ mgs: 'user created' })
}
export const login = async (req, res) => {
  //check if user exit
  const user = await User.findOne({ email: req.body.email })

  // check if password and user are correct in on line
  const isValidUser =
    user && (await comparePassword(req.body.password, user.password))
  // if anyone of them is false throw the same error
  if (!isValidUser) throw new UnauthenticatedError('invalid email or password')

  // setting the payload of userId and role
  const token = createJWT({
    userId: user._id,
    role: user.role,
  })
  //   one day in milliseconds
  const oneDay = 1000 * 60 * 60 * 24

  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === 'production',
  })
  res.status(StatusCodes.OK).json({ msg: 'user logged in' })
}
