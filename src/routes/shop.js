const express = require('express')

// middleware
const isAuth = require('../middleware/is-auth')

// controller
const shopController = require('../controllers/shop')

const router = express.Router()

router.get('/', shopController.getIndexPage)

router.get('/products', shopController.getProductsListPage)

router.get('/products/:productId', shopController.getProductPage)

router.get('/cart', isAuth, shopController.getCartPage)

router.post('/cart', isAuth, shopController.postAddProductToCart)

router.post('/cart/remove-product', isAuth, shopController.postRemoveProductFromCart)

router.get('/orders', isAuth, shopController.getOrders)

router.post('/orders/add-order', isAuth, shopController.postAddOrder)

router.get('/checkout', isAuth, shopController.getCheckoutPage)

module.exports = router
