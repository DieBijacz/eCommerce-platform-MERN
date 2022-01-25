import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
// asyncHandler https://github.com/Abazhenov/express-async-handler
export const getProducts = asyncHandler(async (req, res) => {
  // .find({}) with empty obj will bring eveything in Promise
  const products = await Product.find({})

  // throw new Error('Some error')

  // res.json will convert data to json
  res.json(products)
})

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
export const getProductById = asyncHandler(async (req, res) => {
  // get the product based on passed id
  const product = await Product.findById(req.params.id)
  // if there is one then return it
  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})
