const express = require('express')

const shopController = require('../controllers/shop')

const router = express.Router()

router.get('/', shopController.getIndexPage)

router.get('/products', shopController.getProductsListPage)

router.get('/products/:productId', shopController.getProductPage)

router.get('/cart', shopController.getCartPage)

router.post('/cart', shopController.postAddProductToCart)

router.post('/cart/remove-product', shopController.postRemoveProductFromCart)

router.get('/orders', shopController.getOrders)

router.get('/checkout', shopController.getCheckoutPage)

module.exports = router
