const express = require('express');
const routes = express.Router();
const shopControler = require('../controler/shop')

routes.get('/', shopControler.getHomePage)

routes.get('/product-list', shopControler.getProductList )

routes.get('/product/:id', shopControler.getProduct ) // always put /products/:id at the bottom unless this route will handle all request to /product/...

routes.get('/cart', shopControler.getCard)

routes.post('/add-to-cart', shopControler.postAddProductToCart)

// routes.get('/orders', shopControler.getOrders)

// routes.get('/checkout', shopControler.getCheckout )

module.exports = routes;