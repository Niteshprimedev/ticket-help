const express = require('express')
const router = express.Router()

const {
  getCustomerReviewFeedbacks,
} = require('../../controllers/customers/feedbackController')

const {
  protectedCustomerRoute,
} = require('../../middleware/customersAuthMiddleware')

router.route('/').get(protectedCustomerRoute, getCustomerReviewFeedbacks)

module.exports = router