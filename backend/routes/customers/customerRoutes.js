const express = require('express')
const router = express.Router()

const {
  registerCustomer,
  loginCustomer,
  getMeCustomer,
  saveAccountDetailsCustomer,
  changePasswordCustomer,
} = require('../../controllers/customers/customerController')

const {
  protectedCustomerRoute,
} = require('../../middleware/customersAuthMiddleware')

router.post('/register', registerCustomer)
router.post('/login', loginCustomer)
router.get('/me', protectedCustomerRoute, getMeCustomer)
router.post('/me/update', protectedCustomerRoute, saveAccountDetailsCustomer)
router.post(
  '/me/change-password',
  protectedCustomerRoute,
  changePasswordCustomer
)

module.exports = router
