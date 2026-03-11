/**
 * GitHub Configuration
 */
module.exports = {
  token: process.env.GITHUB_TOKEN,
  owner: process.env.GITHUB_OWNER || 'abigailkang-ujet',
  repo: process.env.GITHUB_REPO || 'ai-frontend',
  apiBaseUrl: 'https://api.github.com',
};

