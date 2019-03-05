const express = require('express'); // express exports a function
const bodyParser = require('body-parser')
const app = express();
const path = require('path');

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const NotFoundControler = require('./controler/404')

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static('public'))

app.set('view engine', 'ejs')
app.set('views', 'views')
// this mean all the file in public can be access by client
app.use('/admin',adminRoutes);
// => this is just a middle ware
app.use('/',shopRoutes)
// => this is just a middle ware

app.use(NotFoundControler)
//=> app.use() middleware can get all the request from this host
app.listen(9000)
