const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()
const port = 3000 || process.env.PORT

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views')) // it is already the default

const errorController = require('./controllers/error')

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')

app.use('/admin', adminRoutes)
app.use('/', shopRoutes)

// 404
app.use(errorController.get404Page)

app.listen(port, () => {
    console.log('Running on port ' + port)
})
