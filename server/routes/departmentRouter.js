const Router = require('express')
const router = new Router()
const departmentController = require('../controllers/departmentController')

router.get('/', departmentController.getAll)
router.get('/:id', departmentController.getOne)
router.post('/create', departmentController.createDep)

module.exports = router
