const asyncHandler = require('express-async-handler')
const Products = require('../models/owners/productModel')

const addOwner = asyncHandler(async (products, ownerId) => {
  for (let productName of products) {
    await Products.findOneAndUpdate(
      { name: productName },
      { $addToSet: { owners: ownerId } },
      { new: true }
    )
  };
})

const productService = {
  addOwner,
}

module.exports = productService
