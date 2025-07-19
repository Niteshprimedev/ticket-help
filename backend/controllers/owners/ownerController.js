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
    gender: 'prefernot',
    dob: null,
    password: hashedPassword,
  })

  // Link Owner to the Product Schema for services;
  await productService.addOwnerToProducts(products, ownerUser._id)

  if (ownerUser) {
    res.status(201).json({
      _id: ownerUser._id,
      name: ownerUser.name,
      email: ownerUser.email,
      gender: ownerUser.gender,
      dob: '',
      token: generateToken(ownerUser._id, process.env.JWT_OWNER_SECRET, '30d'),
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

  let formattedDob
  if (ownerUser.dob !== null) {
    formattedDob = new Date(ownerUser.dob).toISOString().split('T')[0]
  }

  // Check owner user and passwords match
  if (ownerUser && isPasswordCorrect) {
    res.status(200).json({
      _id: ownerUser._id,
      name: ownerUser.name,
      email: ownerUser.email,
      gender: ownerUser.gender,
      dob: ownerUser.dob ? formattedDob : '',
      token: generateToken(ownerUser._id, process.env.JWT_OWNER_SECRET, '30d'),
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
  const ownerUser = req.owner

  let formattedDob
  if (ownerUser.dob !== null) {
    formattedDob = new Date(ownerUser.dob).toISOString().split('T')[0]
  }

  const formattedUser = {
    _id: ownerUser._id,
    name: ownerUser.name,
    email: ownerUser.email,
    gender: ownerUser.gender,
    dob: ownerUser.dob ? formattedDob : '',
    token: generateToken(ownerUser._id, process.env.JWT_OWNER_SECRET, '30d'),
  }
  res.status(200).json(formattedUser)
})

// @desc    Get current owner user
// @route   /api/owners/me
// @access  Private
const saveAccountDetailsOwner = asyncHandler(async (req, res) => {
  let { gender, dob } = req.body
  dob = dob.length === 0 ? null : new Date(dob)

  const ownerUser = await Owner.findByIdAndUpdate(
    req.owner._id,
    {
      gender: gender,
      dob: dob,
    },
    { new: true }
  )

  let formattedDob
  if (ownerUser.dob !== null) {
    formattedDob = new Date(ownerUser.dob).toISOString().split('T')[0]
  }

  const formattedUser = {
    _id: ownerUser._id,
    name: ownerUser.name,
    email: ownerUser.email,
    gender: ownerUser.gender,
    dob: ownerUser.dob ? formattedDob : '',
    token: generateToken(ownerUser._id, process.env.JWT_OWNER_SECRET, '30d'),
  }
  res.status(201).json(formattedUser)
})

// @desc    Change owner user password
// @route   /api/owners/me/change-password
// @access  Private
const changePasswordOwner = asyncHandler(async (req, res) => {
  const { oldPassword, password } = req.body

  // Validation
  if (!oldPassword || !password) {
    res.status(400)
    throw new Error('Please include all fields')
  }

  // Check if owner user already exists;
  const ownerUser = await Owner.findOne({ email: req.owner.email })

  const isPasswordCorrect = await bcrypt.compare(
    oldPassword,
    ownerUser.password
  )

  if (!isPasswordCorrect) {
    res.status(400)
    throw new Error('Please enter correct current password')
  }

  // Hash the new password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Update Owner user password
  await Owner.findByIdAndUpdate(ownerUser._id, {
    password: hashedPassword,
  })

  res.status(201).json({ message: 'Password updated successfully!' })
})

module.exports = {
  registerOwner,
  loginOwner,
  getMeOwner,
  saveAccountDetailsOwner,
  changePasswordOwner,
}
