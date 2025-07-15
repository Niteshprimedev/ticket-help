const mongoose = require('mongoose')

const noteSchema = mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Owner',
    },
    ticket: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Ticket',
    },
    note: {
      type: String,
      required: [true, 'Please add your note'],
    },
    addedBy: {
      type: String,
      required: true,
    },
    isOwner: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Note', noteSchema)
