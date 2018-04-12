const router = require('express').Router()

const api = require('./api')
const pageNotFound = require('./404')
const error = require('./error')

router.use('/api', api)
router.use(pageNotFound)
router.use(error)

module.exports = router
