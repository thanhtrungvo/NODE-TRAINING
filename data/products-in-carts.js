const fs = require('fs');
const path = require('path');

const p_productInCart = path.join(path.dirname(process.mainModule.filename),'data', 'products-in-carts.json');
const p_products = path.join(path.dirname(process.mainModule.filename),'data', 'carts.json');
const p_cart = path.join(path.dirname(process.mainModule.filename),'data', 'products.json');

class ProductsInCart{
    static update(){
        fs.readFile(p_cart, (err, data)=>{
            if(!err){
                const cart = JSON.parse(data);
                const productInCart = cart.products;
                fs.readFile(p_products, (err, data)=>{
                    if(!err){
                        const products = JSON.parse(data);
                        


                    }
                    else{
                        console.log('err in productsInCart --- There are no Products')
                    }
                })
            }
        })
    }
}