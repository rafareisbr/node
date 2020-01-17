const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const sequelize = require('./database/config')

const User = require('./models/user')
const Product = require('./models/product')
const Cart = require('./models/cart')
const CartItem = require('./models/cart-item')
const Order = require('./models/order')

const errorController = require('./controllers/error')
const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')

const app = express()
const port = 3000 || process.env.PORT

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res, next) => {
    User.findByPk(1)
        .then(user => {
            req.user = user
            next()
        })
        .catch(err => console.error(err))
})

app.use('/admin', adminRoutes)
app.use('/', shopRoutes)

// 404
app.use(errorController.get404Page)

User.hasMany(Product)
User.hasOne(Cart)
Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' })
Cart.belongsTo(User, { constraints: true, onDelete: 'CASCADE' })
Cart.hasMany(CartItem)
Cart.belongsToMany(Product, { through: CartItem })
Product.belongsToMany(Cart, { through: CartItem })
Order.hasMany(CartItem)
Order.belongsTo(User, { constraints: true, onDelete: 'CASCADE' })
User.hasMany(Order)

sequelize
    // .sync({ force: true }) // force overrides the database data, NOT FOR PRODUCTION
    .sync()
    .then(() => {
        return User.findByPk(1)
    })
    .then(user => {
        if (!user) {
            return User.create({ name: 'José', email: 'jose@gmail.com' })
        }
        return Promise.resolve(user)
    })
    .then(user => {
        Cart.findByPk(1)
            .then(cart => {
                if (!cart) {
                    Cart.create({ userId: user.id })
                        .then(() => {})
                        .catch(err => console.error(err))
                } else {
                    return Promise.resolve(cart)
                }
            })
            .catch(err => console.error(err))
    })
    .then(() => {
        app.listen(port)
    })
    .catch(err => console.log(err))
