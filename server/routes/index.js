const Router = require('express')
const router = new Router()
const requestRouter = require('./requestRouter')
const departmentRouter = require('./departmentRouter')
const userRouter = require('./userRouter')

router.use('/user', userRouter)
router.use('/request', requestRouter)
router.use('/department', departmentRouter)

module.exports = router
