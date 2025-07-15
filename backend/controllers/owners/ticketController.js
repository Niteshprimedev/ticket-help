const asyncHandler = require('express-async-handler')

const Ticket = require('../../models/customers/ticketModel')
const Customer = require('../../models/customers/customerModel')
const ticketService = require('../../helper/ticketService')

// NOTE: no need to get the user, we already have them on req object from
// protect middleware. The protect middleware already checks for valid user.

// @desc    Get owner tickets
// @route   GET /api/owners/tickets
// @access  Private
const getOwnerTickets = asyncHandler(async (req, res) => {
  const tickets = await Ticket.find({ owner: req.owner._id })

  res.status(200).json(tickets)
})

// @desc    Get user ticket
// @route   GET /api/tickets/:ticketId
// @access  Private
const getOwnerSingleTicket = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.ticketId)

  if (!ticket) {
    res.status(404)
    throw new Error('Ticket not found')
  }

  if (ticket.owner.toString() !== req.owner._id.toString()) {
    res.status(401)
    throw new Error('Is this? User not Authorized')
  }

  res.status(200).json(ticket)
})

// @desc    Create a new owner ticket
// @route   POST /api/owners/tickets
// @access  Private
const createOwnerTicket = asyncHandler(async (req, res) => {
  const { customerName, customerEmail, product, description } = req.body

  if (!customerName || !customerEmail) {
    res.status(400)
    throw new Error('Please add a valid customer name and email')
  }

  if (!product || !description) {
    res.status(400)
    throw new Error('Please add a product and description')
  }

  // check if customer exists;
  const customerUser = await Customer.findOne({ email: customerEmail })

  if (!customerUser) {
    res.status(401)
    throw new Error('Customer not found')
  }

  if (customerUser.name !== customerName) {
    res.status(401)
    throw new Error('Please enter correct customer details')
  }

  const ticket = await Ticket.create({
    customer: customerUser._id,
    username: customerUser.name,
    product,
    description,
    status: 'new',
    owner: req.owner._id,
    createdBy: 'owner',
  })

  res.status(201).json(ticket)
})

// @desc    Update ticket
// @route   PUT /api/customers/tickets/:ticketId
// @access  Private
const updateOwnerTicket = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.ticketId)

  if (!ticket) {
    res.status(404)
    throw new Error('Ticket not found')
  }

  if (ticket.owner.toString() !== req.owner._id.toString()) {
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
const deleteOwnerTicket = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.ticketId)

  if (!ticket) {
    res.status(404)
    throw new Error('Ticket not found')
  }

  if (ticket.owner.toString() !== req.owner._id.toString()) {
    res.status(401)
    throw new Error('User not Authorized')
  }

  await Ticket.deleteOne({ _id: req.params.ticketId })

  res.status(200).json({ success: true })
})

module.exports = {
  getOwnerTickets,
  getOwnerSingleTicket,
  createOwnerTicket,
  deleteOwnerTicket,
  updateOwnerTicket,
}
