const {Request} = require('../models/models')
const ApiError = require('../error/ApiError')
const User = require("../models/UserModel");

class RequestController {
    async create(req, res, next) {
        let {topic, text, exp_date, author_id, recipient_id, status} = req.body
        if(!topic || !text || !exp_date || !author_id || !recipient_id){
            console.log(topic)
            console.log(text)
            console.log(exp_date)
            console.log(author_id)
            console.log(recipient_id)
            return next(ApiError.badRequest('Некорректный ввод данных!'))
        }
        const reqCand = await Request.findOne({where: {topic}})
        if(reqCand){
            return next(ApiError.badRequest('Заявка с такой темой уже существует!'))
        }
        const dateArr = exp_date.split(' ')
        exp_date = new Date(Date.UTC(dateArr[0],dateArr[1] - 1,dateArr[2]))
        const department_id = await User.findOne({where: {id: recipient_id}}).then(function (user){return user.departmentId})
        if(!status){
            const request = await Request.create({topic, text, exp_date, authorId: author_id, recipientId:recipient_id, departmentId:department_id})
            return res.json(request)
        }
        if(status){
            const request = await Request.create({topic, text, exp_date, authorId: author_id, recipientId:recipient_id, departmentId:department_id, status: status})
            return res.json(request)
        }

    }

    async changeStatus(req, res){
        const {id, status} = req.body
        console.log(id)
        const request = await Request.findOne({where:{id}})
        console.log(request)
        await request.update({status: status})
        return res.json(request)
    }

    async viewOne(req, res){
        const {id} = req.params
        const request = await Request.findOne({where: {id},attributes:{exclude: ['createdAt', 'updatedAt']}})
        return res.json(request)
    }

    async viewAll(req,res){
        const requests = await Request.findAll()
        return res.json(requests)
    }
}

module.exports = new RequestController()