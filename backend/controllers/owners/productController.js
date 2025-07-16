const asyncHandler = require('express-async-handler')

const Products = require('../../models/owners/productModel')

// @desc    Get owner tickets
// @route   GET /api/owners/tickets
// @access  Private
const getOwnerProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Products.find({ owners: req.owner._id })

    res.status(200).json(products)
  } catch (error) {
    res.status(500)
    throw new Error('Internal Server Error')
  }
})

module.exports = {
  getOwnerProducts,
}
