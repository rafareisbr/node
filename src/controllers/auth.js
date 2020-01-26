const bcrypt = require('bcrypt')

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
            req.session.save(err => {
                console.log(err)
                res.redirect('/')
            })
        })
        .catch(err => console.log(err))
}

exports.postLogout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
}

exports.getSignup = (req, res) => {
    res.render('auth/signup', {
        pageTitle: 'Sign up',
        isAuthenticated: req.session.isLoggedIn
    })
}

exports.postSignup = (req, res) => {
    const email = req.body.email
    const password = req.body.password
    const password_confirm = req.body.passwordConfirm

    User.findOne({
        where: {
            email: email
        }
    })
        .then(user => {
            if (user) {
                return res.redirect('/signup')
            }

            const user = new User({})
        })
        .catch(err => {
            console.log(err)
        })
}
