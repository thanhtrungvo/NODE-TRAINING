const Product = require('../model/products')
const Cart = require('../model/cart');

const getProductList = (req, res, next)=>{
    Product.fetchAll()
    .then( (products) =>{
        res.render('shop/products-list', {
                    prods: products, 
                    title: 'Shop', 
                    path: "/products"}
            )
    }).catch(err => {
        console.log(err)
    })
}
const getHomePage = (req, res, next)=>{
    Product.fetchAll().then( products =>{
        res.render('shop/index', {
            prods: products, 
            title: 'Shop', 
            path: "/"
        })
    } ).catch( err => console.log(err) )

}


const getProduct = (req, res, next)=>{
    const id = req.params.id;
    Product.findById(id).then((product) =>{
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
    req.user.getCart().then(products =>{
        let totalPrice = 0;
        products.map( e =>{
            const price = parseFloat(e.price);
            totalPrice = totalPrice + price*e.quantity
        })
            res.render('shop/cart', {
            path: '/cart',
            title:'Your Card',
            prods: products,
            totalPrice: totalPrice
        })
    })
}
const postAddProductToCart = (req, res, next)=>{

    const productId = req.body.id;
    Product.findById(productId).then(product =>{
        return req.user.addToCart(product)
    }).then(result =>{
        // console.log(result)
        res.redirect(`/cart`)
    })
}
const getCheckout = (req, res, next) =>{
    res.render('shop/checkout', {
        path: '/checkout',
        title: 'Checkout Page'
    })
}
const postDeleteCart = (req, res, next)=>{
    const  UserObject = req.user;
    const productId = req.body.productId;

    UserObject.postDeleteCart(productId).then(result=>{
        res.redirect('/cart')
    })
}

const getOrders = (req, res, next)=>{
    
    res.render('shop/orders', {
        path: "/orders",
        title: "Orders Page"
    })
}
const postOrders = (req, res, next)=>{
    let fetchedCart;
    req.user.addOrder()
    .then(result =>{
        res.redirect('/orders')
    })
    .catch(err =>{
        console.log(err)
    })
}
module.exports = {
    getHomePage, 
    getProductList, 
    getProduct,
    postAddProductToCart,
    getCard,
    postDeleteCart,
    postOrders,
    getOrders
};