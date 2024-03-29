const express = require('express');

const router = express.Router();
const deptController = require('../controllers/deptController');

router.get('/', deptController.index);
router.get('/add', deptController.add);
router.post('/add', deptController.postAdd);
router.post('/delete', deptController.deleteDept);

module.exports = router;