// this middlewere will validate users token when users try to log in
import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

export const protect = asyncHandler(async (req, res, next) => {
  let token

  if (
    // check if token exist
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    //  if valid try to decode token
    try {
      // get token from headers and verify with jwt
      token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      // console.log(decoded)

      // get veryfied user data from db
      // assign it to req.user so it cen be used in any protected routes
      req.user = await User.findById(decoded.id).select('-password')

      next()
    } catch (error) {
      console.error(error)
      res.status(401)
      throw new Error('Not authorized, token failed')
    }
  }

  if (!token) {
    // if no token founded
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})
