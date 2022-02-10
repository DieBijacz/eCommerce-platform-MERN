import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
// asyncHandler https://github.com/Abazhenov/express-async-handler
export const getProducts = asyncHandler(async (req, res) => {
  // .find({}) with empty obj will bring eveything in Promise
  const products = await Product.find({})

  res.json(products)
})

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
export const getProductById = asyncHandler(async (req, res) => {
  // get the product based on id from url
  const product = await Product.findById(req.params.id)
  // if there is one then return it
  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    await product.remove()
    res.json({ message: 'Product removed' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc    Create product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    user: req.user._id,
    name: 'Change name',
    image: 'as',
    brand: 'Change brand',
    category: 'Change category',
    description: 'Disciption',
    numReviews: 0,
    price: 0,
    countInStock: 0,
  })

  // save new product to db
  const createdProduct = await product.save()

  if (createdProduct) {
    res.status(201).json(createdProduct)
  } else {
    res.status(404)
    throw new Error('Could not create new product')
  }
})

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = asyncHandler(async (req, res) => {
  const { name, image, brand, category, description, price, countInStock } =
    req.body

  // get product from db
  const product = await Product.findById(req.params.id)

  if (product) {
    product.name = name ?? product.name
    product.image = image ?? product.image
    product.brand = brand ?? product.brand
    product.category = category ?? product.category
    product.description = description ?? product.description
    product.price = price ?? product.price
    product.countInStock = countInStock ?? product.countInStock

    const updatedProduct = await product.save()
    res.status(201).json(updatedProduct)
  } else {
    res.status(401)
    throw new Error('Could not find the product')
  }
})
