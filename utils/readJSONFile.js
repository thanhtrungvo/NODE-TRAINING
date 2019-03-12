const fs = require('fs')
module.exports = readFileJson = (path)=>{
    return new Promise((resolve, reject) =>{
        fs.readFile(path, (err, data) =>{
            if(err){
                reject(err)
            }
            if(data){
                resolve(data)
            }
        })
    })
}