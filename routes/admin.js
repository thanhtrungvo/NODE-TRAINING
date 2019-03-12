const express = require('express');
const routes = express.Router();
const adminControler = require('../controler/admin')

// /admin/add-product => GET
routes.get('/add-product', adminControler.getAddProductPage)

// /admin/products => GET
routes.get('/product-list',adminControler.getProducts )

// /admin/add-product => POST
routes.post('/add-product', adminControler.postAddProduct)
 
routes.post('/edit-product', adminControler.postEditProduct)

//admin/edit-product => GET
routes.get('/edit-product/:id', adminControler.getEditProductPage) 

//admin/delete-product => POST
routes.post('/delete-product', adminControler.postDeleteProduct)

module.exports = routes;

