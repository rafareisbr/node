const Product = require('../models/product')
const CartItem = require('../models/cart-item')

exports.getIndexPage = (req, res) => {
    res.render('shop/index', {
        pageTitle: 'Shop'
    })
}

exports.getProductsListPage = (req, res) => {
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

exports.getProductPage = (req, res) => {
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

exports.getCartPage = (req, res) => {
    req.user.getCart().then(cart => {
        cart.getProducts().then(products => {
            res.render('shop/cart', {
                pageTitle: 'Your cart',
                products: products
            })
        })
    })
}

exports.postAddProductToCart = (req, res) => {
    const prodId = req.body.productId
    let fetchedCart = null
    let newQuantity = 1
    req.user
        .getCart()
        .then(cart => {
            fetchedCart = cart
            return cart.getProducts({ where: { id: prodId } })
        })
        .then(products => {
            let product
            if (products.length > 0) {
                product = products[0]
            }
            if (product) {
                const oldQuantity = product.cartItem.quantity
                newQuantity = oldQuantity + 1
                return product
            }
            return Product.findByPk(prodId)
        })
        .then(product => {
            return fetchedCart.addProduct(product, {
                through: { quantity: newQuantity }
            })
        })
        .then(() => {
            res.redirect('/cart')
        })
        .catch(err => console.log(err))
}

exports.postRemoveProductFromCart = (req, res) => {
    const prodId = req.body.productId
    req.user.cart
        .getCart()
        .then(cart => {
            return cart.getProducts({ where: { id: prodId } })
        })
        .then(products => {
            const product = products[0]
            return product.cartItem.destroy()
        })
        .then(() => {
            res.redirect('/cart')
        })
        .catch(err => console.log(err))
}

exports.getCheckoutPage = (req, res) => {
    res.render('shop/checkout', {
        pageTitle: 'Make your checkout'
    })
}

exports.getOrders = (req, res) => {
    res.render('shop/orders', {
        pageTitle: 'Your Orders'
    })
}
