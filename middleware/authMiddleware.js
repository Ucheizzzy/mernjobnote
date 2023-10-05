import {
  UnauthenticatedError,
  UnauthorizedError,
} from '../errors/customErrors.js'
import { verifyJWT } from '../utils/tokenUtils.js'

export const authenticatedUser = (req, res, next) => {
  const { token } = req.cookies
  if (!token) {
    throw new UnauthenticatedError('authentication invalid')
  }
  try {
    // destructure the payload
    const { userId, role } = verifyJWT(token)
    // assign this to the user request
    req.user = { userId, role }
    next()
  } catch (error) {
    throw new UnauthenticatedError('authentication invalid')
  }
}

export const authorizePermission = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError('You are not authorized to see this')
    }
    next()
  }
}
