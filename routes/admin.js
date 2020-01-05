const express = require('express');

const productsController = require('../controllers/products');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Sucesso');
});

router.post('/', productsController.postAddProduct);

router.get('/add-product', productsController.getAddProduct);

module.exports = router;