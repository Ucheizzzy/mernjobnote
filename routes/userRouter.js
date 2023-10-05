import { Router } from 'express'
const router = Router()
import {
  getApplicationStats,
  getCurrentUser,
  updateUser,
} from '../controllers/userController.js'
import { validateUpdateUserInput } from '../middleware/validationMiddleware.js'
import { authorizePermission } from '../middleware/authMiddleware.js'

router.get('/current-user', getCurrentUser)
router.get(
  '/admin/app-stats',
  authorizePermission('admin'),
  getApplicationStats
)
router.post('/update-user', validateUpdateUserInput, updateUser)

export default router
