const Product = require('../models/product')
const Cart = require('../models/cart')

exports.getIndex = (req, res) => {
    res.render('shop/index', {
        pageTitle: 'Shop'
    })
}

exports.getProducts = (req, res) => {
    Product.findAll({
        where: {
            userId: req.user.id
        }
    })
        .then(products => {
            res.render('shop/product-list', {
                products: products,
                pageTitle: 'All Products'
            })
        })
        .catch(err => console.error(err))
}

exports.getProduct = (req, res) => {
    const productId = req.params.productId
    Product.findByPk(productId)
        .then(product => {
            res.render('shop/product-detail', {
                product: product,
                pageTitle: 'Shop'
            })
        })
        .catch(err => console.error(err))
}

exports.getCart = (req, res) => {
    Cart.findOne({
        where: {
            id: req.user.id
        }
    })
        .then(cart => {
            res.render('shop/cart', {
                pageTitle: 'Your cart',
                cart: cart
            })
        })
        .catch(err => console.error(err))
}

exports.postCart = (req, res) => {
    // const productId = req.body.productId
    // Product.findById(productId, product => {
    //     Cart.addProduct(productId, product.price, () => {
    //         res.redirect('/cart')
    //     })
    // })
}

exports.postRemoveCartProduct = (req, res) => {
    // const productId = req.body.productId
    // const productPrice = req.body.productPrice
    // Cart.deleteProductById(productId, productPrice, () => {
    //     res.redirect('/cart')
    // })
}

exports.getCheckout = (req, res) => {
    // res.render('shop/checkout', {
    //     pageTitle: 'Make your checkout'
    // })
}

exports.getOrders = (req, res) => {
    res.render('shop/orders', {
        pageTitle: 'Your Orders'
    })
}
