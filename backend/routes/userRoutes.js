import express from 'express'
const router = express.Router()
import {
  authUser,
  deleteUser,
  getUserById,
  getUserProfile,
  getUsers,
  registerUser,
  updateUserAsAdmin,
  updateUserProfile,
} from '../controllers/userController.js'
import { isAdmin, protect } from '../middlewere/authMiddlewere.js'

// to implement middlewere like {protect} (validates user token)
// pass that middlewere in .get(<middlewere>, <func>)
// they will be executed in order. remember to use next() inside them

router.route('/').post(registerUser)
router.route('/').get(protect, isAdmin, getUsers)

router.post('/login', authUser)

router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)

router
  .route('/:id')
  .delete(protect, isAdmin, deleteUser)
  .get(protect, isAdmin, getUserById)
  .put(protect, isAdmin, updateUserAsAdmin)

export default router
