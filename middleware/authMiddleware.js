import { UnauthenticatedError } from '../errors/customErrors.js'
import { verifyJWT } from '../utils/tokenUtils.js'

export const authenticatedUser = async (req, res, next) => {
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
