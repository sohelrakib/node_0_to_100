// routeImports.js
const userRoute = require('../routes/userRoute');
const deptRoute = require('../routes/deptRoute');
const adminRoute = require('../routes/adminRoute');
const errorController = require('../controllers/errorController');

module.exports = { userRoute, deptRoute, adminRoute, errorController };
