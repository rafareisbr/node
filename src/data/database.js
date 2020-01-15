const Sequelize = require('sequelize')

const sequelize = new Sequelize('teste', 'postgres', 'test', {
    dialect: 'postgres',
    host: 'localhost'
})

module.exports = sequelize
