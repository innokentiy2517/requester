const {Department} = require('../models/models')
const ApiError = require('../error/ApiError')

class DepartmentController {
    async createDep(req,res){
        let {department_name, department_number} = req.body
        console.log(department_number)
        console.log(department_name)
        const department = await Department.create({department_number, department_name})
        res.json(`Отдел №` + department.department_number + ` — ` + department.department_name + ` создан`)
    }

    async getAll(req, res){
        const departments = await Department.findAll({attributes:{exclude: ['createdAt', 'updatedAt']}})
        return res.json(departments)
    }

    async getOne(req,res){
        const {id} = req.body
        const department = await Department.findOne({where:{id}})
        return res.json(department)
    }
}

module.exports = new DepartmentController()