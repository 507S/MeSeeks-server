const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../Model/userModel')

const protect = asyncHandler(async (req, res, next) => {
  // console.log("here at middleware")
  // console.log(req.headers)
  // console.log(req.headers.authorization)
  // console.log(req.headers.authorization.startsWith("Bearer"))
  const {authorization} = req.headers
  const token = authorization
  // console.log(token)
  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
  else {
    try {
      // Get token from header
      console.log(token);
      // Verify token
      const decoded = jwt.verify(token, 'brucewayneisbatman')

      // Get user from the token
      req.user = await User.findById(decoded.id).select('-password')
      return { status: 'ok' }
    } catch (error) {
      console.log(error)
      res.json({ status: 'error', error: 'invalid token' })
      throw new Error('Not authorized')
    }
  }
})

module.exports = { protect }