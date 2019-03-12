const Product = require('../model/products')
const Cart = require('../model/cart');

const getProductList = (req, res, next)=>{
    Product.fetchAll().then( ([arrayProducts, config]) =>{
        res.render('shop/products-list', {
                    prods: arrayProducts, 
                    title: 'Shop', 
                    path: "/products"}
            )
    }).catch(err => {
        console.log(err)
    })
}
const getHomePage = (req, res, next)=>{
    Product.fetchAll().then( ([arrayProducts, config]) =>{
        // console.log(arrayProducts);
        res.render('shop/index', {
            prods: arrayProducts, 
            title: 'Shop', 
            path: "/"
        })
    } ).catch( err => console.log(err) )

}


const getProduct = (req, res, next)=>{
    const id = req.params.id;
    Product.findById(id).then(product =>{
        res.render('shop/product-detail', {
            title: "Product Detail",
            product : product,
            path: '/products'
        })   
    }).catch(err =>{
        console.log(err)
    })
}

const getCard = (req, res, next) =>{
    const userId = req.user.userId;
    const cart = new Cart(null, userId);
    cart.fetchAllInCart().then( ([listResults, info]) =>{
        res.render('shop/cart', {
            path: '/cart',
            title:'Your Card',
            prods: listResults,
            totalPrice: 0
        })
    })
}
const postAddProductToCart = (req, res, next)=>{

    const id = req.body.id;
    const productPrice = req.body.productPrice;
    Cart.addProductToCart(id, productPrice)
    res.redirect(`/cart`)
}
const getCheckout = (req, res, next) =>{
    res.render('shop/checkout', {
        path: '/checkout',
        title: 'Checkout Page'
    })
}

const getOrders = (req, res, next)=>{
    res.render('shop/orders', {
        path: "/orders",
        title: "Orders Page"
    })
}
module.exports = {
    getHomePage, 
    getProductList, 
    getCard,
    getCheckout,
    getOrders,
    getProduct, 
    postAddProductToCart
};