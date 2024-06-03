require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-startergy');
const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser');
const db = require('./config/mongoose');
const expressLayouts = require('express-ejs-layouts');
const router = require('./routes');

const app = express();
const port = process.env.PORT || 9000;

mongoose.set('strictQuery', false);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
    name: 'MovieApp',
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store : MongoStore.create({
        mongoUrl : 'mongodb+srv://gangabalaji915:R7GvPp4IafBL3wag@cluster.970rxyv.mongodb.net/?retryWrites=true&w=majority',
        autoRemove : 'disabled'
    }, function(err){
        console.log(err || "Connection is fine");
    })
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use('/', router);

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(expressLayouts);
app.use(express.static('./assets'));

app.listen(port, function(err) {
    if(err) {
        console.log("Error: ", err);
        return;
    }
    console.log("Successfully running on port", port);
});
