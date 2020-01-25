const User = require('../models/user')

exports.getLogin = (req, res) => {
    res.render('auth/login', {
        pageTitle: 'Login',
        isAuthenticated: req.session.isLoggedIn
    })
}

exports.postLogin = (req, res) => {
    User.findByPk(1)
        .then(user => {
            req.session.isLoggedIn = true
            req.session.userId = user.id
            res.redirect('/')
        })
        .catch(err => console.log(err))
}

exports.postLogout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
}
