const express = require('express');
const routes = express.Router();

// /admin/add-product => Get
const productControler = require('../controler/products')
routes.get('/add-product', productControler.getAddProductPage)
// /admin/add-product
routes.post('/product', productControler.postAddProduct)

module.exports = routes;
