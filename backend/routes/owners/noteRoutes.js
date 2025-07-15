const express = require('express')
const router = express.Router({ mergeParams: true })

const {
  getOwnerNotes,
  addOwnerNote,
} = require('../../controllers/owners/noteController')

const { protectedOwnerRoute } = require('../../middleware/ownersAuthMiddleware')

// get toclet notes and create a ticket note
router
  .route('/')
  .get(protectedOwnerRoute, getOwnerNotes)
  .post(protectedOwnerRoute, addOwnerNote)

module.exports = router
