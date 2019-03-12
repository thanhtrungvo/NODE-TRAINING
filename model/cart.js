const db = require('../utils/database')

class Cart{
    constructor(cartId, userId){
        this.cartId = cartId;
        this.userId = userId;
    }

    fetchAllInCart(){
        return db.execute('select * from product where userId = ?' , [this.userId])
    }

    addProductToCart(){
        db.execute('select * from cart where userId = ?', [this.userId]).then(

        ).catch()
    }
}

module.exports = Cart;