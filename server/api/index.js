const router = require('express').Router()
module.exports = router

router.use('/search', require('./search'))
router.use('/avinode', require('./avinode'))
router.use('/flp', require('./flp'))
router.use('/searchAvinode', require('./searchAvinode'))
router.use('/me', require('./me'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
