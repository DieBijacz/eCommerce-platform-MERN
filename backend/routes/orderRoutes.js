import express from 'express'
import { addOrderItems, getOrderById } from '../controllers/orderController.js'
import { protect } from '../middlewere/authMiddlewere.js'

const router = express.Router()

// TIP in case when I have ('/') and ('/something')
// make sure that the '/' if on the above
router.route('/').post(protect, addOrderItems)
router.route('/:id').get(protect, getOrderById)

export default router
