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
    gender: 'prefernot',
    dob: null,
    password: hashedPassword,
  })

  if (customerUser) {
    res.status(201).json({
      _id: customerUser._id,
      name: customerUser.name,
      email: customerUser.email,
      gender: customerUser.gender,
      dob: '',
      token: generateToken(
        customerUser._id,
        process.env.JWT_CUSTOMER_SECRET,
        '30d'
      ),
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

  if (!customerUser) {
    res.status(401)
    throw new Error('Invalid Credentials')
  }

  const isPasswordCorrect = await bcrypt.compare(
    password,
    customerUser.password
  )

  let formattedDob
  if (customerUser.dob !== null) {
    formattedDob = new Date(customerUser.dob).toISOString().split('T')[0]
  }

  // Check customer user and passwords match
  if (customerUser && isPasswordCorrect) {
    res.status(200).json({
      _id: customerUser._id,
      name: customerUser.name,
      email: customerUser.email,
      gender: customerUser.gender,
      dob: customerUser.dob ? formattedDob : '',
      token: generateToken(
        customerUser._id,
        process.env.JWT_CUSTOMER_SECRET,
        '30d'
      ),
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
  const customerUser = req.customer

  let formattedDob
  if (customerUser.dob !== null) {
    formattedDob = new Date(customerUser.dob).toISOString().split('T')[0]
  }

  const formattedUser = {
    _id: customerUser._id,
    name: customerUser.name,
    email: customerUser.email,
    gender: customerUser.gender,
    dob: customerUser.dob ? formattedDob : '',
    token: generateToken(
      customerUser._id,
      process.env.JWT_CUSTOMER_SECRET,
      '30d'
    ),
  }
  res.status(200).json(formattedUser)
})

// @desc    Get current customer user
// @route   /api/customers/me
// @access  Private
const saveAccountDetailsCustomer = asyncHandler(async (req, res) => {
  let { gender, dob } = req.body
  dob = dob.length === 0 ? null : new Date(dob)

  const customerUser = await Customer.findByIdAndUpdate(
    req.customer._id,
    {
      gender: gender,
      dob: dob,
    },
    { new: true }
  )

  let formattedDob
  if (customerUser.dob !== null) {
    formattedDob = new Date(customerUser.dob).toISOString().split('T')[0]
  }

  const formattedUser = {
    _id: customerUser._id,
    name: customerUser.name,
    email: customerUser.email,
    gender: customerUser.gender,
    dob: customerUser.dob ? formattedDob : '',
    token: generateToken(
      customerUser._id,
      process.env.JWT_CUSTOMER_SECRET,
      '30d'
    ),
  }
  res.status(201).json(formattedUser)
})

// @desc    Change customer user password
// @route   /api/customers/me/change-password
// @access  Private
const changePasswordCustomer = asyncHandler(async (req, res) => {
  const { oldPassword, password } = req.body

  // Validation
  if (!oldPassword || !password) {
    res.status(400)
    throw new Error('Please include all fields')
  }

  // Check if customer user already exists;
  const customerUser = await Customer.findOne({ email: req.customer.email })

  const isPasswordCorrect = await bcrypt.compare(
    oldPassword,
    customerUser.password
  )

  if (!isPasswordCorrect) {
    res.status(401)
    throw new Error('Please enter correct current password')
  }

  // Hash the new password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Update Customer user password
  await Customer.findByIdAndUpdate(customerUser._id, {
    password: hashedPassword,
  })

  res.status(201).json({ message: 'Password updated successfully!' })
})

module.exports = {
  registerCustomer,
  loginCustomer,
  getMeCustomer,
  saveAccountDetailsCustomer,
  changePasswordCustomer,
}
