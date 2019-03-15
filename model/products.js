const getDb = require('../utils/database').getDb;
const mongdb = require('mongodb');
class Product{
    constructor(title, price, description, imgUrl, userId){
        this.title = title;
        this.price = price;
        this.description = description;
        this.imgUrl = imgUrl;
        this.userId = userId;
    }

    save(){
        const db = getDb();
        return db.collection('products').insertOne(this)
            .then(result =>{
                return result
            })
            .catch(err =>{
                console.log(err)
            }
        )
    }

    update(id){
        const db = getDb()
        return db.collection('products').updateOne({_id: new mongdb.ObjectId(id)}, {$set: this})
    }

    static fetchAll(){
        const db = getDb();
        return db.collection('products').find().toArray()
            .then(result=>{
                return result
            })
            .catch(err =>{
                console.log(err)
            })
    }

    static findById(productId){
        const db = getDb();
        return db.collection('products').find({_id: new mongdb.ObjectId(productId) }).next()
        .then(result=>{
            return result;
        })
        .catch(err =>{
            console.log(err)
        })
    }   

    static deleteById(productId){
        const db = getDb();
        return db.collection('products').remove({
            _id: {$eq: new mongdb.ObjectId(productId)}
        })
    }
}

module.exports = Product;