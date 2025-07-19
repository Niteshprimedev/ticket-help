const express = require('express')
const router = express.Router()

const {
  getOwnersFromProducts,
} = require('../../controllers/customers/productController')

const {
  protectedCustomerRoute,
} = require('../../middleware/customersAuthMiddleware')

router.get('/', protectedCustomerRoute, getOwnersFromProducts)

module.exports = router
