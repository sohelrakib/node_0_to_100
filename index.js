// server.js
const app = require('./config/middlewareImport');
const { Dept, Admin, User } = require('./config/modelImports');
const { userRoute, deptRoute, adminRoute, errorController } = require('./config/routeImport');
const sequelize = require('./utill/database');

const PORT = 3000;

app.get('/', (req, res, next) => {
    res.redirect('/user');
});

app.use('/', adminRoute);
app.use('/user', userRoute);
app.use('/dept', deptRoute);
app.use(errorController.pageNotFound);

sequelize.sync({ force: true })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Listening on ${PORT} .. .. ..`);
        });
    })
    .catch(err => console.log(err));
