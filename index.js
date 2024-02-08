const express = require('express');
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', 'views');

const errorController = require('./controllers/errorController');

app.get('/', (req, res, next) => {
    res.send('<html><h1>Hello World</h1></html>');
})

app.use(errorController.pageNotFound);

app.listen(PORT, () => {
    console.log(`Listening on ${PORT} .. .. ..`);
});