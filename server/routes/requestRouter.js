const Router = require('express')
const router = new Router()
const requestController = require('../controllers/requestController')

router.post('/create', requestController.create)
router.post('/update', requestController.changeStatus)
router.post('/:id',requestController.viewOne)
router.get('/', requestController.viewAll)
module.exports = router
