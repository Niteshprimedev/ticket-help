const express = require('express')
const router = express.Router();

const {
  registerCustomer,
  loginCustomer,
  getMeCustomer,
} = require('../../controllers/customers/customerController');

const { protectedCustomerRoute } = require('../../middleware/customersAuthMiddleware');

router.post('/register', registerCustomer)
router.post('/login', loginCustomer)
router.get('/me', protectedCustomerRoute, getMeCustomer)

module.exports = router
