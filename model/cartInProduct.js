const path = require('path');
const fs = require('fs')
const p_cart = path.join(path.dirname(process.mainModule.filename),'data', 'cart.json');
const p_products = path.join(path.dirname(process.mainModule.filename),'data', 'products.json');
const readFileJson = require('../utils/readJSONFile');

class ProductInCart{
    constructor(title, imgUrl, description, price, id, qty){
        this.id = id; 
        this.title = title;
        this.imgUrl = imgUrl;
        this.description = description;
        this.price = price;
        this.qty = qty;
    }
    static update(callback){
        let listProductInCarts = [];
        let totalPrice = 0;
        Promise.all([readFileJson(p_cart), readFileJson(p_products)]).then(values=>{
            let cart = values[0];
            cart = JSON.parse(cart);

            let listProduct = values[1];
            listProduct = JSON.parse(listProduct);

            const products = [...cart.products];
            totalPrice = cart.totalPrice;

            products.forEach((product, index)=>{
                for(let i in listProduct){
                    if(product.id === listProduct[i].id){
                        const oneProduct = {
                            title: listProduct[i].title,
                            imgUrl: listProduct[i].imgUrl,
                            description: listProduct[i].description,
                            price: listProduct[i].price,
                            qty: product.qty                        
                        }
                        listProductInCarts.push(oneProduct)
                    }
                }
            })
            return callback(listProductInCarts, totalPrice)

        }).catch(reason =>{
            console.log(reason);
            return callback(listProductInCarts, totalPrice)
        })
    }
}



module.exports = ProductInCart;