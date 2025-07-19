const express = require('express')
const router = express.Router({ mergeParams: true })

const {
  getCustomerNotes,
  addCustomerNote,
} = require('../../controllers/customers/noteController')

const {
  protectedCustomerRoute,
} = require('../../middleware/customersAuthMiddleware')

// get ticket notes and create a ticket note
router
  .route('/')
  .get(protectedCustomerRoute, getCustomerNotes)
  .post(protectedCustomerRoute, addCustomerNote)

module.exports = router
