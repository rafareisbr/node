const Sequelize = require('sequelize').Sequelize

const sequelize = require('../database/config')

const Cart = sequelize.define('cart', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    }
})

module.exports = Cart
