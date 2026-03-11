const axios = require('axios');
const config = require('../config');

/**
 * GitHub Service
 * Handles all GitHub API operations
 */

/**
 * GitHub API 헤더
 */
function getHeaders() {
  return {
    'Authorization': `token ${config.github.token}`,
    'Accept': 'application/vnd.github.v3+json',
    'Content-Type': 'application/json',
  };
}

/**
 * 메인 브랜치의 최신 SHA 가져오기
 */
async function getMainBranchSHA() {
  const url = `${config.github.apiBaseUrl}/repos/${config.github.owner}/${config.github.repo}/git/refs/heads/main`;
  const response = await axios.get(url, { headers: getHeaders() });
  return response.data.object.sha;
}

/**
 * 브랜치 존재 여부 확인
 */
async function branchExists(branchName) {
  try {
    const url = `${config.github.apiBaseUrl}/repos/${config.github.owner}/${config.github.repo}/git/refs/heads/${branchName}`;
    await axios.get(url, { headers: getHeaders() });
    return true;
  } catch (error) {
    if (error.response?.status === 404) {
      return false;
    }
    throw error;
  }
}

/**
 * 새 브랜치 생성
 */
async function createBranch(branchName, sha) {
  // 브랜치가 이미 존재하는지 확인
  const exists = await branchExists(branchName);
  if (exists) {
    console.log(`⚠️  브랜치가 이미 존재합니다: ${branchName}`);
    return;
  }

  const url = `${config.github.apiBaseUrl}/repos/${config.github.owner}/${config.github.repo}/git/refs`;
  await axios.post(
    url,
    {
      ref: `refs/heads/${branchName}`,
      sha: sha,
    },
    { headers: getHeaders() }
  );
  console.log(`✅ 브랜치 생성: ${branchName}`);
}

/**
 * 파일 생성/업데이트
 */
async function createOrUpdateFile(branchName, filePath, content, message) {
  const url = `${config.github.apiBaseUrl}/repos/${config.github.owner}/${config.github.repo}/contents/${filePath}`;

  // 기존 파일 확인
  let sha = null;
  try {
    const response = await axios.get(url, {
      headers: getHeaders(),
      params: { ref: branchName }
    });
    sha = response.data.sha;
  } catch (error) {
    // 파일이 없으면 새로 생성
  }

  // 파일 생성/업데이트
  await axios.put(
    url,
    {
      message: message,
      content: Buffer.from(content).toString('base64'),
      branch: branchName,
      ...(sha && { sha }),
    },
    { headers: getHeaders() }
  );

  console.log(`✅ 파일 ${sha ? '업데이트' : '생성'}: ${filePath}`);
}

/**
 * 여러 파일을 한 번에 커밋
 * @param {string} branchName - 브랜치 이름
 * @param {Array<{path: string, content: string}>} files - 파일 배열
 * @param {string} message - 커밋 메시지
 */
async function commitMultipleFiles(branchName, files, message) {
  console.log(`📦 커밋 준비: ${files.length}개 파일`);

  // Get the current commit SHA
  const refUrl = `${config.github.apiBaseUrl}/repos/${config.github.owner}/${config.github.repo}/git/refs/heads/${branchName}`;
  const refResponse = await axios.get(refUrl, { headers: getHeaders() });
  const currentCommitSha = refResponse.data.object.sha;

  // Get the tree SHA from the current commit
  const commitUrl = `${config.github.apiBaseUrl}/repos/${config.github.owner}/${config.github.repo}/git/commits/${currentCommitSha}`;
  const commitResponse = await axios.get(commitUrl, { headers: getHeaders() });
  const baseTreeSha = commitResponse.data.tree.sha;

  // Create blobs for each file
  const tree = [];
  for (const file of files) {
    const blobUrl = `${config.github.apiBaseUrl}/repos/${config.github.owner}/${config.github.repo}/git/blobs`;
    const blobResponse = await axios.post(
      blobUrl,
      {
        content: file.content,
        encoding: 'utf-8',
      },
      { headers: getHeaders() }
    );

    tree.push({
      path: file.path,
      mode: '100644',
      type: 'blob',
      sha: blobResponse.data.sha,
    });
  }

  // Create a new tree
  const treeUrl = `${config.github.apiBaseUrl}/repos/${config.github.owner}/${config.github.repo}/git/trees`;
  const treeResponse = await axios.post(
    treeUrl,
    {
      base_tree: baseTreeSha,
      tree: tree,
    },
    { headers: getHeaders() }
  );

  // Create a new commit
  const newCommitUrl = `${config.github.apiBaseUrl}/repos/${config.github.owner}/${config.github.repo}/git/commits`;
  const newCommitResponse = await axios.post(
    newCommitUrl,
    {
      message: message,
      tree: treeResponse.data.sha,
      parents: [currentCommitSha],
    },
    { headers: getHeaders() }
  );

  // Update the reference
  await axios.patch(
    refUrl,
    {
      sha: newCommitResponse.data.sha,
    },
    { headers: getHeaders() }
  );

  console.log(`✅ ${files.length}개 파일 커밋 완료`);
  files.forEach(f => console.log(`   - ${f.path}`));
}

/**
 * Pull Request 생성
 * @param {string} branchName - 브랜치 이름
 * @param {string} title - PR 제목
 * @param {string} body - PR 본문
 * @param {Object} options - 추가 옵션
 * @param {boolean} options.draft - Draft PR 여부 (기본값: true)
 * @param {Array<string>} options.reviewers - 리뷰어 목록
 * @param {Array<string>} options.labels - 라벨 목록
 * @returns {Object} PR 데이터
 */
async function createPullRequest(branchName, title, body, options = {}) {
  const {
    draft = true,  // 기본값을 Draft PR로 변경
    reviewers = [],
    labels = [],
  } = options;

  // PR 생성
  const url = `${config.github.apiBaseUrl}/repos/${config.github.owner}/${config.github.repo}/pulls`;
  const response = await axios.post(
    url,
    {
      title: title,
      head: branchName,
      base: 'main',
      body: body,
      draft: draft,
    },
    { headers: getHeaders() }
  );

  const prNumber = response.data.number;
  const prUrl = response.data.html_url;

  console.log(`✅ ${draft ? 'Draft ' : ''}PR 생성: ${prUrl}`);

  // 리뷰어 추가
  if (reviewers.length > 0) {
    try {
      await addReviewers(prNumber, reviewers);
    } catch (error) {
      console.error('⚠️  리뷰어 추가 실패:', error.message);
    }
  }

  // 라벨 추가
  if (labels.length > 0) {
    try {
      await addLabels(prNumber, labels);
    } catch (error) {
      console.error('⚠️  라벨 추가 실패:', error.message);
    }
  }

  return response.data;
}

/**
 * PR에 리뷰어 추가
 * @param {number} prNumber - PR 번호
 * @param {Array<string>} reviewers - 리뷰어 GitHub 사용자명 목록
 */
async function addReviewers(prNumber, reviewers) {
  const url = `${config.github.apiBaseUrl}/repos/${config.github.owner}/${config.github.repo}/pulls/${prNumber}/requested_reviewers`;
  await axios.post(
    url,
    {
      reviewers: reviewers,
    },
    { headers: getHeaders() }
  );
  console.log(`✅ 리뷰어 추가: ${reviewers.join(', ')}`);
}

/**
 * PR에 라벨 추가
 * @param {number} prNumber - PR 번호
 * @param {Array<string>} labels - 라벨 목록
 */
async function addLabels(prNumber, labels) {
  const url = `${config.github.apiBaseUrl}/repos/${config.github.owner}/${config.github.repo}/issues/${prNumber}/labels`;
  await axios.post(
    url,
    {
      labels: labels,
    },
    { headers: getHeaders() }
  );
  console.log(`✅ 라벨 추가: ${labels.join(', ')}`);
}

/**
 * GitHub Issue 생성
 */
async function createIssue(issueKey, summary, figmaUrl, figmaData = null) {
  if (!config.github.token || !config.github.owner || !config.github.repo) {
    console.log('⚠️  GitHub 설정이 완료되지 않았습니다');
    return null;
  }

  const issueTitle = `[${issueKey}] ${summary}`;
  const issueBody = `
## 🎨 Figma 디자인 → 코드 생성 요청

### Jira 티켓
- **Key:** ${issueKey}
- **Summary:** ${summary}

### Figma 디자인
- **URL:** ${figmaUrl}
${figmaData?.file?.name ? `- **파일명:** ${figmaData.file.name}` : ''}

### 📝 작업 내용
Augment가 Figma 디자인을 보고 코드를 생성할 예정입니다.

---
### 🤖 다음 단계:
1. Figma 디자인 확인
2. Augment에게 코드 생성 요청: "@augment 이 이슈 코드 생성해줘"
3. 생성된 코드 리뷰
4. PR 생성 및 머지

---
🐱 Created by The Grumpy Cat
  `.trim();

  try {
    const url = `${config.github.apiBaseUrl}/repos/${config.github.owner}/${config.github.repo}/issues`;
    const issueResponse = await axios.post(
      url,
      {
        title: issueTitle,
        body: issueBody,
        labels: ['figma-design', 'ai-generated', issueKey]
      },
      { headers: getHeaders() }
    );

    const issueUrl = issueResponse.data.html_url;
    console.log(`✅ GitHub Issue created: ${issueUrl}`);

    return issueUrl;

  } catch (error) {
    console.error('❌ GitHub Issue 생성 실패:', error.response?.data || error.message);
    return null;
  }
}

module.exports = {
  getMainBranchSHA,
  branchExists,
  createBranch,
  createOrUpdateFile,
  commitMultipleFiles,
  createPullRequest,
  addReviewers,
  addLabels,
  createIssue,
};

