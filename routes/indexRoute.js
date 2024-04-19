// routeImports.js
const userRoute = require('./userRoute');
const deptRoute = require('./deptRoute');
const adminRoute = require('./adminRoute');
const errorController = require('../controllers/errorController');


const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.redirect('/user');
});

router.use('/', adminRoute);
router.use('/user', userRoute);
router.use('/dept', deptRoute);
router.use(errorController.pageNotFound);

module.exports = { router };