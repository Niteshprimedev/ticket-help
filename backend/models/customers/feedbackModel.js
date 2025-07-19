const mongoose = require('mongoose')

const feedbackSchema = new mongoose.Schema(
  {
    feedbackMsg: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    addedBy: {
      type: String,
      required: true,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      required: true,
    },
    ticket: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ticket',
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ticket',
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Feedback', feedbackSchema)
