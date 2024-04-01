const path = require('path');
const bodyParser = require('body-parser');
const sequelize = require('./utill/database');
const session = require('express-session');
const flash = require('connect-flash');
const csrf = require('csurf');

const express = require('express');
const csrfProtection = csrf();
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', 'views');

//importing the model, so table will be created/migrated automatically
const Dept = require('./models/dept');
const Admin = require('./models/admin');

// ** routes **
const userRoute = require('./routes/userRoute');
const deptRoute = require('./routes/deptRoute');
const adminRoute = require('./routes/adminRoute');
const errorController = require('./controllers/errorController');
// ** end of routes **

app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false
}));

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
});

app.get('/', (req, res, next) => {
    // res.send('<html><h1>Hello World</h1></html>');
    res.redirect('/user');
})

app.use('/', adminRoute);
app.use('/user', userRoute);
app.use('/dept', deptRoute);
app.use(errorController.pageNotFound);

// app.listen(PORT, () => {
//     console.log(`Listening on ${PORT} .. .. ..`);
// });


// sequelize.sync({ force: true })
sequelize.sync()
    .then( () => {
        // app.listen(3000);
        app.listen(PORT, () => {
            console.log(`Listening on ${PORT} .. .. ..`);
        });
    })
    .catch( err => console.log(err));