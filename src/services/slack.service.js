const axios = require('axios');
const config = require('../config');

/**
 * Slack Service
 * Handles all Slack API operations
 */

/**
 * Send notification to Slack
 * @param {string} issueKey - Jira issue key
 * @param {string} summary - Issue summary
 * @param {string} figmaUrl - Figma URL
 * @param {Object} figmaData - Figma data (optional)
 * @param {Object} automationResult - Automation result (optional)
 */
async function sendNotification(issueKey, summary, figmaUrl, figmaData = null, automationResult = null) {
  const { webhookUrl } = config.slack;

  if (!webhookUrl) {
    console.log('⚠️  Slack Webhook URL이 설정되지 않았습니다');
    return;
  }

  // Task package 생성 성공 시
  if (automationResult?.success) {
    const blocks = [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: '✅ AI Task Package Ready',
          emoji: true
        }
      },
      {
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: `*Issue:*\n${issueKey}`
          },
          {
            type: 'mrkdwn',
            text: `*Branch:*\n\`${automationResult.branchName}\``
          }
        ]
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*Summary:*\n${summary}`
        }
      }
    ];

    // Target route 추가
    if (automationResult.targetRoute) {
      blocks.push({
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*Target Route:*\n\`${automationResult.targetRoute}\``
        }
      });
    }

    // Figma 링크 추가
    blocks.push({
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*Figma Design:*\n<${figmaUrl}|View Design>`
      }
    });

    // 생성된 파일 목록
    blocks.push(
      {
        type: 'divider'
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: '*Files generated:*\n' + automationResult.files.map(f => `• \`${f}\``).join('\n')
        }
      }
    );

    // 다음 단계
    blocks.push(
      {
        type: 'divider'
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*Next step:*\nOpen the repository in VS Code and run Augment implementation.\n\n\`\`\`\ngit checkout ${automationResult.branchName}\n@augment ai/tasks/${issueKey}.md 파일을 읽고 구현해줘\n\`\`\``
        }
      },
      {
        type: 'context',
        elements: [
          {
            type: 'mrkdwn',
            text: '🤖 Jira AI Automation'
          }
        ]
      }
    );

    const message = {
      text: `✅ AI Task Package Ready: ${issueKey}`,
      blocks
    };

    try {
      await axios.post(webhookUrl, message);
      console.log('✅ Slack 알림 전송 완료!');
    } catch (error) {
      console.error('❌ Slack 알림 전송 실패:', error.message);
    }
    return;
  }

  // 실패 시 또는 기타 알림
  const blocks = [
    {
      type: 'header',
      text: {
        type: 'plain_text',
        text: '❌ AI Task Package Failed',
        emoji: true
      }
    },
    {
      type: 'section',
      fields: [
        {
          type: 'mrkdwn',
          text: `*Issue:*\n${issueKey}`
        },
        {
          type: 'mrkdwn',
          text: `*Summary:*\n${summary}`
        }
      ]
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: '*Error:*\nFailed to generate AI task package. Please check the logs.'
      }
    },
    {
      type: 'context',
      elements: [
        {
          type: 'mrkdwn',
          text: '🤖 Jira AI Automation'
        }
      ]
    }
  ];

  const message = {
    text: `❌ AI Task Package Failed: ${issueKey}`,
    blocks
  };

  try {
    await axios.post(webhookUrl, message);
    console.log('✅ Slack 알림 전송 완료!');
  } catch (error) {
    console.error('❌ Slack 알림 전송 실패:', error.message);
  }
}

module.exports = {
  sendNotification,
};

