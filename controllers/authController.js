import { StatusCodes } from 'http-status-codes'
import User from '../models/userModel.js'
import { hashedPassword } from '../utils/passwordUtils.js'

export const register = async (req, res) => {
  const isFirstAccount = (await User.countDocuments()) === 0
  req.body.role = isFirstAccount ? 'admin' : 'user'
  const hashPassword = await hashedPassword(req.body.password)
  req.body.password = hashPassword

  const user = await User.create(req.body)
  res.status(StatusCodes.CREATED).json({ mgs: 'user created' })
}
export const login = async (req, res) => {
  res.status(200).json({ user: req.body })
}
