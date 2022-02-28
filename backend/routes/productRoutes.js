import express from 'express'
import {
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  createProduct,
  addReview,
  updateReview,
  getTopProducts,
} from '../controllers/productController.js'
import { isAdmin, protect } from '../middlewere/authMiddlewere.js'

const router = express.Router()

router.route('/').get(getProducts).post(protect, isAdmin, createProduct)
router.route('/:id/reviews').post(protect, addReview).put(protect, updateReview)
router.route('/top').get(getTopProducts)
router
  .route('/:id')
  .get(getProductById)
  .delete(protect, isAdmin, deleteProduct)
  .put(protect, isAdmin, updateProduct)

export default router
