const app = require('./app')
const config = require('./config')

const server = app.listen(config.port, ()=> console.log(`servidor conectador en http://localhost:${server.address().port}`))