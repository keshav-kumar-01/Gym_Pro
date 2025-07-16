const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth.middleware');
const trainerController = require('../controllers/trainer.controller');

router.get('/', authenticate, trainerController.getAllTrainers);
router.get('/:id', authenticate, trainerController.getTrainerById);
router.post('/', authenticate, trainerController.createTrainer);
router.put('/:id', authenticate, trainerController.updateTrainer);
router.delete('/:id', authenticate, trainerController.deleteTrainer);

module.exports = router;
