const asyncHandler = require('express-async-handler')

const Feedback = require('../../models/customers/feedbackModel')
const Ticket = require('../../models/customers/ticketModel')

// NOTE: no need to get the user, we already have them on req object from
// protect middleware. The protect middleware already checks for valid user.

// @desc    Get customers feedback for a ticket
// @route   GET /api/customers/tickets/:ticketId/feedback
// @access  Private
const getCustomerTicketFeedback = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.ticketId)

  if (ticket.customer.toString() !== req.customer._id.toString()) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const feedback = await Feedback.findOne({ ticket: req.params.ticketId })

  res.status(200).json(feedback)
})

// @desc    Create ticket note
// @route   POST /api/customers/tickets/:ticketId/feedback
// @access  Private
const addCustomerTicketFeedback = asyncHandler(async (req, res) => {
  const { feedbackMsg, rating } = req.body

  if (!feedbackMsg || !rating) {
    res.status(400)
    throw new Error('Please provide your feedback message and your rating')
  }

  const ticket = await Ticket.findById(req.params.ticketId)

  if (!ticket) {
    res.status(401)
    throw new Error('Ticket not found')
  }

  if (ticket.customer.toString() !== req.customer._id.toString()) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const newFeedback = await Feedback.create({
    addedBy: req.customer.name,
    feedbackMsg: feedbackMsg,
    rating: rating,
    customer: req.customer._id,
    ticket: req.params.ticketId,
    owner: ticket.owner,
  })

  res.status(200).json(newFeedback)
})

module.exports = {
  getCustomerTicketFeedback,
  addCustomerTicketFeedback,
}
