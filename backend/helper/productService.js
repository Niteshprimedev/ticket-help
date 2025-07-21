const asyncHandler = require('express-async-handler')
const Products = require('../models/owners/productModel')
const { generateToken } = require('../helper/generateToken')
const { generateOwnerId } = require('../helper/generateOwnerId');

// Registering Owner will be added to chosen products
const addOwnerToProducts = asyncHandler(async (products, ownerId) => {
  for (let productName of products) {
    await Products.findOneAndUpdate(
      { name: productName },
      { $addToSet: { owners: ownerId } },
      { new: true }
    )
  }
})

// Logged in Owner will require Products
const getOwnerProducts = asyncHandler(async (ownerId) => {
  try {
    const products = await Products.find({ owners: ownerId })

    return products
  } catch (error) {
    res.status(500)
    throw new Error('Internal Server Error')
  }
})

// Logged in Customer will require Products Owners
const getOwnersFromProducts = asyncHandler(async (productName) => {
  try {
    const product = await Products.findOne({ name: productName }).populate(
      'owners',
      'name'
    )
    let owners = await product.owners

    if (owners.length === 0) {
      res.status(404)
      throw new Error('No product owner available')
    }

    // Hash the ids for security;
    owners = owners.map((owner) => {
      const token = generateToken(
        owner._id,
        process.env.JWT_CUSTOMER_SECRET,
        '1d'
      )

      const ownerId = generateOwnerId(owner)
      const formattedOwner = {
        hashKey: ownerId,
        hashValue: token,
      }

      return formattedOwner
    })

    // console.log(owners)
    return owners
  } catch (error) {
    res.status(404)
    throw new Error('Oops! It seems like no Owners are offering this product')
  }
})

const productService = {
  addOwnerToProducts,
  getOwnersFromProducts,
  getOwnerProducts,
}

module.exports = productService
