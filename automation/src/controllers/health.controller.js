/**
 * Health Controller
 * Handles health check requests
 */

/**
 * Health check endpoint
 * @param {Object} req - Express request
 * @param {Object} res - Express response
 */
function check(req, res) {
  res.json({ status: 'OK', message: 'Jira AI Automation is running!' });
}

module.exports = {
  check,
};

