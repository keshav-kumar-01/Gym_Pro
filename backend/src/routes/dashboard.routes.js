const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth.middleware');
const dashboardController = require('../controllers/dashboard.controller');

router.get('/stats', authenticate, dashboardController.getDashboardStats);
router.get('/membership-growth', authenticate, dashboardController.getMembershipGrowth);
router.get('/class-attendance', authenticate, dashboardController.getClassAttendance);

module.exports = router;
