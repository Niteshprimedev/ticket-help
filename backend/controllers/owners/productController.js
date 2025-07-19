const asyncHandler = require('express-async-handler')
const productService = require('../../helper/productService')

// @desc    Get owner products
// @route   GET /api/owners/products
// @access  Private
const getOwnerProducts = asyncHandler(async (req, res) => {
  const products = await productService.getOwnerProducts(req.owner._id)
  res.status(200).json(products);
})

module.exports = {
  getOwnerProducts,
}
