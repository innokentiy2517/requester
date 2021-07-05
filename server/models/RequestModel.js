const DataTypes = require('sequelize')
const sequelize = require('../db')

const Request = sequelize.define('request',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    topic: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    exp_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('Выполняется', 'Завершена', 'Отменена'),
        defaultValue: 'Выполняется',
        allowNull: false
    }
},{underscored: true})

module.exports = Request