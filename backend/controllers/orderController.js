import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body

  // validate
  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No order items')
  } else {
    // if valid create new order with schema
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    })

    // save new order in db and response
    const createdOrder = await order.save()
    res.status(201).json(createdOrder)
  }
})

// @desc    Get order by id
// @route   GET /api/orders/:id
// @access  Private
export const getOrderById = asyncHandler(async (req, res) => {
  // find order in db based on id from url, also get user and email associated with that order
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  )

  if (order) {
    // if there is that order response with it
    res.json(order)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

// @desc    Update order to paid
// @route   PUT /api/orders/pay/:id
// @access  Private
export const updateOrderToPaid = asyncHandler(async (req, res) => {
  // find order in db based on id from url, also get user and email associated with that order
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isPaid = true //updates isPaid status
    order.paidAt = Date.now() //add datestamp
    order.paymentResult = {
      //create obj with payment data comes back from PayPal
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    }

    // save order in db
    const updatedOrder = await order.save()

    // response with updated order
    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

// @desc    Update order to deliver
// @route   PUT /api/orders/:id/dispatch
// @access  Private/Admin
export const updateOrderToDispatch = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    // update order
    order.isDelivered = true
    order.deliveredAt = Date.now()

    // save order in db
    const updatedOrder = await order.save()

    // response with updated order
    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
export const getMyOrders = asyncHandler(async (req, res) => {
  // find all orders of logged in user
  const orders = await Order.find({ user: req.user._id })
  res.json(orders)
})

// @desc    Get user orders
// @route   GET /api/orders/userOrders
// @access  Private/Admin
export const getUserOrders = asyncHandler(async (req, res) => {
  // find all user orders
  const orders = await Order.find({ user: req.params.id })
  res.json(orders)
})

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
export const getAllOrders = asyncHandler(async (req, res) => {
  // get all orders and get user id and user name
  const orders = await Order.find({}).populate('user', 'id name')
  res.json(orders)
})
