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
  res.render('shop/cart', {
    pageTitle: 'Your cart'
  })
}

exports.postCart = (req, res) => {
  const productId = req.body.productId
  Product.findById(productId, product => {
    Cart.addProduct(productId, product.price)
  })
  res.redirect('/cart')
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
