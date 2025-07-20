const express = require('express')
const router = express.Router({ mergeParams: true })

const {
  getOwnerTicketFeedback,
} = require('../../controllers/owners/feedbackController')

const { protectedOwnerRoute } = require('../../middleware/ownersAuthMiddleware')

router.route('/').get(protectedOwnerRoute, getOwnerTicketFeedback)

module.exports = router
