const Product = require('../models/product')

exports.getAddProduct = (req, res) => {
    res.render('admin/product-form', {
        pageTitle: 'Adicionar Produto',
        editing: false,
        product: new Product()
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
        imageUrl: imageUrl
    })
        .then(() => {
            console.log('Product Created')
            res.redirect('/')
        })
        .catch()
}

exports.getEditProduct = (req, res) => {
    const productId = req.params.productId
    Product.findByPk(productId)
        .then(product => {
            res.render('admin/product-form', {
                editing: true,
                pageTitle: 'Editar Produto',
                product: product
            })
        })
        .catch(() => {
            res.status(404).redirect('/404')
        })
}

exports.postEditProduct = (req, res) => {
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
    Product.deleteOne(productId)
        .then(() => {
            res.redirect('/admin/products/')
        })
        .catch(err => console.error(err))
}

exports.getProducts = (req, res) => {
    Product.findAll()
        .then(products => {
            res.render('admin/product-list', {
                products: products,
                pageTitle: 'Admin - Products'
            })
        })
        .catch(err => console.error(err))
}
