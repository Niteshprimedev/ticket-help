const asyncHandler = require('express-async-handler')
const productService = require('../../helper/productService')

// @desc    Get products owners
// @route   GET /api/customers/products/:productName
// @access  Private
const getOwnersFromProducts = asyncHandler(async (req, res) => {
  try {
    const productName = req.query.name
    if (!productName) {
      res.status(400)
      throw new Error('Product name is required')
    }

    const owners = await productService.getOwnersFromProducts(productName)

    res.status(200).json(owners)
  } catch (error) {
    res.status(404)
    throw new Error(error)
  }
})

module.exports = {
  getOwnersFromProducts,
}
