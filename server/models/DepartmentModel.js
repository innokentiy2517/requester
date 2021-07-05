const DataTypes = require('sequelize')
const sequelize = require('../db')

const Department = sequelize.define('department',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    department_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
    department_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
},{underscored: true})

module.exports = Department