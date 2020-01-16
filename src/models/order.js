const Sequelize = require('sequelize')

const sequelize = require('../database/config')

const Order = sequelize.define('orders', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    }
})

module.exports = Order
