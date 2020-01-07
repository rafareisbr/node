const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Sucesso');
});

router.get('/add-product', adminController.getAddProduct);

router.post('/add-product', adminController.postAddProduct);

router.get('/products', adminController.getProducts);

module.exports = router;