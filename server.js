const express = require('express')
const app = express()
const router = require('./components/network/routes')
const connectDB = require('./db')

connectDB()
app.use(express.json())
router(app);

app.use(express.static(__dirname + '/public'));

const server = app.listen(3001, ()=> console.log(`servidor conectador en http://localhost:${server.address().port}`))