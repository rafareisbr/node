const Sequelize = require('sequelize').Sequelize

const sequelize = require('../database/config')

const Order = sequelize.define('order', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    }
})

module.exports = Order
