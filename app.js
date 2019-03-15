const express = require('express'); // express exports a function
const bodyParser = require('body-parser'); // parse data to the body
const app = express(); // create app from express

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const NotFoundControler = require('./controler/404')

const MongoDB = require('./utils/database')
const User = require('./model/user')


app.use(bodyParser.urlencoded({extended: false})) // pass data to all middleware... we can adjust by add to the middleware we want

app.use(express.static('public')) // this make client can take data from this folder
// this mean all the file in public can be access by client

app.use((req, res, next)=>{
    User.findById('5c89c863a6e6150e10784971')
    .then(user =>{
        req.user = new User(user.name, user.email, user.cart, user._id)
        console.log('Create New User Obj to req successful !!!!!!!!!!!!!!!!')
        next();
    })
})

app.set('view engine', 'ejs')
app.set('views', 'views') //set the template engine is EJS and all foler is located in views folder


app.use('/admin',adminRoutes);// this middleware filer all request /admin/....

app.use('/',shopRoutes) // this middle ware filer all request to /.... (but we filter again in shopRouters)

app.use(NotFoundControler)//=> app.use() middleware can get all the request from this host, and do not filer again to render NotFoundPage


MongoDB.mongoConnect(()=>{
    app.listen(9000) // Listen to port when server is start
})