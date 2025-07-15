const express = require('express')
const router = express.Router();

const {
  registerOwner,
  loginOwner,
  getMeOwner,
} = require('../../controllers/owners/ownerController');

const { protectedOwnerRoute } = require('../../middleware/ownersAuthMiddleware');

router.post('/register', registerOwner)
router.post('/login', loginOwner)
router.get('/me', protectedOwnerRoute, getMeOwner)

module.exports = router
