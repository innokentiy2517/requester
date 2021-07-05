const {Request, Department} = require('../models/models')
const ApiError = require('../error/ApiError')

class RequestController {
    async create(req, res) {
        let {topic, text, exp_date, author_id, recipient_id, department_id, status} = req.body
        const dateArr = exp_date.split(' ')
        exp_date = new Date(Date.UTC(dateArr[0],dateArr[1] - 1,dateArr[2]))
        department_id = await Department.findOne({where: {department_number: department_id}}).then(function (dep){return dep.id})
        const request = await Request.create({topic, text, exp_date, authorId: author_id, recipientId:recipient_id, departmentId:department_id, status: status})
        return res.json(request)
    }

    async viewOne(req, res){
        const {id} = req.params
        const request = await Request.findOne({where: {id}})
        return res.json(request)
    }

    async viewAll(req,res){
        const requests = await Request.findAll()
        return res.json(requests)
    }
}

module.exports = new RequestController()