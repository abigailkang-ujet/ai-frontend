const express = require('express');
const webhookController = require('../controllers/webhook.controller');

const router = express.Router();

/**
 * POST /webhook/jira
 * Handle Jira webhook events
 */
router.post('/jira', webhookController.handleJiraWebhook);

module.exports = router;

