const express = require('express');

const router = express.Router();
const deptController = require('../controllers/deptController');

const isAuth = require('../middleware/isAuth');

router.get('/', isAuth, deptController.index);
router.get('/add', isAuth, deptController.add);
router.post('/add', isAuth, deptController.postAdd);
router.post('/delete', isAuth, deptController.deleteDept);
router.get('/edit/:id', isAuth, deptController.edit);
router.post('/edit', isAuth, deptController.update);

module.exports = router;