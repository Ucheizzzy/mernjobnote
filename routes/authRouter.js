import express from 'express'
import { login, register, logout } from '../controllers/authController.js'
import {
  validateRegisterInput,
  validateLoginInput,
} from '../middleware/validationMiddleware.js'

import rateLimiter from 'express-rate-limit'

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,
  message: { msg: 'IP rate limit exceeded, retry in 15 minutes.' },
})

const router = express.Router()

router.route('/register').post(apiLimiter, validateRegisterInput, register)
router.route('/login').post(apiLimiter, validateLoginInput, login)
router.get('/logout', logout)

export default router
