/**
 * Spec Builder Service
 * Builds implementation specification objects using deterministic logic
 * NO LLM calls - pure data transformation
 */

/**
 * Build implementation specification
 * @param {Object} jiraIssue - Full Jira issue data
 * @param {string} parsedDescription - Parsed description text
 * @param {Object} figmaData - Figma design data
 * @param {string} figmaUrl - Figma URL
 * @returns {Object} Implementation specification
 */
function buildImplementationSpec(jiraIssue, parsedDescription, figmaData, figmaUrl) {
  const issueKey = jiraIssue.key;
  const summary = jiraIssue.fields.summary;

  return {
    issueKey,
    summary,
    figmaUrl,
    targetRoute: extractTargetRoute(parsedDescription, summary),
    branchName: generateBranchName(issueKey),
    reusableComponents: extractReusableComponents(parsedDescription),
    forbiddenChanges: extractForbiddenChanges(parsedDescription),
    acceptanceCriteria: extractAcceptanceCriteria(parsedDescription),
    designSummary: buildDesignSummary(figmaData),
  };
}

/**
 * Extract target route from description or summary
 * @param {string} description - Issue description
 * @param {string} summary - Issue summary
 * @returns {string} Target route
 */
function extractTargetRoute(description, summary) {
  // Look for route patterns in description
  const routePatterns = [
    /route:\s*([^\s\n]+)/i,
    /path:\s*([^\s\n]+)/i,
    /url:\s*([^\s\n]+)/i,
    /\/[a-z0-9\-\/]+/g, // Match paths like /dashboard/settings
  ];

  for (const pattern of routePatterns) {
    const match = description.match(pattern);
    if (match) {
      return match[1] || match[0];
    }
  }

  // Fallback: generate from summary
  const cleanSummary = summary
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '-');

  return `/${cleanSummary}`;
}

/**
 * Generate branch name from issue key
 * @param {string} issueKey - Jira issue key
 * @returns {string} Branch name
 */
function generateBranchName(issueKey) {
  const timestamp = Date.now();
  return `feat/${issueKey}-${timestamp}`;
}

/**
 * Extract reusable components from description
 * @param {string} description - Issue description
 * @returns {Array<string>} List of reusable components
 */
function extractReusableComponents(description) {
  const components = [];

  // Look for component mentions
  const componentPatterns = [
    /reuse:\s*([^\n]+)/i,
    /components?:\s*([^\n]+)/i,
    /use existing:\s*([^\n]+)/i,
  ];

  for (const pattern of componentPatterns) {
    const match = description.match(pattern);
    if (match) {
      // Split by comma or semicolon
      const items = match[1].split(/[,;]/).map(item => item.trim()).filter(Boolean);
      components.push(...items);
    }
  }

  // Look for common component names
  const commonComponents = [
    'Button',
    'Input',
    'Card',
    'Modal',
    'Dropdown',
    'Table',
    'Form',
    'Header',
    'Footer',
    'Sidebar',
    'Navigation',
    'Avatar',
    'Badge',
    'Alert',
    'Tooltip',
  ];

  for (const component of commonComponents) {
    const regex = new RegExp(`\\b${component}\\b`, 'i');
    if (regex.test(description) && !components.includes(component)) {
      components.push(component);
    }
  }

  return [...new Set(components)]; // Remove duplicates
}

/**
 * Extract forbidden changes from description
 * @param {string} description - Issue description
 * @returns {Array<string>} List of forbidden changes
 */
function extractForbiddenChanges(description) {
  const forbidden = [];

  // Look for forbidden patterns
  const forbiddenPatterns = [
    /do not (change|modify|update|touch):\s*([^\n]+)/gi,
    /forbidden:\s*([^\n]+)/gi,
    /keep existing:\s*([^\n]+)/gi,
    /don't (change|modify|update|touch):\s*([^\n]+)/gi,
  ];

  for (const pattern of forbiddenPatterns) {
    let match;
    while ((match = pattern.exec(description)) !== null) {
      const items = match[2] || match[1];
      if (items) {
        forbidden.push(...items.split(/[,;]/).map(item => item.trim()).filter(Boolean));
      }
    }
  }

  return [...new Set(forbidden)]; // Remove duplicates
}

/**
 * Extract acceptance criteria from description
 * @param {string} description - Issue description
 * @returns {Array<string>} Acceptance criteria
 */
function extractAcceptanceCriteria(description) {
  const criteria = [];
  const lines = description.split('\n');
  let inCriteriaSection = false;

  for (const line of lines) {
    const trimmed = line.trim();

    // Check if we're entering acceptance criteria section
    if (trimmed.toLowerCase().includes('acceptance criteria')) {
      inCriteriaSection = true;
      continue;
    }

    // Check if we're leaving the section (new heading)
    if (inCriteriaSection && trimmed.match(/^#{1,6}\s/)) {
      inCriteriaSection = false;
      continue;
    }

    // Extract criteria items
    if (inCriteriaSection) {
      if (trimmed.startsWith('-') || trimmed.startsWith('*') || trimmed.match(/^\d+\./)) {
        const criterion = trimmed
          .replace(/^[-*]\s*/, '')
          .replace(/^\d+\.\s*/, '')
          .trim();
        if (criterion) {
          criteria.push(criterion);
        }
      }
    }
  }

  return criteria;
}

/**
 * Build design summary from Figma data
 * @param {Object} figmaData - Figma design data
 * @returns {Object} Design summary
 */
function buildDesignSummary(figmaData) {
  const summary = {
    fileName: figmaData.file?.name || 'Unknown',
    fileKey: figmaData.file?.key || null,
    lastModified: figmaData.file?.lastModified || null,
    version: figmaData.file?.version || null,
    node: null,
    dimensions: null,
    colors: [],
    typography: [],
    components: [],
  };

  // Extract node information if available
  if (figmaData.node) {
    summary.node = {
      id: figmaData.node.id,
      name: figmaData.node.name,
      type: figmaData.node.type,
    };

    // Extract dimensions
    if (figmaData.node.absoluteBoundingBox) {
      const box = figmaData.node.absoluteBoundingBox;
      summary.dimensions = {
        width: Math.round(box.width),
        height: Math.round(box.height),
      };
    }

    // Extract colors
    if (figmaData.node.backgroundColor) {
      summary.colors.push({
        type: 'background',
        value: formatColor(figmaData.node.backgroundColor),
      });
    }

    // Extract fills
    if (figmaData.node.fills && Array.isArray(figmaData.node.fills)) {
      figmaData.node.fills.forEach((fill, index) => {
        if (fill.type === 'SOLID' && fill.color) {
          summary.colors.push({
            type: 'fill',
            value: formatColor(fill.color),
          });
        }
      });
    }

    // Extract strokes
    if (figmaData.node.strokes && Array.isArray(figmaData.node.strokes)) {
      figmaData.node.strokes.forEach((stroke, index) => {
        if (stroke.type === 'SOLID' && stroke.color) {
          summary.colors.push({
            type: 'stroke',
            value: formatColor(stroke.color),
          });
        }
      });
    }

    // Extract typography
    if (figmaData.node.style) {
      const style = figmaData.node.style;
      summary.typography.push({
        fontFamily: style.fontFamily || null,
        fontSize: style.fontSize || null,
        fontWeight: style.fontWeight || null,
        lineHeight: style.lineHeightPx || null,
        letterSpacing: style.letterSpacing || null,
      });
    }

    // Extract child components recursively
    if (figmaData.node.children) {
      summary.components = extractComponentNames(figmaData.node.children);
    }
  }

  return summary;
}

/**
 * Format Figma color object to CSS
 * @param {Object} color - Figma color {r, g, b, a}
 * @returns {string} CSS color string
 */
function formatColor(color) {
  if (!color) return null;

  const r = Math.round(color.r * 255);
  const g = Math.round(color.g * 255);
  const b = Math.round(color.b * 255);
  const a = color.a !== undefined ? color.a : 1;

  if (a === 1) {
    return `rgb(${r}, ${g}, ${b})`;
  }
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

/**
 * Extract component names from Figma children
 * @param {Array} children - Figma node children
 * @returns {Array<string>} Component names
 */
function extractComponentNames(children) {
  const names = [];

  function traverse(nodes) {
    if (!Array.isArray(nodes)) return;

    for (const node of nodes) {
      if (node.name) {
        names.push(node.name);
      }
      if (node.children) {
        traverse(node.children);
      }
    }
  }

  traverse(children);
  return names;
}

module.exports = {
  buildImplementationSpec,
};

