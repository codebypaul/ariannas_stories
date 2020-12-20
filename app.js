require('dotenv').config({path : './config/config.env'});
const express = require('express')
const app = express()
const layouts = require('express-ejs-layouts')
const session = require('express-session')
const flash = require('connect-flash')
const connectDB = require('./config/db')
const MongoStore = require('connect-mongo')(session)
const mongoose = require('mongoose')
const passport = require('passport')

//passport config
require('./config/passport')(passport)

connectDB()

app.use(express.urlencoded({extended: false}))
app.use(express.json())

//express ejs layouts
app.set('view engine','ejs')
app.use(layouts)

if (process.env.NODE_ENV === 'development'){
    app.use(require('morgan')('dev'))
}

const sessionObject = {
    secret: process.env.SECRET_SESSION,
    resave: false,
    saveUninitialized: false,
    store : new MongoStore({ mongooseConnection:mongoose.connection })
}
//express session use session object
app.use(session(sessionObject));

// Initialize passport and run through middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

// Messages that will be accessible to every view
app.use((req, res, next) => {
    // Before every route, we will attach a user to res.local
    res.locals.alerts = req.flash();
    res.locals.currentUser = req.user;
    // req.locals.cart = req.cart;
    next();
});


app.use('/',require('./controllers/index'))
app.use('/auth',require('./controllers/auth'))
app.use('/stories',require('./controllers/stories'))

const PORT = process.env.PORT || 4000

app.listen(PORT,()=>{
    console.log(`You are connected to PORT : ${PORT}`);
})