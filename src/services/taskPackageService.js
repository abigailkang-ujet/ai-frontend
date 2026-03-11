/**
 * Task Package Service
 * Generates AI task package markdown files for Augment
 */

/**
 * Generate task package markdown
 * @param {Object} spec - Implementation spec from specBuilderService
 * @param {string} figmaUrl - Figma URL
 * @param {string} issueKey - Jira issue key
 * @returns {string} Task package markdown
 */
function generateTaskPackage(spec, figmaUrl, issueKey) {
  const markdown = `# AI Implementation Task

## 📋 Jira Summary
**${issueKey}:** ${spec.summary}

## 🎨 Design Source
**Figma:** [View Design](${figmaUrl})

## 🎯 Target Route
\`${spec.targetRoute}\`

## 📦 Implementation Scope

### What to Build
Implement the UI component(s) based on the Figma design linked above.

### Framework
- Use **${spec.designSummary?.framework || 'React'}**
- Follow existing code patterns in the repository
- Use TypeScript if the project uses it

### Output Location
Place generated files in the appropriate directory based on the target route.

## ♻️ Reusable Components

${spec.reusableComponents && spec.reusableComponents.length > 0 ? 
`**Use these existing components:**
${spec.reusableComponents.map(c => `- \`${c}\``).join('\n')}

Do NOT recreate these components. Import and use them from the existing codebase.
` : 
`No specific reusable components identified. Check the codebase for existing UI components before creating new ones.
`}

## 🚫 Forbidden Changes

${spec.forbiddenChanges && spec.forbiddenChanges.length > 0 ?
`**DO NOT modify these files/components:**
${spec.forbiddenChanges.map(c => `- \`${c}\``).join('\n')}

These are critical parts of the system. Only create new files.
` :
`No specific forbidden changes identified. However, prefer creating new files over modifying existing ones unless explicitly required.
`}

## ✅ Acceptance Criteria

${spec.acceptanceCriteria && spec.acceptanceCriteria.length > 0 ?
spec.acceptanceCriteria.map((c, i) => `${i + 1}. ${c}`).join('\n') :
`1. Component matches the Figma design
2. Component is responsive (mobile, tablet, desktop)
3. Component is accessible (ARIA labels, semantic HTML)
4. Code follows existing patterns in the repository`}

## 📝 PR Summary Instructions

When creating the Pull Request, use this template:

\`\`\`
## Summary
Implements ${spec.summary} based on Figma design.

## Changes
- Created new component(s) for ${spec.targetRoute}
- Implemented UI matching Figma design: ${figmaUrl}

## Testing
- [ ] Component renders correctly
- [ ] Responsive design works on mobile/tablet/desktop
- [ ] Accessibility standards met
- [ ] No console errors or warnings

## Screenshots
[Add screenshots of the implemented component]

## Related
- Jira: ${issueKey}
- Figma: ${figmaUrl}
\`\`\`

## 🛠️ Implementation Guidelines

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

## 📊 Design Details

${spec.designSummary ? generateDesignDetails(spec.designSummary) : 'Design details not available. Please analyze the Figma file directly.'}

---

**Generated:** ${new Date().toISOString()}
**Automation:** Jira AI Automation Bot
`;

  return markdown;
}

/**
 * Generate design details section
 * @param {Object} designSummary - Design summary from spec
 * @returns {string} Design details markdown
 */
function generateDesignDetails(designSummary) {
  let details = '';

  if (designSummary.fileName) {
    details += `**File:** ${designSummary.fileName}\n\n`;
  }

  if (designSummary.dimensions) {
    details += `**Dimensions:** ${designSummary.dimensions.width}px × ${designSummary.dimensions.height}px\n\n`;
  }

  if (designSummary.colors && designSummary.colors.length > 0) {
    details += `**Colors:**\n`;
    designSummary.colors.forEach(color => {
      details += `- ${color.type}: \`${color.value}\`\n`;
    });
    details += '\n';
  }

  if (designSummary.typography && designSummary.typography.length > 0) {
    details += `**Typography:**\n`;
    designSummary.typography.forEach(typo => {
      if (typo.fontFamily) details += `- Font: ${typo.fontFamily}\n`;
      if (typo.fontSize) details += `- Size: ${typo.fontSize}px\n`;
      if (typo.fontWeight) details += `- Weight: ${typo.fontWeight}\n`;
    });
    details += '\n';
  }

  return details || 'Please analyze the Figma design for detailed specifications.';
}

/**
 * Generate file path for task package
 * @param {string} issueKey - Jira issue key
 * @returns {string} File path
 */
function generateTaskPackagePath(issueKey) {
  return `ai/tasks/${issueKey}.md`;
}

module.exports = {
  generateTaskPackage,
  generateTaskPackagePath,
};

