const express = require('express')
const router = express.Router();

const {
  getCustomerTickets,
  getCustomerSingleTicket,
  createCustomerTicket,
  updateCustomerTicket,
  deleteCustomerTicket,
} = require('../../controllers/customers/ticketController');

const { protectedCustomerRoute } = require('../../middleware/customersAuthMiddleware')

// Re-route into note router
const noteRouter = require('./noteRoutes')
router.use('/:ticketId/notes', noteRouter)

router.route('/').get(protectedCustomerRoute, getCustomerTickets).post(protectedCustomerRoute, createCustomerTicket);

router
  .route('/:ticketId')
  .get(protectedCustomerRoute, getCustomerSingleTicket)
  .delete(protectedCustomerRoute, deleteCustomerTicket)
  .put(protectedCustomerRoute, updateCustomerTicket)

module.exports = router
