const express = require('express')
const router = express.Router({ mergeParams: true })

const {
  getCustomerTicketFeedback,
  addCustomerTicketFeedback,
} = require('../../controllers/customers/feedbackController')

const {
  protectedCustomerRoute,
} = require('../../middleware/customersAuthMiddleware')

router
  .route('/')
  .get(protectedCustomerRoute, getCustomerTicketFeedback)
  .post(protectedCustomerRoute, addCustomerTicketFeedback)

module.exports = router
