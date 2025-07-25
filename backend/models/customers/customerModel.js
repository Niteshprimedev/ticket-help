const mongoose = require('mongoose')

const customerSchema = mongoose.Schema(
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
    }
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Customer', customerSchema)
