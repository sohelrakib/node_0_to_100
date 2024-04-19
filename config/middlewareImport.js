// middleware.js
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const csrf = require('csurf');
const path = require('path');

const csrfProtection = csrf();

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 }
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
});

module.exports = app;
