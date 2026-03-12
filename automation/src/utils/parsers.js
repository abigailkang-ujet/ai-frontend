/**
 * Parsing Utilities
 */

/**
 * Extract Figma URL from text
 * @param {string} text - Text containing Figma URL
 * @returns {string|null} Figma URL or null
 */
function extractFigmaUrl(text) {
  const figmaRegex = /https:\/\/(www\.)?figma\.com\/(file|design)\/[^\s]+/g;
  const matches = text.match(figmaRegex);
  return matches ? matches[0] : null;
}

/**
 * Figma URL에서 파일 키와 노드 ID 추출
 * @param {string} url - Figma URL
 * @returns {Object} { fileKey, nodeId }
 */
function parseFigmaUrl(url) {
  try {
    // Figma URL 형식: https://www.figma.com/file/{fileKey}/{fileName}?node-id={nodeId}
    // 또는: https://www.figma.com/design/{fileKey}/{fileName}?node-id={nodeId}
    
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split('/');
    
    // fileKey는 /file/ 또는 /design/ 다음에 오는 부분
    let fileKey = null;
    const fileIndex = pathParts.indexOf('file');
    const designIndex = pathParts.indexOf('design');
    
    if (fileIndex !== -1 && pathParts[fileIndex + 1]) {
      fileKey = pathParts[fileIndex + 1];
    } else if (designIndex !== -1 && pathParts[designIndex + 1]) {
      fileKey = pathParts[designIndex + 1];
    }
    
    // node-id는 쿼리 파라미터에서 추출
    const nodeId = urlObj.searchParams.get('node-id');
    
    return { fileKey, nodeId };
  } catch (error) {
    console.error('Figma URL 파싱 실패:', error);
    return { fileKey: null, nodeId: null };
  }
}

/**
 * AI 응답에서 JSON 추출 및 파싱
 * @param {string} text - AI response text
 * @returns {Object} Parsed code object
 */
function parseAIResponse(text) {
  try {
    // JSON 코드 블록 찾기 (```json ... ```)
    const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[1]);
    }

    // 일반 JSON 찾기
    const jsonStart = text.indexOf('{');
    const jsonEnd = text.lastIndexOf('}');
    if (jsonStart !== -1 && jsonEnd !== -1) {
      return JSON.parse(text.substring(jsonStart, jsonEnd + 1));
    }

    // JSON 파싱 실패 시 기본 구조 반환
    return {
      componentCode: text,
      explanation: 'AI가 생성한 코드입니다.',
      fileName: 'Component.tsx',
    };
  } catch (error) {
    console.error('AI 응답 파싱 실패:', error);
    return {
      componentCode: text,
      explanation: 'AI 응답을 파싱할 수 없습니다.',
      fileName: 'Component.tsx',
    };
  }
}

module.exports = {
  extractFigmaUrl,
  parseFigmaUrl,
  parseAIResponse,
};

