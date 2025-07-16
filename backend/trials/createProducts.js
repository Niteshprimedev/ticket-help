// Experiments on Backend Server:

const products = [
  'iPhone',
  'iMac',
  'Macbook Pro',
  'iPad',
  'iPad Pro',
  'iPad Air',
  'AirPods',
  'Apple Watch',
  'Apple TV',
]

for (let product of products) {
  await createProducts(product)
  console.log('Done')
}

// Product Controller:
const Products = require('../../models/owners/productModel')

async function createProducts(productName) {
  const isProductExist = await Products.findOne({ name: productName })

  if (isProductExist) {
    return
  }

  const product = await Products.create({
    name: productName,
  })

  console.log(product)
}

module.exports = { createProducts }
