const Product = require('../models/product')

exports.getAddProduct = (req, res) => {
  res.render('admin/add-product', {
    pageTitle: 'Adicionar Produto'
  })
}

exports.postAddProduct = (req, res) => {
  const title = req.body.title
  const description = req.body.description
  const price = req.body.price
  const imageUrl = req.body.imageUrl
  const product = new Product(title, imageUrl, description, price)
  product.save()
  res.redirect('/')
}

exports.getProducts = (req, res) => {
  Product.fetchAll(function(products) {
    res.render('admin/product-list', {
      prods: products,
      pageTitle: 'Admin - Products',
      path: '/admin/products'
    })
  })
}
