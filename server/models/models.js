const User = require('./UserModel')
const Request = require('./RequestModel')
const Department = require('./DepartmentModel')

Request.belongsTo(User, {as: 'recipient'})
Request.belongsTo(User, {as: 'author'})
User.belongsTo(Department, {foreignKey:{allowNull:false},as: 'department'})
Department.hasMany(Request)
Request.belongsTo(Department)

module.exports = {
    User, Department, Request
}

