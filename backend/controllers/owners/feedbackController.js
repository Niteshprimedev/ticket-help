const asyncHandler = require('express-async-handler')

const Feedback = require('../../models/customers/feedbackModel')
const Ticket = require('../../models/customers/ticketModel')

// NOTE: no need to get the user, we already have them on req object from
// protect middleware. The protect middleware already checks for valid user.

// @desc    Get owners feedback for a ticket
// @route   GET /api/owners/tickets/:ticketId/feedback
// @access  Private
const getOwnerTicketFeedback = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.ticketId)

  if (ticket.owner.toString() !== req.owner._id.toString()) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const feedback = await Feedback.findOne({ ticket: req.params.ticketId })

  res.status(200).json(feedback)
})

module.exports = {
  getOwnerTicketFeedback,
}
