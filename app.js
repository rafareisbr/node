const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const expressHps = require('express-handlebars');

const app = express();

app.engine('hbs', expressHps({
    layoutsDir: 'views/layouts/'
}));
app.set('view engine', 'hbs');
app.set('views', 'views'); // it is already the default

const adminData = require('./routes/admin');
const shopData = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.router);
app.use('/', shopData.router);

// 404
app.use((req, res, next) => {
    res.status(404).render('404', { 
        pageTitle: 'Page not found!' 
    });
});

app.listen(3000, () => {
    console.log('Running');
});