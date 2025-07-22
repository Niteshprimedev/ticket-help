const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')

const Ticket = require('../../models/customers/ticketModel')
// const ticketService = require('../../helper/ticketService')

// NOTE: no need to get the user, we already have them on req object from
// protect middleware. The protect middleware already checks for valid user.

// @desc    Get customer tickets
// @route   GET /api/customers/tickets
// @access  Private
const getCustomerTickets = asyncHandler(async (req, res) => {
  const tickets = await Ticket.find({ customer: req.customer._id })

  res.status(200).json(tickets)
})

// @desc    Get user ticket
// @route   GET /api/tickets/:ticketId
// @access  Private
const getCustomerSingleTicket = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.ticketId)

  if (!ticket) {
    res.status(404)
    throw new Error('Ticket not found')
  }

  if (ticket.customer.toString() !== req.customer._id.toString()) {
    res.status(401)
    throw new Error('User not Authorized')
  }

  res.status(200).json(ticket)
})

// @desc    Create a new customer ticket
// @route   POST /api/customers/tickets
// @access  Private
const createCustomerTicket = asyncHandler(async (req, res) => {
  const { product, description, ownerData } = req.body

  if (!product || !description) {
    res.status(400)
    throw new Error('Please add a product and description')
  }

  // Get token from req body
  const token = ownerData.hashValue

  // Verify token
  const decoded = jwt.verify(token, process.env.JWT_CUSTOMER_SECRET)

  // Get owner id from token
  const ownerId = decoded.id

  const ticket = await Ticket.create({
    customer: req.customer._id,
    username: req.customer.name,
    product,
    description,
    status: 'new',
    owner: ownerId,
    createdBy: req.customer.name,
  })
  // console.log(ticket, ownerId, ownerData)
  res.status(201).json(ticket)
})

// @desc    Update ticket
// @route   PUT /api/customers/tickets/:ticketId
// @access  Private
const updateCustomerTicket = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.ticketId)

  if (!ticket) {
    res.status(404)
    throw new Error('Ticket not found')
  }

  if (ticket.customer.toString() !== req.customer._id.toString()) {
    res.status(401)
    throw new Error('User not Authorized')
  }

  const updatedTicket = await Ticket.findByIdAndUpdate(
    req.params.ticketId,
    req.body,
    { new: true }
  )

  if (updatedTicket) {
    res.status(201).json(updatedTicket)
  } else {
    res.status(400)
    throw new Error('Invalid ticket details')
  }
})

// @desc    Delete ticket
// @route   DELETE /api/customers/tickets/:ticketId
// @access  Private
const deleteCustomerTicket = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.ticketId)

  if (!ticket) {
    res.status(404)
    throw new Error('Ticket not found')
  }

  if (ticket.customer.toString() !== req.customer._id.toString()) {
    res.status(401)
    throw new Error('User not Authorized')
  }

  await Ticket.deleteOne({ _id: req.params.ticketId })

  res.status(200).json({ success: true })
})

module.exports = {
  getCustomerTickets,
  getCustomerSingleTicket,
  createCustomerTicket,
  deleteCustomerTicket,
  updateCustomerTicket,
}
