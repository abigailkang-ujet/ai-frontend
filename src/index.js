require('dotenv').config();
const express = require('express');
const config = require('./config');
const routes = require('./routes');

/**
 * Jira AI Automation Server
 * Main entry point
 */

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/', routes);

// Start server
app.listen(config.server.port, () => {
  console.log(`\n🚀 Server is running on http://localhost:${config.server.port}`);
  console.log(`📍 Webhook endpoint: http://localhost:${config.server.port}/webhook/jira`);
  console.log(`💚 Health check: http://localhost:${config.server.port}/health\n`);
});