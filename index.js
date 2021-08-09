const app = require('./src/app')
const config = require('./src/config')

const server = app.listen(config.port, ()=> console.log(`servidor conectador en http://localhost:${server.address().port}`))