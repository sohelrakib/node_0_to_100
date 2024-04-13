const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');

// router.get('/login', authController.getLogin);
// router.post('/login', authController.postLogin);
// router.post('/logout', authController.postLogout);

router.get('/registration', adminController.registration);
router.post('/registration', adminController.postRegistration);

router.get('/login', adminController.login);

module.exports = router;