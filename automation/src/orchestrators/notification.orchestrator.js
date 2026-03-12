const jiraService = require('../services/jira.service');
const slackService = require('../services/slack.service');

/**
 * Notification Orchestrator
 * Coordinates notifications to Jira and Slack
 */

/**
 * Notify success: Send to both Jira and Slack
 * @param {string} issueKey - Jira issue key
 * @param {string} summary - Issue summary
 * @param {string} figmaUrl - Figma URL
 * @param {Object} figmaData - Figma data
 * @param {Object} automationResult - Automation result
 */
async function notifySuccess(issueKey, summary, figmaUrl, figmaData, automationResult) {
  // Jira comment
  const jiraComment = `✅ AI 코드 생성 완료!

📐 Figma: ${figmaData.file.name}
🔗 Figma URL: ${figmaUrl}

🎉 GitHub PR이 자동으로 생성되었습니다!
📝 PR: ${automationResult.pr.html_url}
🌿 Branch: ${automationResult.branchName}
📁 Files: ${automationResult.files.join(', ')}

👀 PR을 리뷰하고 머지해주세요!`;

  await jiraService.addComment(issueKey, jiraComment);

  // Slack notification
  await slackService.sendNotification(issueKey, summary, figmaUrl, figmaData, automationResult);
}

/**
 * Notify failure: Send to both Jira and Slack
 * @param {string} issueKey - Jira issue key
 * @param {string} summary - Issue summary
 * @param {string} figmaUrl - Figma URL
 * @param {Object} figmaData - Figma data (optional)
 * @param {string} errorMessage - Error message
 */
async function notifyFailure(issueKey, summary, figmaUrl, figmaData, errorMessage) {
  // Jira comment
  const jiraComment = `⚠️ AI 코드 생성 중 오류가 발생했습니다.

📐 Figma: ${figmaData?.file?.name || 'Unknown'}
🔗 Figma URL: ${figmaUrl}
❌ 오류: ${errorMessage}

수동으로 코드를 생성해주세요.`;

  await jiraService.addComment(issueKey, jiraComment);

  // Slack notification (without automation result = failure notification)
  await slackService.sendNotification(issueKey, summary, figmaUrl, figmaData, null);
}

module.exports = {
  notifySuccess,
  notifyFailure,
};

