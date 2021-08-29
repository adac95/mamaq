const express = require('express')
const app = express()
const router = require('./components/network/routes')
const connectDB = require('./db')
const path = require('path')
const morgan = require('morgan')
const multer = require('multer')
const storage = require('./components/network/multer')
const { createRoles, createAdmin } = require('./components/utils/initialSetup');
const session = require('express-session')
const cookieParser = require('cookie-parser')
const MongoStore = require('connect-mongo');
const config = require('./config/index')
const cookieSession = require('cookie-session')
const passport = require('passport')

// localstrategy Passport
require('./components/api-auth/passport/strategys/login');
require('./components/api-auth/passport/strategys/token');

// BASE DE DATOS
connectDB()
// Crear roles y admins por primera vez
createRoles();
createAdmin();

// SETTINGS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../fronted/views'))

// MIDDLEWARES
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use("/public", express.static(path.join(__dirname, '../fronted/public')));
app.use(morgan('dev'))
// Multer
app.use(multer(storage).single('createProductImg'))
app.use(cookieParser())
// Express Session
const USER = encodeURIComponent(config.dbUser)
const PASSWORD = encodeURIComponent(config.dbPassword)
const DB_NAME = config.dbName
const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@cluster0.pnsvs.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
app.set('trust proxy', 1)
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
    // store: MongoStore.create({ mongoUrl: MONGO_URI })
}))
app.use(passport.initialize());
app.use(passport.session());
// app.use(cookieSession({
//     name: 'session',
//     keys: ['key1', 'key2'],
//     // Cookie Options
//     maxAge: 24 * 60 * 60 * 1000 // 24 hours
//   }))
// Variables locales
app.use((req, res, next) => {
    app.locals.user = req.user
    next()
})

// ROUTES
router(app);


module.exports = app