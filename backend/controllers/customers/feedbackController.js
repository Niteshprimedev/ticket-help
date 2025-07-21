const asyncHandler = require('express-async-handler')

const Feedback = require('../../models/customers/feedbackModel')
const Ticket = require('../../models/customers/ticketModel')
const { generateOwnerId } = require('../../helper/generateOwnerId')

// NOTE: no need to get the user, we already have them on req object from
// protect middleware. The protect middleware already checks for valid user.

// @desc    Get customers feedback for a ticket
// @route   GET /api/customers/tickets/:ticketId/feedbacks
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

// @desc    Get owners feedback for reviews
// @route   GET /api/customers/tickets/feedbacks
// @access  Private
const getCustomerReviewFeedbacks = asyncHandler(async (req, res) => {
  try {
    let feedbacks = await Feedback.aggregate([
      {
        $group: {
          _id: '$owner',
          reviews: {
            $push: {
              feedbackMsg: '$feedbackMsg',
              addedBy: '$addedBy',
              rating: '$rating',
            },
          },
          averageRating: { $avg: '$rating' },
        },
      },
      {
        $lookup: {
          from: 'owners',
          localField: '_id',
          foreignField: '_id',
          as: 'ownerData',
        },
      },
      { $unwind: '$ownerData' },
      {
        $project: {
          _id: 0,
          ownerId: '$_id',
          ownerName: '$ownerData.name',
          averageRating: { $round: ['$averageRating', 1] },
          reviews: 1,
          totalCustomers: { $size: '$reviews' },
        },
      },
    ])

    feedbacks = feedbacks.map((feedback) => {
      feedback.ownerName = generateOwnerId({
        _id: feedback.ownerId,
        name: feedback.ownerName,
      })

      feedback.rating = feedback.averageRating
      feedback.feedbackMsg = feedback.reviews[0].feedbackMsg
      feedback.addedBy = feedback.reviews[0].addedBy

      delete feedback.ownerId
      delete feedback.reviews
      return feedback
    })

    // console.log(feedbacks)
    res.status(200).json(feedbacks)
  } catch (error) {
    res.status(500)
    throw new Error(error)
  }
})

// @desc    Create ticket note
// @route   POST /api/customers/tickets/:ticketId/feedbacks
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
  getCustomerReviewFeedbacks,
}
