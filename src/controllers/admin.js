const Product = require('../models/product')

exports.getProductsListPage = (req, res) => {
    Product.findAll()
        .then(products => {
            res.render('admin/product-list', {
                products: products,
                pageTitle: 'Admin - Products',
                isAuthenticated: req.session.isLoggedIn
            })
        })
        .catch(err => console.error(err))
}

exports.getAddProductPage = (req, res) => {
    res.render('admin/product-form', {
        pageTitle: 'Adicionar Produto',
        editing: false,
        product: Product.build(),
        isAuthenticated: req.session.isLoggedIn
    })
}

exports.postAddProduct = (req, res) => {
    const title = req.body.title
    const description = req.body.description
    const price = req.body.price
    const imageUrl = req.body.imageUrl

    Product.create({
        id: null,
        title: title,
        description: description,
        price: price,
        imageUrl: imageUrl,
        userId: req.session.user.id
    })
        .then(() => {
            console.log('Product Created')
            res.redirect('/')
        })
        .catch()
}

exports.getUpdateProductPage = (req, res) => {
    const productId = req.params.productId
    Product.findByPk(productId)
        .then(product => {
            res.render('admin/product-form', {
                editing: true,
                pageTitle: 'Editar Produto',
                product: product,
                isAuthenticated: req.session.isLoggedIn
            })
        })
        .catch(() => {
            res.status(404).redirect('/404')
        })
}

exports.postUpdateProduct = (req, res) => {
    const id = req.params.productId
    const title = req.body.title
    const description = req.body.description
    const price = req.body.price
    const imageUrl = req.body.imageUrl

    Product.findByPk(id)
        .then(product => {
            product
                .update({
                    title: title,
                    description: description,
                    price: price,
                    imageUrl: imageUrl
                })
                .then(() => {
                    res.redirect('/admin/products/')
                })
                .catch(err => console.error(err))
        })
        .catch(err => console.error(err))
}

exports.postDeleteProduct = (req, res) => {
    const productId = req.body.productId
    Product.findByPk(productId)
        .then(product => {
            product
                .destroy(productId)
                .then(() => {
                    res.redirect('/admin/products/')
                })
                .catch(err => console.error(err))
        })
        .catch(err => console.error(err))
}
