import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
// asyncHandler https://github.com/Abazhenov/express-async-handler
export const getProducts = asyncHandler(async (req, res) => {
  //  if there is a keyword then use regex to match name of any product
  // else use {} so Product.fint({}) will get all products
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}

  const products = await Product.find({ ...keyword })

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
    image: '/images/Sample.jpg',
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

// @desc    Create new review
// @route   POST api/products/:id/reviews
// @access  Private
export const addReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  // get product from db
  const product = await Product.findById(req.params.id)

  if (product) {
    // check if that user have reviewed that product before
    const alreadyReviewed = product.reviews.find(
      (rev) => rev.user.toString() === req.user._id.toString()
    )

    if (alreadyReviewed) {
      res.status(400) //bad request
      throw new Error(
        'Product already reviewed. Please edit your previous comment'
      )
    } else {
      // create new review
      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      }

      product.reviews.unshift(review)
      product.numReviews = product.reviews.length
      // calculate new rating (avarage)
      product.rating =
        product.reviews.reduce((acc, r) => r.rating + acc, 0) /
        product.reviews.length

      // save updated product
      await product.save()
      res.status(201).json({ message: 'Review added' })
    }
  } else {
    res.status(401)
    throw new Error('Could not find the product')
  }
})

// @desc    Update review
// @route   PUT api/products/:id/reviews
// @access  Private
export const updateReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  // get product from db
  const product = await Product.findById(req.params.id)

  if (product) {
    // get previous review
    let filteredReviews = product.reviews.filter(
      (r) => r.user.toString() !== req.user._id.toString()
    )

    // update review
    const updatedReview = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }

    product.reviews = [updatedReview, ...filteredReviews]
    product.numReviews = product.reviews.length
    // calculate new rating (avarage)
    product.rating =
      product.reviews.reduce((acc, r) => r.rating + acc, 0) /
      product.reviews.length

    // save updated product
    await product.save()
    res.status(201).json({ message: 'Review updated' })
  } else {
    res.status(401)
    throw new Error('Could not find the product')
  }
})
