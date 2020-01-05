const products = [];

exports.getAddProduct = (req, res, next) => {
    res.render('product-form', {
        pageTitle: 'Adicionar Produto'
    });
}

exports.postAddProduct = (req, res, next) => {
    products.push({ title: req.body.title });
    res.redirect('/');
}

exports.getProducts = (req, res, next) => {
    res.render('shop', {
        prods: products,
        pageTitle: 'Meu Shopping'
    });
}

exports.products = products;