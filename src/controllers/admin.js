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
    const product = new Product(null, title, imageUrl, description, price)
    product
        .save()
        .then(results => {
            console.log(results)
            res.redirect('/')
        })
        .catch(err => console.error(err))
}

exports.getEditProduct = (req, res) => {
    const productId = req.params.productId
    Product.findOne(productId).then(([rows]) => {
        if (!rows[0]) {
            return res.status(404).redirect('/404')
        }
        res.render('admin/product-form', {
            editing: true,
            pageTitle: 'Editar Produto',
            product: rows[0]
        })
    })
}

exports.postEditProduct = (req, res) => {
    const id = req.params.productId
    const title = req.body.title
    const description = req.body.description
    const price = req.body.price
    const imageUrl = req.body.imageUrl
    const updatedProduct = new Product(id, title, imageUrl, description, price)
    updatedProduct.save()
    res.redirect('/admin/products/')
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
    Product.getAll().then(([rows]) => {
        res.render('admin/product-list', {
            products: rows,
            pageTitle: 'Admin - Products'
        })
    })
}
