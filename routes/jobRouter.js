import { Router } from 'express'
const router = Router()
import {
  getAllJobs,
  createJob,
  getSingleJob,
  updateJob,
  deleteJob,
  showStats,
} from '../controllers/jobController.js'
import {
  validateJobInput,
  validateIdParam,
} from '../middleware/validationMiddleware.js'
import { checkFortTestUser } from '../middleware/authMiddleware.js'

router
  .route('/')
  .get(getAllJobs)
  .post(checkFortTestUser, validateJobInput, createJob)

router.route('/stats').get(showStats)
router
  .route('/:id')
  .get(validateIdParam, getSingleJob)
  .patch(checkFortTestUser, validateJobInput, validateIdParam, updateJob)
  .delete(checkFortTestUser, validateIdParam, deleteJob)

export default router
