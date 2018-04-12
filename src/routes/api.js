const router = require('express').Router()

const UserController = require('../controllers/UserController')

router.get('/users', UserController.get)

module.exports = router
