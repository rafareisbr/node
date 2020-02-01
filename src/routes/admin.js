const express = require('express')

// middleware
const isAuth = require('../middleware/is-auth')

// controllers
const adminController = require('../controllers/admin')

const router = express.Router()

router.get('/products', isAuth, adminController.getProductsListPage)

router.get('/add-product', isAuth, adminController.getAddProductPage)

router.get('/edit-product/:productId', isAuth, adminController.getUpdateProductPage)

router.post('/add-product', isAuth, adminController.postAddProduct)

router.post('/edit-product/:productId', isAuth, adminController.postUpdateProduct)

router.post('/delete-product', isAuth, adminController.postDeleteProduct)

module.exports = router
