const express = require('express');
const path = require('path');

const products = [];

const router = express.Router();

router.get('/', (req, res) => {
    return res.send('Sucesso');
});

router.post('/', (req, res, next) => {
    products.push({ title: req.body.title });
    res.redirect('/');
});

router.get('/add-product', (req, res) => {
    res.render('product-form', {
        pageTitle: 'Adicionar Produto'
    });
});

exports.router = router;
exports.products = products;