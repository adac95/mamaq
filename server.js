const express = require('express')
const app = express()
const router = require('./components/network/routes')
const connectDB = require('./db')
const path = require('path')

connectDB()
app.use(express.json())

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views')

router(app);

// app.use(express.static(__dirname + '/public'));
app.use("/public", express.static(path.join(__dirname, 'public')));

const server = app.listen(3001, ()=> console.log(`servidor conectador en http://localhost:${server.address().port}`))