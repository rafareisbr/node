const Sequelize = require('sequelize').Sequelize

const sequelize = require('../database/config')

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    email: Sequelize.STRING,
    password: {
        type: Sequelize.STRING
    }
})

module.exports = User
