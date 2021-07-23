const express = require('express')
const app = express()
const router = require('./components/network/routes')
const connectDB = require('./db')
const path = require('path')
const morgan = require('morgan')
const multer  = require('multer')
const storage = require('./components/network/multer')


connectDB()
app.use(express.json())

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views')

// Middlewares
// app.use(morgan('dev'))
app.use(express.urlencoded({extended: false}))
// Multer
app.use(multer(storage).single('createProductImg'))

router(app);

// app.use(express.static(__dirname + '/public'));
app.use("/public", express.static(path.join(__dirname, 'public')));

const server = app.listen(3001, ()=> console.log(`servidor conectador en http://localhost:${server.address().port}`))