const path = require('path');
const bodyParser = require('body-parser');
const sequelize = require('./utill/database');

const express = require('express');
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', 'views');

//importing the model, so table will be created automatically
const Dept = require('./models/dept');

const userRoute = require('./routes/userRoute');
const errorController = require('./controllers/errorController');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({
    extended: false
}));

app.get('/', (req, res, next) => {
    res.send('<html><h1>Hello World</h1></html>');
})

app.use('/user', userRoute);

app.use(errorController.pageNotFound);

// app.listen(PORT, () => {
//     console.log(`Listening on ${PORT} .. .. ..`);
// });


sequelize.sync({ force: true })
// sequelize.sync()
    .then( () => {
        // app.listen(3000);
        app.listen(PORT, () => {
            console.log(`Listening on ${PORT} .. .. ..`);
        });
    })
    .catch( err => console.log(err));