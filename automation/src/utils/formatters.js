/**
 * Formatting Utilities
 */

/**
 * Figma 데이터를 AI가 이해하기 쉬운 텍스트로 변환
 * @param {Object} figmaData - Figma design data
 * @returns {string} Formatted description
 */
function formatFigmaDataForAI(figmaData) {
  if (!figmaData || !figmaData.document) {
    return 'No design data available';
  }

  const { name, document } = figmaData;
  let description = `File Name: ${name}\n\n`;

  // 페이지와 프레임 정보 추출
  if (document.children) {
    document.children.forEach((page) => {
      description += `Page: ${page.name}\n`;
      if (page.children) {
        page.children.forEach((frame) => {
          description += formatNode(frame, 1);
        });
      }
    });
  }

  return description;
}

/**
 * Figma 노드를 재귀적으로 텍스트로 변환
 * @param {Object} node - Figma node
 * @param {number} depth - Current depth
 * @returns {string} Formatted node text
 */
function formatNode(node, depth = 0) {
  const indent = '  '.repeat(depth);
  let text = `${indent}- ${node.type}: ${node.name}\n`;

  // 스타일 정보 추가
  if (node.backgroundColor) {
    text += `${indent}  Background: rgba(${Object.values(node.backgroundColor).join(', ')})\n`;
  }
  if (node.fills && node.fills.length > 0) {
    text += `${indent}  Fills: ${JSON.stringify(node.fills[0])}\n`;
  }
  if (node.strokes && node.strokes.length > 0) {
    text += `${indent}  Strokes: ${JSON.stringify(node.strokes[0])}\n`;
  }

  // 텍스트 정보
  if (node.type === 'TEXT' && node.characters) {
    text += `${indent}  Text: "${node.characters}"\n`;
    if (node.style) {
      text += `${indent}  Font: ${node.style.fontFamily} ${node.style.fontSize}px\n`;
    }
  }

  // 자식 노드 재귀 처리 (최대 3 depth까지만)
  if (node.children && depth < 3) {
    node.children.forEach((child) => {
      text += formatNode(child, depth + 1);
    });
  }

  return text;
}

module.exports = {
  formatFigmaDataForAI,
  formatNode,
};

