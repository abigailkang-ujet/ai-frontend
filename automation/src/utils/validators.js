/**
 * Validation Utilities
 */

/**
 * Validate Jira webhook payload
 * @param {Object} body - Request body
 * @returns {Object} { valid: boolean, error?: string }
 */
function validateJiraWebhook(body) {
  if (!body) {
    return { valid: false, error: 'No request body' };
  }

  if (!body.issue) {
    return { valid: false, error: 'No issue data' };
  }

  return { valid: true };
}

/**
 * Validate Figma URL
 * @param {string} url - Figma URL
 * @returns {boolean} True if valid
 */
function validateFigmaUrl(url) {
  if (!url) return false;
  const figmaRegex = /^https:\/\/(www\.)?figma\.com\/(file|design)\/[^\s]+$/;
  return figmaRegex.test(url);
}

/**
 * Validate GitHub configuration
 * @param {Object} config - GitHub config
 * @returns {Object} { valid: boolean, error?: string }
 */
function validateGitHubConfig(config) {
  if (!config.token) {
    return { valid: false, error: 'GITHUB_TOKEN is not set' };
  }
  if (!config.owner) {
    return { valid: false, error: 'GITHUB_OWNER is not set' };
  }
  if (!config.repo) {
    return { valid: false, error: 'GITHUB_REPO is not set' };
  }
  return { valid: true };
}

module.exports = {
  validateJiraWebhook,
  validateFigmaUrl,
  validateGitHubConfig,
};

