const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { validateRequest } = require('../middleware/validation.middleware');

router.post('/login', validateRequest('login'), authController.login);
router.post('/register', validateRequest('register'), authController.register);
router.post('/refresh', authController.refreshToken);
router.post('/logout', authController.logout);

module.exports = router;
