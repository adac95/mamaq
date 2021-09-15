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
const flash = require('connect-flash');
const cookieParser = require('cookie-parser')
const MongoStore = require('connect-mongo');
const config = require('./config/index')
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
app.set('trust proxy', 1)
app.use(session({
    secret: config.expressSessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 3000000000,
        // httpOnly: config.nodeEnv === "production" ? true : false,
        // secure: config.nodeEnv === "production" ? true : false
    },
    store: MongoStore.create({ mongoUrl: config.dbUri })
}))
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
// Variables locales
app.use((req, res, next) => {
    app.locals.user = req.user
    res.locals.error_msg = req.flash("error_msg")
    res.locals.error = req.flash("error");
    next()
})

// ROUTES
router(app);


module.exports = app