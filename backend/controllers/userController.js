import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

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
      token: null,
    })
    // if user not found or password dosent match
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})
