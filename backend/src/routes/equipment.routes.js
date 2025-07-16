const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth.middleware');
const equipmentController = require('../controllers/equipment.controller');

router.get('/', authenticate, equipmentController.getAllEquipment);
router.get('/:id', authenticate, equipmentController.getEquipmentById);
router.post('/', authenticate, equipmentController.createEquipment);
router.put('/:id', authenticate, equipmentController.updateEquipment);
router.delete('/:id', authenticate, equipmentController.deleteEquipment);

module.exports = router;
