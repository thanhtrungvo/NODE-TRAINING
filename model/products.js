const db = require('../utils/database')

class Product{
    constructor(id, title, imgUrl, description, price, userId ){
        this.id = id,
        this.title = title,
        this.imgUrl = imgUrl,
        this.description = description,
        this.price = price,
        this.userId = userId
    }
    save(){
        return db.execute(`insert into product (title, imgUrl, price, description, userId) values
        (?,?,?,?,?)`,[this.title, this.imgUrl, this.price, this.description, this.userId])
    }
    static fetchAll(){
        return db.execute('select * from product')
    }

    static fetchProductsWithUserId(userId){
        return db.execute('select * from product where userId = ?',[userId])

    }
}

module.exports = Product;