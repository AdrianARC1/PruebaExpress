const express = require('express');
const dotenv=require('dotenv').config()
const path = require('path')
const logger = require('morgan')

const indexRouter = require('./routes/index')

const app = express();

PORT=process.env.PORT || 3000

app.set('views', path.join(__dirname,'views'))
app.set('view engine', 'ejs');


app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.set(express.static(path.join(__dirname,'public')))

app.use('/', indexRouter)

app.listen(PORT)
console.log("Escuchando en el puerto", PORT);
module.exports=app