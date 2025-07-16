const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')

const Owner = require('../../models/owners/ownerModel')
const { generateToken } = require('../../helper/generateToken')
const productService = require('../../helper/productService')

// @desc    Register a new owner user
// @route   /api/owners/register
// @access  Public
const registerOwner = asyncHandler(async (req, res) => {
  const { name, email, password, products } = req.body

  // Validation
  if (!name || !email || !password || products.length === 0) {
    res.status(400)
    throw new Error('Please include all fields')
  }

  // Find if owner user already exists
  const isOwnerExist = await Owner.findOne({ email: email })

  if (isOwnerExist) {
    res.status(400)
    throw new Error('User already exists')
  }

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create Owner user
  const ownerUser = await Owner.create({
    name,
    email,
    password: hashedPassword,
  })

  // Link Owner to the Product Schema for services;
  await productService.addOwner(products, ownerUser._id)

  if (ownerUser) {
    res.status(201).json({
      _id: ownerUser._id,
      name: ownerUser.name,
      email: ownerUser.email,
      token: generateToken(ownerUser._id, process.env.JWT_OWNER_SECRET),
    })
  } else {
    res.status(400)
    throw new error('Invalid user data')
  }
})

// @desc    Login a owner user
// @route   /api/owners/login
// @access  Public
const loginOwner = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  // Validation
  if (!email || !password) {
    res.status(400)
    throw new Error('Please enter correct credentials')
  }

  // Check if owner user already exists;
  const ownerUser = await Owner.findOne({ email: email })

  const isPasswordCorrect = await bcrypt.compare(password, ownerUser.password)

  // Check owner user and passwords match
  if (ownerUser && isPasswordCorrect) {
    res.status(200).json({
      _id: ownerUser._id,
      name: ownerUser.name,
      email: ownerUser.email,
      token: generateToken(ownerUser._id, process.env.JWT_OWNER_SECRET),
    })
  } else {
    res.status(401)
    throw new Error('Invalid credentials')
  }
})

// @desc    Get current owner user
// @route   /api/owners/me
// @access  Private
const getMeOwner = asyncHandler(async (req, res) => {
  const currUser = req.owner

  const formattedUser = {
    _id: currUser._id,
    name: currUser.name,
    email: currUser.email,
  }
  res.status(200).json(formattedUser)
})

module.exports = {
  registerOwner,
  loginOwner,
  getMeOwner,
}
