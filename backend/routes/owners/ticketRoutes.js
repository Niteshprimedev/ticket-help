const express = require('express')
const router = express.Router()

const {
  getOwnerTickets,
  getOwnerSingleTicket,
  createOwnerTicket,
  updateOwnerTicket,
  deleteOwnerTicket,
} = require('../../controllers/owners/ticketController')

const { protectedOwnerRoute } = require('../../middleware/ownersAuthMiddleware')

// Re-route into note router
const noteRouter = require('./noteRoutes')
router.use('/:ticketId/notes', noteRouter)

// Re-route into feedback router
const feedbackRouter = require('./feedbackRoutes')
router.use('/:ticketId/feedback', feedbackRouter)

router
  .route('/')
  .get(protectedOwnerRoute, getOwnerTickets)
  .post(protectedOwnerRoute, createOwnerTicket)

router
  .route('/:ticketId')
  .get(protectedOwnerRoute, getOwnerSingleTicket)
  .delete(protectedOwnerRoute, deleteOwnerTicket)
  .put(protectedOwnerRoute, updateOwnerTicket)

module.exports = router
