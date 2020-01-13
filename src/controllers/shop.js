const Product = require('../models/product')
const Cart = require('../models/cart')

exports.getProducts = (req, res) => {
    Product.fetchAll(function(products) {
        res.render('shop/product-list', {
            products: products,
            pageTitle: 'All Products'
        })
    })
}

exports.getProduct = (req, res) => {
    const productId = req.params.productId
    Product.findById(productId, product => {
        res.render('shop/product-detail', {
            product: product,
            pageTitle: 'Shop'
        })
    })
}

exports.getIndex = (req, res) => {
    Product.fetchAll(function(products) {
        res.render('shop/index', {
            products: products,
            pageTitle: 'Shop'
        })
    })
}

exports.getCart = (req, res) => {
    Cart.getCart(dbCart => {
        Product.fetchAll(products => {
            const cart = []
            for (let cartProd of dbCart.products) {
                const cartProduct = products.find(
                    product => product.id === cartProd.id
                )
                cart.push({ product: cartProduct, qtd: cartProd.qtd })
            }
            res.render('shop/cart', {
                pageTitle: 'Your cart',
                cart: cart
            })
        })
    })
}

exports.postCart = (req, res) => {
    const productId = req.body.productId
    Product.findById(productId, product => {
        Cart.addProduct(productId, product.price, () => {
            res.redirect('/cart')
        })
    })
}

exports.postRemoveCartProduct = (req, res) => {
    const productId = req.body.productId
    const productPrice = req.body.productPrice
    Cart.deleteProductById(productId, productPrice, () => {
        res.redirect('/cart')
    })
}

exports.getCheckout = (req, res) => {
    res.render('shop/checkout', {
        pageTitle: 'Make your checkout'
    })
}

exports.getOrders = (req, res) => {
    res.render('shop/orders', {
        pageTitle: 'Your Orders'
    })
}
