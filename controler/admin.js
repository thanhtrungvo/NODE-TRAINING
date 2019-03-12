const db = require('../utils/database')
const Product = require('../model/products')

const getAddProductPage = (req, res, next)=>{
    res.render('admin/edit-product',{
        title: "Add Product Page", 
        path:"/admin/add-product",
        editProduct : false
    })
}
const getEditProductPage = (req, res, next)=>{
    const editMode = req.query.edit;
    if(!editMode){
        return res.redirect('/')
    }
    const id = req.params.id;
    req.user.getProducts({
        where: {id: id}
    }).then(product =>{
        res.render('admin/edit-product',{
            title: "Edit Product Page", 
            path:"/admin/add-product",
            editProduct: editMode,
            product: product[0]
        })
    }).catch(err =>{
        console.log(err)
    })

}
const postAddProduct = (req, res, next)=>{
    const title = req.body.title;
    const imgUrl = req.body.imgUrl;
    const price = req.body.price; 
    const description = req.body.description;
    const userId = req.user.userId;
    const product = new Product(null, title, imgUrl, description, price, userId)
    product.save().then(task =>{
        console.log('add '+ title + ' successfully')
        res.redirect('/admin/product-list')
    }).catch(err =>{
        console.log(err)
    })
}

const postEditProduct = (req, res, next)=>{
    const title = req.body.title;
    const imgUrl = req.body.imgUrl;
    const price = req.body.price;
    const description = req.body.description;
    const id = req.body.id;
    // const product = new Product(title, imgUrl, description, price, id );
    // console.log(product)
    // product.save();
    Product.findById(id)
    .then(product=>{
        product.title = title;
        product.imgUrl = imgUrl;
        product.price = price;
        product.description = description;
        return product.save();
    })
    .then(()=>{
        res.redirect('/admin/product-list')
    })
    .catch(err =>{
        console.log(err)
    })
}

const getProducts = (req, res, next)=>{
    const userId = req.user.userId;
    Product.fetchProductsWithUserId(userId).then(([products, info]) =>{
        res.render('admin/products', 
        {prods: products, 
        title: 'Admin Product', 
        path: "/admin/products"})
    }).catch(err =>{
        console.log(err)
    })
}

const postDeleteProduct = (req, res, next)=>{
    const id = req.body.id;
    const price = req.body.price;
    Product.findById(id).then(product=>{
        if(product){
            return product.destroy()
        }
    }).then(result =>{
        res.redirect('/admin/product-list')
    }).catch(err =>{
        console.log(err)
    })
}
module.exports = {
    getAddProductPage,
    postAddProduct,
    getProducts,
    getEditProductPage,
    postEditProduct,
    postDeleteProduct
};