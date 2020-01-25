exports.getLogin = (req, res) => {
    res.render('auth/login', {
        pageTitle: 'Login',
        isAuthenticated: req.session.isLoggedIn
    })
}

exports.postLogin = (req, res) => {
    req.session.isLoggedIn = true
    res.redirect('/')
}

exports.postLogout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
}
