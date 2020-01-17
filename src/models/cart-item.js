const Sequelize = require('sequelize')

const sequelize = require('../database/config')

const CartItem = sequelize.define('cartItem', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
})

module.exports = CartItem
