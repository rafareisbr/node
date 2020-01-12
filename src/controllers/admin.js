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
  product.save()
  res.redirect('/')
}

exports.getEditProduct = (req, res) => {
  const productId = req.params.productId
  Product.findById(productId, product => {
    if (!product) {
      return res.status(404).redirect('/404')
    }
    res.render('admin/product-form', {
      editing: true,
      pageTitle: 'Editar Produto',
      product: product
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
  res.redirect('/admin/products')
}

exports.postDeleteProduct = (req, res) => {
  const productId = req.body.productId
  Product.deleteById(productId)
  res.redirect('/admin/products')
}

exports.getProducts = (req, res) => {
  Product.fetchAll(function(products) {
    res.render('admin/product-list', {
      products: products,
      pageTitle: 'Admin - Products'
    })
  })
}
