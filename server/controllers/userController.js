const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const {User, Department} = require('../models/models')
const jwt = require('jsonwebtoken')

const generateJwt = (id, login, dep_id) => {
    return jwt.sign(
        {id, login, dep_id},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    /*
    TODO: Нормальная валидация данных
     */
        async registration(req, res, next){
            let {first_name, second_name, department_name, login, password} = req.body
            if(!login || !password || !first_name || !second_name || !department_name){
                return next(ApiError.badRequest('Некорректный ввод данных'))
            }
            const candidate = await User.findOne({where: {login}})
            if (candidate){
                return next(ApiError.badRequest('Пользователь с таким логином уже существует'))
            }
            const hashPassword = await bcrypt.hash(password, 5)
            const department_id = await Department.findOne({where: {department_name: department_name}}).then(function (dep){return dep.id})
            console.log(department_id)
            /*
            TODO: Почему используется lowerCamelCase вместо under_score в методе .create?
             */
            const user = await User.create({first_name, second_name,departmentId: department_id, login, password: hashPassword})
            const token = generateJwt(user.id, user.login, department_id)
            return res.json({token})
    }

    async login(req,res,next){
        const {login, password} = req.body
        const user = await User.findOne({where: {login}})
        if(!user){
            return next(ApiError.internal('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword){
            return next(ApiError.internal('Указан неверный пароль'))
        }
        const token = generateJwt(user.id, user.login, user.departmentId)
        return res.json({token})
    }

    async check(req,res, next){
        const token = generateJwt(req.user.id, req.user.login, req.user.dep_id)
        return res.json({token})
    }

    async getAll(req,res){
            const users = await User.findAll({attributes: {exclude: ['login', 'password', 'createdAt', 'updatedAt']}})
        return res.json(users)
    }
}

module.exports = new UserController()