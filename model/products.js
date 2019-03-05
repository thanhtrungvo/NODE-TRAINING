const fs = require('fs');
const path = require('path')
const p = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json')
const getProductFromFile = (takeData)=>{
        fs.readFile(p, (err, data)=>{
            if(!err){
                const products = JSON.parse(data)
                takeData(products)
            }else{
                console.log("there are no such file like that so I want to create one")
                const products = [];
                takeData(products)
                // console.log(err)
            }
        });
}

class Product{
    constructor(name){
        this.title = name;
    }
    save(){
        const AddProduct = (products)=>{
            products.push(this);
            fs.writeFile(p,JSON.stringify(products), err=>{
                if(err){
                    console.log('Err in writeFile process')
                }
            })
        }
        getProductFromFile(products => AddProduct(products));
        // const p = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json')
        // fs.readFile(p,(err, data)=>{
        //     if(err){
        //             console.log("there are no such file like that so I want to create one")
        //             const getData = [];
        //             getData.push(this)
        //             fs.writeFile(p,JSON.stringify(getData) ,(err)=>{ if(err) {console.log('err on writeFile');console.log(err)} })
        //     }
        //     else{
        //         const getData = JSON.parse(data)
        //         getData.push(this);
        //         fs.writeFile(p, JSON.stringify(getData),err=>{if(err) {console.log(err)} })
        //     }

        // })
        // products.push(this)
    }

    static fetAlldata(takeData){
        getProductFromFile(takeData);
    }
}

module.exports = Product;
