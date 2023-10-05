import express from 'express'
import { login, register, logout } from '../controllers/authController.js'
import {
  validateRegisterInput,
  validateLoginInput,
} from '../middleware/validationMiddleware.js'
const router = express.Router()

router.route('/register').post(validateRegisterInput, register)
router.route('/login').post(validateLoginInput, login)
router.get('/logout', logout) 

export default router
