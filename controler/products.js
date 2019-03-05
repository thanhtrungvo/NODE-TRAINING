const Product = require('../model/products')

const getAddProductPage = (req, res, next)=>{
    res.render('add-product',{title: "Add Product Page", path:"/admin/add-product"})
}
const postAddProduct = (req, res, next)=>{
    // products.push({title: req.body.title})
    const product = new Product(req.body.title);
    product.save();
    res.redirect('/')
}
const getProducts = (req, res, next)=>{
    const takeData = (products)=>{
        res.render('shop', {prods: products, title: 'Shop', path: "/"})
    }
    Product.fetAlldata(takeData)
}
module.exports = {
    getAddProductPage,
    postAddProduct,
    getProducts
};