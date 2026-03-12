const axios = require('axios');
const config = require('../config');
const { parseFigmaUrl } = require('../utils/parsers');

/**
 * Figma API를 통해 파일 정보 가져오기
 * @param {string} fileKey - Figma 파일 키
 * @returns {Promise<Object>} Figma 파일 데이터
 */
async function getFigmaFile(fileKey) {
  try {
    const response = await axios.get(
      `${config.figma.apiBaseUrl}/files/${fileKey}`,
      {
        headers: {
          'X-Figma-Token': config.figma.token,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Figma 파일 가져오기 실패:', error.response?.data || error.message);
    throw error;
  }
}

/**
 * Figma API를 통해 특정 노드 정보 가져오기
 * @param {string} fileKey - Figma 파일 키
 * @param {string} nodeId - 노드 ID
 * @returns {Promise<Object>} 노드 데이터
 */
async function getFigmaNode(fileKey, nodeId) {
  try {
    const response = await axios.get(
      `${config.figma.apiBaseUrl}/files/${fileKey}/nodes?ids=${nodeId}`,
      {
        headers: {
          'X-Figma-Token': config.figma.token,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Figma 노드 가져오기 실패:', error.response?.data || error.message);
    throw error;
  }
}

/**
 * Figma URL에서 디자인 데이터 가져오기
 * @param {string} figmaUrl - Figma URL
 * @returns {Promise<Object>} 디자인 데이터
 */
async function getDesignFromUrl(figmaUrl) {
  try {
    console.log('📐 Figma 디자인 가져오기:', figmaUrl);
    
    const { fileKey, nodeId } = parseFigmaUrl(figmaUrl);
    
    if (!fileKey) {
      throw new Error('유효하지 않은 Figma URL입니다.');
    }
    
    // 전체 파일 정보 가져오기
    const fileData = await getFigmaFile(fileKey);
    
    // 특정 노드가 지정된 경우 해당 노드만 가져오기
    let nodeData = null;
    if (nodeId) {
      nodeData = await getFigmaNode(fileKey, nodeId);
    }
    
    console.log('✅ Figma 디자인 가져오기 성공');
    
    return {
      file: fileData,
      node: nodeData,
      fileKey,
      nodeId,
    };
  } catch (error) {
    console.error('❌ Figma 디자인 가져오기 실패:', error);
    throw error;
  }
}

module.exports = {
  getFigmaFile,
  getFigmaNode,
  getDesignFromUrl,
};

