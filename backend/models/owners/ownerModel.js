const mongoose = require('mongoose')

const ownerSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'prefernot'],
    },
    dob: {
      type: Date,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    isDefaultAssignee: {
      type: Boolean,
      default: false,
    },
    activeTicketsCount: {
      type: Number,
      default: 0,
    },
    resolvedTicketsCount: {
      type: Number,
      default: 0,
    },
    totalAssignedTickets: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Owner', ownerSchema)
