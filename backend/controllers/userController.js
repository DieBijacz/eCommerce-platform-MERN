import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
// asyncHandler https://github.com/Abazhenov/express-async-handler
export const authUser = asyncHandler(async (req, res) => {
  // get email and password from json body
  const { email, password } = req.body

  // SERVER RESPONSE
  // find user in User db based on email
  const user = await User.findOne({ email })
  // if that user exist AND password matches the encrypted password of that user (userModel.js)
  if (user && (await user.matchPassword(password))) {
    // if valid then SERVER RESPONSE with:
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      // create user token
      token: generateToken(user._id),
    })
    // if user not found or password dosent match
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

// @desc Register new user
// @route GET /api/users/
// @access Public

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  // check if user exists
  const userExist = await User.findOne({ email })

  // if that user already exist throw error
  if (userExist) {
    res.status(400)
    throw new Error('User already exists')
  }

  // create new user
  const user = await User.create({
    name,
    email,
    password, //password will be encrypted by middlewere in userModel.js before user is created
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc Get user profile
// @route GET /api/users/profile
// @access Private
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(401)
    throw new Error('User not found')
  }
})
