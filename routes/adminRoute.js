const express = require('express');
const router = express.Router();

const isAlreadyLogin = require('../middleware/isAlreadyLogIn');

const adminController = require('../controllers/adminController');

router.get('/registration', isAlreadyLogin, adminController.registration);
router.post('/registration', isAlreadyLogin, adminController.postRegistration);

router.get('/login', isAlreadyLogin, adminController.login);
router.post('/login', isAlreadyLogin, adminController.postLogin);

router.post('/logout', adminController.postLogout);

module.exports = router;