const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth.middleware');
const classController = require('../controllers/class.controller');

router.get('/', authenticate, classController.getAllClasses);
router.get('/:id', authenticate, classController.getClassById);
router.post('/', authenticate, classController.createClass);
router.put('/:id', authenticate, classController.updateClass);
router.delete('/:id', authenticate, classController.deleteClass);

module.exports = router;
