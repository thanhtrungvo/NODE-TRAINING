const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) =>{
    MongoClient.connect('mongodb+srv://thanhtrungvo123:trung312286428@cluster0-vtgua.mongodb.net/test?retryWrites=true')
    .then(client =>{
        console.log('connected');
        _db = client.db();
        callback();
    })
    .catch(err =>{
        console.log(err)
        console.log('err here')
    })
};

const getDb = () =>{
    if(_db){
        return _db;
    }
    throw 'No database found'
}

module.exports = {
    mongoConnect,
    getDb
}
