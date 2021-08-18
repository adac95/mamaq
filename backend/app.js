const express = require('express')
const app = express()
const router = require('./components/network/routes')
const connectDB = require('./db')
const path = require('path')
const morgan = require('morgan')
const multer  = require('multer')
const storage = require('./components/network/multer')
const { createRoles, createAdmin} = require('./components/utils/initialSetup');

// BASE DE DATOS
connectDB()

// Crear roles y admins por primera vez
createRoles();
createAdmin();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../fronted/views'))

// MIDDLEWARES
app.use("/public", express.static(path.join(__dirname, '../fronted/public')));
app.use(express.json())
app.use(morgan('dev'))
app.use(express.urlencoded({extended: false}))
// Multer
app.use(multer(storage).single('createProductImg'))

router(app);
// SI DESEO CONMPARTIR OTRA CARPETA "STATIC" 
// app.use('/static', express.static(path.join(__dirname, 'public')))

module.exports = app