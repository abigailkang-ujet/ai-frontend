const express = require('express');
const webhookRoutes = require('./webhook.routes');
const healthRoutes = require('./health.routes');

const router = express.Router();

/**
 * Route Aggregator
 * Combines all route modules
 */

router.use('/webhook', webhookRoutes);
router.use('/health', healthRoutes);

module.exports = router;

