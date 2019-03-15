const getDb = require('../utils/database').getDb;
const mongDb = require('mongodb')
class User{
    constructor(userName, email, cart, id){
        this.name = userName;
        this.email = email; 
        this.cart = cart; // {items: []}
        this._id = id;
    }

    save(){
        const db = getDb();
        return db.collection('users').insertOne(this)
        .then(result =>{
            console.log(result)
            return result
        })
        .catch(err =>{
            console.log(err)
        })
    }
    addToCart(product){
        // console.log(product._id)
        // console.log(product)
        const cartProductIndex = this.cart.items.findIndex((element) =>{
          return  element.productId.toString() === product._id.toString()     
        })
        let NewQuantity = 1;
        let NewCartItem = [...this.cart.items];
        if(cartProductIndex >=0){
            NewQuantity = this.cart.items[cartProductIndex].quantity +1
            NewCartItem[cartProductIndex].quantity = NewQuantity;
        }else{
            NewCartItem.push({productId: new mongDb.ObjectId(product._id) , quantity: NewQuantity})
        }

        const UpdatedCart = {items: NewCartItem};
        const db = getDb();
        return db.collection('users').updateOne(
            {_id: new mongDb.ObjectId(this._id)}, 
            {$set: {cart: UpdatedCart}}
        ).then(result=>{
            // console.log(result)
            return result
        }).catch(err =>{
            console.log(err)
        });
    }

    getCart(){
        const db = getDb();
        // find listId that suit to the ProductListId
        const productIdList = this.cart.items.map(element =>{
            return element.productId;
        })
        return db.collection('products').find({_id: {$in: productIdList}}).toArray()
            .then(products=>{
                if(products.length > 0){
                    return products.map(product=>{
                        const updateProduct = {...product};
    
                        const indexProductTuongDuong = this.cart.items.findIndex((e)=>{
                            return e.productId.toString() === product._id.toString()
                        })
    
                        updateProduct.quantity = this.cart.items[indexProductTuongDuong].quantity;
                        return updateProduct
                    })
                }
                else return [];
            })
            .catch(err =>{
                console.log(err)
            })
    }

    postDeleteCart(productId){
        const db = getDb();
        return db.collection('users').findOne({_id: new mongDb.ObjectId(this._id)})
        .then(result=>{
            let user = {...result};
            let cart = {...user.cart};
            const newItem = cart.items.filter(e =>{
                return e.productId.toString() != productId;
            })
            const newCart = { items: newItem}
            return db.collection('users').updateOne({_id: new mongDb.ObjectId(this._id)}, {$set: {cart: newCart}})
        })
        .then(result =>{
            console.log('Update successfully');
            return result;
        })
        .catch(err =>{
            console.log(err)
        })

    } 

    addOrder(){
        const db = getDb();
        this.getCart().then(products =>{
            const order = {
                items: products,
                user: {
                    _id: new mongDb.ObjectId(this._id),
                    name : this.name
                }
            };
            return db.collection('orders').insertOne(this.cart)
        }).then(result =>{
            this.cart = {items: []};
            return db.collection('users').updateOne({_id: new mongDb.ObjectId(this._id)},
                                        {$set: {cart: {items: []}}}) 
        });
    }

    getOrder(){
        const db = getDb();
        return db.collection('orders')
    }
    
    static findById(userId){
        const db = getDb();
        return db.collection('users').find({_id: new mongDb.ObjectId(userId)}).next()
        .then(result=>{
            return result
        })
        .catch(err =>{
            console.log(err)
        })
    }
}


module.exports = User;