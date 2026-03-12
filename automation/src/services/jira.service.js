const axios = require('axios');
const config = require('../config');

/**
 * Jira Service
 * Handles all Jira API operations
 */

/**
 * Get full issue data from Jira
 * @param {string} issueKey - Jira issue key
 * @returns {Object} Full issue data
 */
async function getIssue(issueKey) {
  const { baseUrl, email, apiToken } = config.jira;

  if (!baseUrl || !email || !apiToken) {
    console.log('⚠️  Jira 설정이 완료되지 않았습니다');
    return null;
  }

  const auth = Buffer.from(`${email}:${apiToken}`).toString('base64');

  try {
    const issueUrl = `${baseUrl}/rest/api/3/issue/${issueKey}`;
    const response = await axios.get(issueUrl, {
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json'
      }
    });

    console.log(`✅ Jira 이슈 ${issueKey} 데이터 가져오기 완료!`);
    return response.data;
  } catch (error) {
    console.error('❌ Jira 이슈 가져오기 실패:', error.response?.data || error.message);
    return null;
  }
}

/**
 * Add comment to Jira ticket
 * @param {string} issueKey - Jira issue key
 * @param {string} comment - Comment text
 */
async function addComment(issueKey, comment) {
  const { baseUrl, email, apiToken } = config.jira;

  if (!baseUrl || !email || !apiToken) {
    console.log('⚠️  Jira 설정이 완료되지 않았습니다');
    return;
  }

  // Jira API 인증 (Basic Auth)
  const auth = Buffer.from(`${email}:${apiToken}`).toString('base64');

  try {
    const commentUrl = `${baseUrl}/rest/api/3/issue/${issueKey}/comment`;
    await axios.post(
      commentUrl,
      {
        body: {
          type: 'doc',
          version: 1,
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: comment
                }
              ]
            }
          ]
        }
      },
      {
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log(`✅ Jira 티켓 ${issueKey}에 코멘트 추가 완료!`);
  } catch (error) {
    console.error('❌ Jira 업데이트 실패:', error.response?.data || error.message);
  }
}

/**
 * Update Jira ticket status
 * @param {string} issueKey - Jira issue key
 * @param {string} transitionId - Transition ID
 */
async function updateStatus(issueKey, transitionId) {
  const { baseUrl, email, apiToken } = config.jira;

  if (!baseUrl || !email || !apiToken) {
    console.log('⚠️  Jira 설정이 완료되지 않았습니다');
    return;
  }

  const auth = Buffer.from(`${email}:${apiToken}`).toString('base64');

  try {
    const transitionUrl = `${baseUrl}/rest/api/3/issue/${issueKey}/transitions`;
    await axios.post(
      transitionUrl,
      {
        transition: {
          id: transitionId
        }
      },
      {
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log(`✅ Jira 티켓 ${issueKey} 상태 업데이트 완료!`);
  } catch (error) {
    console.error('❌ Jira 상태 업데이트 실패:', error.response?.data || error.message);
  }
}

module.exports = {
  getIssue,
  addComment,
  updateStatus,
};

