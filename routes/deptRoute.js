const express = require('express');

const router = express.Router();
const deptController = require('../controllers/deptController');

router.get('/', deptController.index);

module.exports = router;