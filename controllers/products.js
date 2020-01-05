const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('product-form', {
        pageTitle: 'Adicionar Produto'
    });
}

exports.postAddProduct = (req, res, next) => {
    const product = new Product(req.body.title);
    product.save();
    res.redirect('/');
}

exports.getProducts = (req, res, next) => {
    Product.fetchAll(function(products) {
        res.render('shop', {
            prods: products,
            pageTitle: 'Meu Shopping'
        });
    });
}