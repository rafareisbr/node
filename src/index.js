const express = require('express')
const path = require('path')

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const sequelize = require('./database/config')
const session = require('express-session')
const helmet = require('helmet')
const csurf = require('csurf')
const flash = require('connect-flash')

const User = require('./models/user')
const Product = require('./models/product')
const Cart = require('./models/cart')
const CartItem = require('./models/cart-item')
const Order = require('./models/order')
const OrderItem = require('./models/order-item')

const errorController = require('./controllers/error')
const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const authRoutes = require('./routes/auth')

const app = express()
const port = 3000 || process.env.PORT

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(helmet())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(cookieParser())
app.use(
    session({
        secret: 'session_secret',
        resave: false,
        saveUninitialized: false
    })
)
app.use(csurf())
app.use(flash())

app.use((req, res, next) => {
    if (!req.session.user) {
        return next()
    }
    User.findByPk(req.session.user.id)
        .then(user => {
            req.user = user
            return next()
        })
        .catch(err => console.log(err))
})

// Define variáveis que estarão disponíveis em todas as views.
app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn
    res.locals.csrfToken = req.csrfToken()
    res.locals.errorMessages = req.flash('error')
    next()
})

app.use('/admin', adminRoutes)
app.use('/auth', authRoutes)
app.use('/', shopRoutes)

// 404
app.use(errorController.get404Page)

User.hasOne(Cart)
User.hasMany(Product)
User.hasMany(Order)

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' })
Product.belongsToMany(Cart, { through: CartItem })
Product.belongsToMany(Order, { through: OrderItem })

Cart.belongsTo(User, { constraints: true, onDelete: 'CASCADE' })
Cart.belongsToMany(Product, { through: CartItem })

Order.belongsTo(User, { constraints: true, onDelete: 'CASCADE' })
Order.belongsToMany(Product, { through: OrderItem })

sequelize
    // .sync({ force: true }) // force overrides the database data, NOT FOR PRODUCTION
    .sync()
    // .then(() => {
    //     return User.findOne()
    // })
    // .then(user => {
    //     if (!user) {
    //         return User.create({ email: 'jose@gmail.com', password: 123 })
    //     }
    //     return Promise.resolve(user)
    // })
    // .then(user => {
    //     user.getCart()
    //         .then(cart => {
    //             if (!cart) {
    //                 Cart.create({ userId: user.id })
    //                     .then(() => {})
    //                     .catch(err => console.error(err))
    //             } else {
    //                 return Promise.resolve(cart)
    //             }
    //         })
    //         .catch(err => console.error(err))
    // })
    .then(() => {
        app.listen(port)
    })
    .catch(err => console.log(err))
