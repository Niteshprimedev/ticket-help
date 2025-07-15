const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')

const Customer = require('../../models/customers/customerModel')
const { generateToken } = require('../../helper/generateToken')

// @desc    Register a new customer user
// @route   /api/customers/register
// @access  Public
const registerCustomer = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  // Validation
  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Please include all fields')
  }

  // Find if customer user already exists
  const isCustomerExist = await Customer.findOne({ email: email })

  if (isCustomerExist) {
    res.status(400)
    throw new Error('User already exists')
  }

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create Customer user
  const customerUser = await Customer.create({
    name,
    email,
    password: hashedPassword,
  })

  if (customerUser) {
    res.status(201).json({
      _id: customerUser._id,
      name: customerUser.name,
      email: customerUser.email,
      token: generateToken(customerUser._id, process.env.JWT_CUSTOMER_SECRET),
    })
  } else {
    res.status(400)
    throw new error('Invalid user data')
  }
})

// @desc    Login a customer user
// @route   /api/customers/login
// @access  Public
const loginCustomer = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  // Validation
  if (!email || !password) {
    res.status(400)
    throw new Error('Please enter correct credentials')
  }

  // Check if customer user already exists;
  const customerUser = await Customer.findOne({ email: email })

  const isPasswordCorrect = await bcrypt.compare(
    password,
    customerUser.password
  )

  // Check customer user and passwords match
  if (customerUser && isPasswordCorrect) {
    res.status(200).json({
      _id: customerUser._id,
      name: customerUser.name,
      email: customerUser.email,
      token: generateToken(customerUser._id, process.env.JWT_CUSTOMER_SECRET),
    })
  } else {
    res.status(401)
    throw new Error('Invalid credentials')
  }
})

// @desc    Get current customer user
// @route   /api/customers/me
// @access  Private
const getMeCustomer = asyncHandler(async (req, res) => {
  const currUser = req.customer

  const formattedUser = {
    _id: currUser._id,
    name: currUser.name,
    email: currUser.email,
  }
  res.status(200).json(formattedUser)
})

module.exports = {
  registerCustomer,
  loginCustomer,
  getMeCustomer,
}
