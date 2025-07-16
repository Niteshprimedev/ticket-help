const express = require('express')
const router = express.Router()

const {
  getOwnerProducts,
} = require('../../controllers/owners/productController')
const { protectedOwnerRoute } = require('../../middleware/ownersAuthMiddleware')

router.get('/', protectedOwnerRoute, getOwnerProducts)

module.exports = router
