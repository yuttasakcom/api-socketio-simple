const passport = require('passport')
const router = require('express').Router()

const UserController = require('../controllers/UserController')

router.get('/users', UserController.get)
router.post('/users',
  passport.authenticate('local-signup', { session: false }),
  UserController.create
)

module.exports = router
