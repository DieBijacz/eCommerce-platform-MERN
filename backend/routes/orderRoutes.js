import express from 'express'
import {
  addOrderItems,
  getAllOrders,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
} from '../controllers/orderController.js'
import { isAdmin, protect } from '../middlewere/authMiddlewere.js'

const router = express.Router()

// TIP in case when I have ('/') and ('/something')
// make sure that the '/' if on the above
router
  .route('/')
  .post(protect, addOrderItems)
  .get(protect, isAdmin, getAllOrders)
router.route('/myorders').get(protect, getMyOrders)
router.route('/pay/:id').put(protect, updateOrderToPaid)
router.route('/:id').get(protect, getOrderById)

export default router
