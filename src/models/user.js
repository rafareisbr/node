const Sequelize = require('sequelize')

const sequelize = require('../database/config')

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    name: Sequelize.STRING(255),
    email: Sequelize.STRING(255)
})

module.exports = User
