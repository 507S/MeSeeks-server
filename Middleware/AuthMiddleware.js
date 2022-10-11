const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../Model/userModel')

const protect = asyncHandler(async (req, res, next) => {

  const token = req.body.token
  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
  else {
    try {
      // Get token from header
      console.log(token);
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

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