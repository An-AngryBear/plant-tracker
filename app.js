'use strict';

const express = require('express');
var helmet = require('helmet');
const app = express();
const passport = require('passport')
var session = require('express-session');
var methodOverride = require('method-override')
let bodyParser = require('body-parser');
const flash = require('express-flash');
let pg = require('pg');
var path = require('path');

require('dotenv').config();

// security
app.use(helmet());

// CSP
app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'unsafe-inline'", "'self'"],
        imgSrc: ['*'],
        connectSrc: ["'self'", 'ws:']
    }
}));

// CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//expands the type of methods a form can submit
app.use(methodOverride('_method'));

//settings
// app.set('models', require('./models'));

//access to client folder
app.use('/client', express.static(path.join(__dirname, 'client')));
app.use('/js', express.static(path.join(__dirname, 'client/dist/js')));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

let routes = require('./routes/');

//session persistence
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));

//authentication
require('./config/passport-strat.js');
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
});

//body parser
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(flash());

app.use(routes);

//error handling
app.use((req, res, next) => {
    let error = new Error('sorry, not found.');
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    console.log(err)
    res.status(err.status || 500);
    res.json({
        message: "A problem occurred.",
        err: err
    });
});

let server = app.listen(process.env.PORT || 3000);
console.log("server up")