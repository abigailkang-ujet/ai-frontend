const jiraService = require('../services/jira.service');
const figmaService = require('../services/figmaService');
const githubService = require('../services/githubService');
const slackService = require('../services/slack.service');
const specBuilderService = require('../services/specBuilderService');
const taskPackageService = require('../services/taskPackageService');
const { extractFigmaUrl } = require('../utils/parsers');

/**
 * Issue Automation Orchestrator
 * Coordinates the full automation workflow from Jira webhook to GitHub + notifications
 */

/**
 * Process Jira issue automation
 * @param {Object} webhookPayload - Jira webhook payload
 */
async function processIssueAutomation(webhookPayload) {
  console.log('\n🚀 Starting Issue Automation Orchestrator...');

  const issueKey = webhookPayload.issue.key;
  const summary = webhookPayload.issue.fields.summary;

  try {
    // Step 1: Receive Jira webhook payload (already done)
    console.log(`📨 Step 1: Received webhook for ${issueKey}`);

    // Step 2: Fetch full issue data from Jira
    console.log('📥 Step 2: Fetching full issue data from Jira...');
    const fullIssue = await jiraService.getIssue(issueKey);
    
    if (!fullIssue) {
      throw new Error('Failed to fetch full issue data from Jira');
    }

    // Step 3: Parse Jira description
    console.log('📝 Step 3: Parsing Jira description...');
    const description = fullIssue.fields.description || '';

    // Step 4: Extract Figma URL
    console.log('🔍 Step 4: Extracting Figma URL...');
    const figmaUrl = extractFigmaUrl(description);

    if (!figmaUrl) {
      throw new Error('No Figma URL found in issue description');
    }

    console.log(`✅ Found Figma URL: ${figmaUrl}`);

    // Step 5: Fetch Figma design data
    console.log('🎨 Step 5: Fetching Figma design data...');
    const figmaData = await figmaService.getDesignFromUrl(figmaUrl);

    if (!figmaData) {
      throw new Error('Failed to fetch Figma design data');
    }

    console.log(`✅ Fetched Figma file: ${figmaData.file.name}`);

    // Step 6: Generate implementation spec
    console.log('📋 Step 6: Generating implementation spec...');
    const spec = specBuilderService.buildImplementationSpec(
      fullIssue,
      description,
      figmaData,
      figmaUrl
    );

    console.log('✅ Implementation spec generated');

    // Step 7: Generate AI task package
    console.log('🤖 Step 7: Generating AI task package...');
    const taskPackage = taskPackageService.generateTaskPackage(spec, figmaUrl, issueKey);
    const specJSON = JSON.stringify(spec, null, 2);

    console.log('✅ AI task package generated');

    // Step 8: Create GitHub branch
    console.log('🌿 Step 8: Creating GitHub branch...');
    const branchName = `feat/${issueKey}-${Date.now()}`;
    const mainSHA = await githubService.getMainBranchSHA();
    await githubService.createBranch(branchName, mainSHA);

    console.log(`✅ Branch created: ${branchName}`);

    // Step 9: Commit spec and task files (multi-file commit)
    console.log('💾 Step 9: Committing spec and task files...');

    await githubService.commitMultipleFiles(
      branchName,
      [
        {
          path: `ai/specs/${issueKey}.json`,
          content: specJSON
        },
        {
          path: `ai/tasks/${issueKey}.md`,
          content: taskPackage
        }
      ],
      `feat(${issueKey}): Add AI task package\n\nGenerated from Figma design\nFigma: ${figmaUrl}\n\nThis package contains:\n- Implementation spec (JSON)\n- AI task instructions (Markdown)\n\nReady for Augment to implement in VS Code.`
    );

    console.log('✅ All files committed');

    // Step 10: Post Jira comment
    console.log('💬 Step 10: Posting Jira comment...');
    const jiraComment = `✅ AI 작업 패키지 생성 완료!

🎨 **Figma 디자인:** ${figmaData.file.name}
🔗 **Figma URL:** ${figmaUrl}

🌿 **GitHub Branch:** \`${branchName}\`
🎯 **Target Route:** \`${spec.targetRoute}\`

📁 **생성된 파일:**
- \`ai/specs/${issueKey}.json\` - 구현 스펙 (JSON)
- \`ai/tasks/${issueKey}.md\` - AI 작업 지시서 (Markdown)

🤖 **다음 단계:**
1. VS Code에서 브랜치 체크아웃: \`git checkout ${branchName}\`
2. Augment에게 작업 요청: \`@augment ai/tasks/${issueKey}.md 파일을 읽고 구현해줘\`
3. 생성된 코드 검토 및 테스트
4. Draft PR 생성 (자동) 또는 수동 PR 생성
5. 리뷰 후 머지

---
🤖 Automated by Jira AI Automation`;

    await jiraService.addComment(issueKey, jiraComment);

    console.log('✅ Jira comment posted');

    // Step 11: Send Slack notification
    console.log('📢 Step 11: Sending Slack notification...');
    await slackService.sendNotification(
      issueKey,
      summary,
      figmaUrl,
      figmaData,
      {
        success: true,
        branchName: branchName,
        targetRoute: spec.targetRoute,
        files: [
          `ai/specs/${issueKey}.json`,
          `ai/tasks/${issueKey}.md`
        ]
      }
    );

    console.log('✅ Slack notification sent');

    console.log('\n🎉 Issue Automation Complete!');
    console.log(`📊 Summary:`);
    console.log(`   - Issue: ${issueKey}`);
    console.log(`   - Branch: ${branchName}`);
    console.log(`   - Target Route: ${spec.targetRoute}`);
    console.log(`   - Files: 2 files committed`);

  } catch (error) {
    console.error('\n❌ Issue Automation Failed:', error.message);

    // Send failure notification
    await sendFailureNotification(issueKey, summary, error.message);
  }
}

/**
 * Send failure notification to Jira and Slack
 * @param {string} issueKey - Jira issue key
 * @param {string} summary - Issue summary
 * @param {string} errorMessage - Error message
 */
async function sendFailureNotification(issueKey, summary, errorMessage) {
  try {
    // Jira comment
    const jiraComment = `❌ AI 작업 준비 중 오류가 발생했습니다.

**오류 내용:**
${errorMessage}

**다음 단계:**
- 이슈 설명에 Figma URL이 포함되어 있는지 확인하세요
- Figma URL이 올바른지 확인하세요
- 필요시 수동으로 작업을 진행하세요

---
🤖 Automated by Jira AI Automation`;

    await jiraService.addComment(issueKey, jiraComment);

    // Slack notification
    await slackService.sendNotification(issueKey, summary, null, null, null);

  } catch (notificationError) {
    console.error('❌ Failed to send failure notification:', notificationError.message);
  }
}

module.exports = {
  processIssueAutomation,
};

