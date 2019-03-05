const express = require('express');
const path = require('path');
const routes = express.Router();
const productControler = require('../controler/products')
routes.get('/', productControler.getProducts)

module.exports = routes;