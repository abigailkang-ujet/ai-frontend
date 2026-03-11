const { validateJiraWebhook } = require('../utils/validators');
const issueAutomationOrchestrator = require('../orchestrators/issueAutomationOrchestrator');

/**
 * Webhook Controller
 * Handles HTTP requests for webhooks
 */

/**
 * Handle Jira webhook
 * @param {Object} req - Express request
 * @param {Object} res - Express response
 */
async function handleJiraWebhook(req, res) {
  try {
    console.log('📨 Jira Webhook 받음!');
    console.log(JSON.stringify(req.body, null, 2));

    // Validate request
    const validation = validateJiraWebhook(req.body);
    if (!validation.valid) {
      return res.status(400).send(validation.error);
    }

    const issue = req.body.issue;
    const issueKey = issue.key;
    const summary = issue.fields.summary;
    const labels = issue.fields.labels || [];

    console.log(`\n🎫 Issue: ${issueKey}`);
    console.log(`📝 Summary: ${summary}`);
    console.log(`🏷️  Labels: ${labels.join(', ')}`);

    // Start issue automation (async, don't wait)
    issueAutomationOrchestrator.processIssueAutomation(req.body);

    // Respond immediately
    res.status(200).send('OK');
  } catch (error) {
    console.error('❌ Error:', error.message);
    res.status(500).send('Error processing webhook');
  }
}

module.exports = {
  handleJiraWebhook,
};

