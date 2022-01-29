import express from 'express'
const router = express.Router()
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
} from '../controllers/userController.js'
import { protect } from '../middlewere/authMiddlewere.js'

// Each route can have one or more handler functions, which are executed when the route is matched.
// app.METHOD(PATH, HANDLER)
// app is an instance of express.
// METHOD is an HTTP request method, in lowercase.
// PATH is a path on the server.
// HANDLER is the function executed when the route is matched.
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
