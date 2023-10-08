import {
  BadRequestError,
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
    const testUser = userId === '6522d0d7dfde118349146410'
    // assign this to the user request
    req.user = { userId, role, testUser }
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

export const checkFortTestUser = (req, res, next) => {
  if (req.user.testUser) {
    throw new BadRequestError('Testometer!! you are read only.')
  }
}
