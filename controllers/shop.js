const Product = require('../models/product')

exports.getProducts = (req, res) => {
  Product.fetchAll(function(products) {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    })
  })
}

exports.getProduct = (req, res) => {
  const productId = req.params.productId
  Product.findById(productId, product => {
    res.render('shop/product-detail', {
      prod: product,
      pageTitle: 'Shop',
      path: '/'
    })
  })
}

exports.getIndex = (req, res) => {
  Product.fetchAll(function(products) {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    })
  })
}

exports.getCart = (req, res) => {
  res.render('shop/cart', {
    pageTitle: 'Your cart',
    path: '/cart'
  })
}

exports.getCheckout = (req, res) => {
  res.render('shop/checkout', {
    pageTitle: 'Make your checkout',
    path: '/checkout'
  })
}

exports.getOrders = (req, res) => {
  res.render('shop/orders', {
    pageTitle: 'Your Orders',
    path: '/orders'
  })
}