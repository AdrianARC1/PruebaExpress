const express = require('express');
const dotenv=require('dotenv').config()
const path = require('path')
const logger = require('morgan')
// const flash = require('connect-flash')
// const session = require('express-session')
// const MySQLStore = require('express-mysql-session');
// const cookieParser = require('cookie-parser')

// const { pool } = require('./db')

const indexRouter = require('./routes/index');

const app = express();

PORT=process.env.PORT || 3000

app.set('views', path.join(__dirname,'views'))
app.set('view engine', 'ejs');
// app.set(express.static(path.join(__dirname,'public')))

// app.use(cookieParser());

// app.use(session({
//     secret: 'nodesecret',
//     resave: false,
//     saveUninitialized: false,
//     store: new MySQLStore(pool)
// }))

// app.use(flash())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

// app.use((req,res,next)=>{
//     app.locals.success = req.flash('success')
//     next()
// })

app.use('/', indexRouter)

app.listen(PORT)
console.log("Escuchando en el puerto", PORT);
module.exports=app