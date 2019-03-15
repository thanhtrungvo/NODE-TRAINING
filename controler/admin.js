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
    Product.findById(id).then(product=>{
        res.render('admin/edit-product',{
            title: "Edit Product Page", 
            path:"/admin/add-product",
            editProduct: editMode,
            product: product
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
    const userId = req.user._id;
    const product = new Product(title, price, description, imgUrl, userId)
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
    const product = new Product(title, price, description, imgUrl);
    product.update(id).then(result =>{
        // console.log(result);
        res.redirect('/admin/product-list')
    }).catch(err =>{
        console.log(err)
    })
}

const getProducts = (req, res, next)=>{
    Product.fetchAll().then(products =>{
        res.render('admin/products', 
        {prods: products, 
        title: 'Admin Product', 
        path: "/admin/products"})
    }).catch(err =>{
        console.log(err)
    })
}

const postDeleteProduct = (req, res, next)=>{
    const productId = req.body.id;

    Product.deleteById(productId).then(result=>{
        console.log(result)
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