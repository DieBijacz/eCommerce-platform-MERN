import express from 'express'
const router = express.Router()
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
} from '../controllers/userController.js'
import { protect } from '../middlewere/authMiddlewere.js'

// /api/users/login
router.post('/login', authUser)
// to implement middlewere like {protect} (validates user token)
// pass that middlewere in .get(<middlewere>, <func>)
// they will be executed in order. remember to use next() inside them
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)
router.route('/').post(registerUser)

export default router
