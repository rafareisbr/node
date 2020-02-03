const bcrypt = require('bcryptjs')

const User = require('../models/user')
const Cart = require('../models/cart')

exports.getLogin = (req, res) => {
    res.render('auth/login', {
        pageTitle: 'Login'
    })
}

exports.postLogin = (req, res) => {
    const email = req.body.email
    const password = req.body.password

    let user = undefined
    User.findOne({ where: { email: email } })
        .then(fetchUser => {
            if (!fetchUser) {
                req.flash('error', 'Login ou senha inválidos')
                return res.redirect('/auth/login')
            }
            user = fetchUser
            bcrypt
                .compare(password, user.password)
                .then(isPasswordCorrect => {
                    if (!isPasswordCorrect) {
                        return res.redirect('/auth/login')
                    }
                    req.session.isLoggedIn = true
                    req.session.user = user
                    req.session.save(() => {
                        res.redirect('/auth/login')
                    })
                })
                .catch(() => {
                    res.redirect('/auth/login')
                })
        })
        .catch(err => {
            console.log(err)
            res.redirect('/auth/login')
        })
}

exports.postLogout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
}

exports.getSignup = (req, res) => {
    res.render('auth/signup', {
        pageTitle: 'Sign up'
    })
}

exports.postSignup = (req, res) => {
    const email = req.body.email
    const password = req.body.password
    const password_confirm = req.body.password_confirm

    if (email == '' || password == '' || password_confirm == '') {
        req.flash('error', 'Preencha todos os campos')
        return res.redirect('/auth/signup')
    }
    // email enviado existe?
    User.findOne({
        where: {
            email: email
        }
    })
        .then(user => {
            // existe? então não está disponível para cadastro
            if (user) {
                return res.redirect('/auth/signup')
            } else {
                if (password !== password_confirm) {
                    return res.redirect('/auth/signup')
                }
                bcrypt.hash(password, 12).then(hashPassword => {
                    User.create({ email: email, password: hashPassword })
                        .then(createdUser => {
                            Cart.create({ userId: createdUser.id })
                                .then(() => {
                                    return res.redirect('/')
                                })
                                .catch(err => console.error(err))
                        })
                        .catch(() => {
                            return res.redirect('/auth/signup')
                        })
                })
            }
        })
        .catch(err => {
            console.log(err)
        })
}
