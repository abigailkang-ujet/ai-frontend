/**
 * Configuration Aggregator
 * Exports all configuration modules
 */
module.exports = {
  server: require('./server'),
  jira: require('./jira'),
  figma: require('./figma'),
  github: require('./github'),
  slack: require('./slack'),
  ai: require('./ai'),
};

