/**
 * AI Task Generator Utility
 * Generates AI task markdown files for Augment
 */

/**
 * Generate AI task markdown
 * @param {Object} spec - Implementation spec
 * @param {Object} figmaData - Figma design data
 * @returns {string} AI task markdown
 */
function generateAITask(spec, figmaData) {
  const task = `# AI Code Generation Task

## 🎯 Objective
Generate ${spec.implementation.framework} component(s) based on the Figma design.

## 📋 Context

### Jira Ticket
- **Key:** ${spec.metadata.jiraKey}
- **Summary:** ${spec.metadata.jiraSummary}
- **Priority:** ${spec.requirements.priority}

### Design Source
- **Figma URL:** ${spec.metadata.figmaUrl}
- **File Name:** ${spec.design.file.name}
${spec.design.node ? `- **Selected Node:** ${spec.design.node.name} (${spec.design.node.type})` : ''}

## 📝 Requirements

${spec.requirements.description}

${spec.requirements.acceptanceCriteria.length > 0 ? `### Acceptance Criteria
${spec.requirements.acceptanceCriteria.map((c, i) => `${i + 1}. ${c}`).join('\n')}
` : ''}

## 🎨 Design Details

${generateDesignDetails(figmaData)}

## 🛠️ Implementation Guidelines

### Framework
- Use **${spec.implementation.framework}**
- Follow existing code patterns in the repository
- Use TypeScript if the project uses it

### Output Location
- Place generated files in: \`${spec.implementation.outputPath}\`

### Code Quality
- Ensure components are accessible (ARIA labels, semantic HTML)
- Follow responsive design principles
- Use existing design system/component library if available
- Add proper TypeScript types/PropTypes
- Include JSDoc comments for complex logic

### Styling
- Use existing CSS methodology (CSS Modules, Tailwind, styled-components, etc.)
- Match the Figma design as closely as possible
- Ensure responsive behavior for mobile/tablet/desktop

### Testing
- Do NOT generate test files (tests will be written separately)
- Ensure code is testable (pure functions, clear props)

## 🚫 What NOT to Generate

- Do NOT generate test files
- Do NOT generate storybook files
- Do NOT generate documentation files
- Do NOT modify existing components (only create new ones)

## ✅ Deliverables

Generate the following files:
1. Component file(s) (e.g., \`ComponentName.tsx\` or \`ComponentName.jsx\`)
2. Style file(s) if needed (e.g., \`ComponentName.module.css\`)
3. Index file for exports if creating multiple components

## 📌 Notes

${spec.implementation.notes.map(n => `- ${n}`).join('\n')}

---

**Generated:** ${spec.metadata.createdAt}
**Automation:** Jira AI Automation Bot
`;

  return task;
}

/**
 * Generate design details section from Figma data
 * @param {Object} figmaData - Figma design data
 * @returns {string} Design details markdown
 */
function generateDesignDetails(figmaData) {
  let details = '';

  if (figmaData.file) {
    details += `### File Information\n`;
    details += `- **Name:** ${figmaData.file.name}\n`;
    if (figmaData.file.lastModified) {
      details += `- **Last Modified:** ${figmaData.file.lastModified}\n`;
    }
    details += '\n';
  }

  if (figmaData.node) {
    details += `### Selected Node\n`;
    details += `- **Name:** ${figmaData.node.name}\n`;
    details += `- **Type:** ${figmaData.node.type}\n`;
    
    if (figmaData.node.absoluteBoundingBox) {
      const box = figmaData.node.absoluteBoundingBox;
      details += `- **Dimensions:** ${Math.round(box.width)}px × ${Math.round(box.height)}px\n`;
    }
    
    if (figmaData.node.backgroundColor) {
      details += `- **Background Color:** ${formatColor(figmaData.node.backgroundColor)}\n`;
    }
    
    details += '\n';
  }

  details += `### Design Analysis\n`;
  details += `Please analyze the Figma design and extract:\n`;
  details += `- Layout structure (flex, grid, positioning)\n`;
  details += `- Typography (font families, sizes, weights)\n`;
  details += `- Colors (background, text, borders)\n`;
  details += `- Spacing (margins, padding)\n`;
  details += `- Interactive elements (buttons, links, forms)\n`;
  details += `- Responsive behavior hints\n`;

  return details;
}

/**
 * Format Figma color object to CSS
 * @param {Object} color - Figma color object {r, g, b, a}
 * @returns {string} CSS color string
 */
function formatColor(color) {
  if (!color) return 'N/A';
  
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
 * Generate file name for AI task
 * @param {string} jiraKey - Jira issue key
 * @returns {string} File name
 */
function generateTaskFileName(jiraKey) {
  return `AI_TASK_${jiraKey}.md`;
}

module.exports = {
  generateAITask,
  generateTaskFileName,
};

