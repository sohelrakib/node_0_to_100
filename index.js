// server.js
const app = require('./config/middlewareImport');
const { Dept, Admin, User } = require('./models/indexModel');
const { router } = require('./routes/indexRoute');
const sequelize = require('./utill/database');

const PORT = 3000;

app.use(router);

// sequelize.sync({ force: true })
sequelize.sync()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Listening on ${PORT} .. .. ..`);
        });
    })
    .catch(err => console.log(err));
