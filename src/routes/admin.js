const express = require('express')

const adminController = require('../controllers/admin')

const router = express.Router()

router.get('/products', adminController.getProductsListPage)

router.get('/add-product', adminController.getAddProductPage)

router.get('/edit-product/:productId', adminController.getUpdateProductPage)

router.post('/add-product', adminController.postAddProduct)

router.post('/edit-product/:productId', adminController.postUpdateProduct)

router.post('/delete-product', adminController.postDeleteProduct)

module.exports = router
