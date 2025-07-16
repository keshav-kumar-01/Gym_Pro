const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth.middleware');
const settingsController = require('../controllers/settings.controller');

router.get('/', authenticate, settingsController.getAllSettings);
router.put('/', authenticate, settingsController.updateSettings);
router.get('/branding', authenticate, settingsController.getGymBranding);
router.put('/branding', authenticate, settingsController.updateGymBranding);

module.exports = router;
