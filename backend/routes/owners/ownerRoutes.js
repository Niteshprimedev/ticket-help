const express = require('express')
const router = express.Router()

const {
  registerOwner,
  loginOwner,
  getMeOwner,
  saveAccountDetailsOwner,
  changePasswordOwner,
} = require('../../controllers/owners/ownerController')

const { protectedOwnerRoute } = require('../../middleware/ownersAuthMiddleware')

router.post('/register', registerOwner)
router.post('/login', loginOwner)
router.get('/me', protectedOwnerRoute, getMeOwner)
router.post('/me/update', protectedOwnerRoute, saveAccountDetailsOwner)
router.post('/me/change-password', protectedOwnerRoute, changePasswordOwner)

module.exports = router
