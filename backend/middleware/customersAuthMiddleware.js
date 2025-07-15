const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const Customer = require('../models/customers/customerModel');

const protectedCustomerRoute = asyncHandler(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_CUSTOMER_SECRET);

      // Get customer user from token
      req.customer = await Customer.findById(decoded.id).select('-password');
      
      // NOTE: We need to check if a user was found
      // https://www.udemy.com/course/react-front-to-back-2022/learn/lecture/30591026#questions/17843570
      if (!req.customer) {
        res.status(401)
        throw new Error('User not authorized')
      }

      next()
    } catch (error) {
      // console.log(error)
      res.status(401)
      throw new Error('User not authorized')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('User not authorized')
  }
})

module.exports = { protectedCustomerRoute };
