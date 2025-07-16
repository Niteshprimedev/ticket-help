const mongoose = require('mongoose')

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      enum: [
        'iPhone',
        'iMac',
        'Macbook Pro',
        'iPad',
        'iPad Pro',
        'iPad Air',
        'AirPods',
        'Apple Watch',
        'Apple TV',
      ],
    },
    owners: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Owner',
      },
    ],
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Products', productSchema)
