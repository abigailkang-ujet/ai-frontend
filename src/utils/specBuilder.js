/**
 * Spec Builder Utility
 * Generates implementation specification from Figma design data
 */

/**
 * Build implementation spec from Figma data
 * @param {Object} figmaData - Figma design data
 * @param {string} figmaUrl - Figma URL
 * @param {Object} jiraIssue - Jira issue data
 * @returns {Object} Implementation spec
 */
function buildImplementationSpec(figmaData, figmaUrl, jiraIssue) {
  const spec = {
    metadata: {
      jiraKey: jiraIssue.key,
      jiraSummary: jiraIssue.fields.summary,
      figmaUrl: figmaUrl,
      figmaFileName: figmaData.file?.name || 'Unknown',
      createdAt: new Date().toISOString(),
    },
    design: {
      source: 'Figma',
      url: figmaUrl,
      file: {
        name: figmaData.file?.name,
        lastModified: figmaData.file?.lastModified,
        version: figmaData.file?.version,
      },
      node: figmaData.node ? {
        id: figmaData.node.id,
        name: figmaData.node.name,
        type: figmaData.node.type,
      } : null,
    },
    requirements: {
      description: jiraIssue.fields.description || '',
      acceptanceCriteria: extractAcceptanceCriteria(jiraIssue.fields.description),
      labels: jiraIssue.fields.labels || [],
      priority: jiraIssue.fields.priority?.name || 'Medium',
    },
    implementation: {
      approach: 'AI-generated from Figma design',
      framework: detectFramework(jiraIssue),
      outputPath: 'generated-components/',
      notes: [
        'This is an AI-generated implementation spec',
        'Review the Figma design before implementing',
        'Ensure accessibility standards are met',
        'Follow existing code patterns in the repository',
      ],
    },
  };

  return spec;
}

/**
 * Extract acceptance criteria from Jira description
 * @param {string} description - Jira description text
 * @returns {Array<string>} Acceptance criteria
 */
function extractAcceptanceCriteria(description) {
  if (!description) return [];

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

    // Check if we're leaving the section
    if (inCriteriaSection && trimmed.startsWith('#')) {
      inCriteriaSection = false;
      continue;
    }

    // Extract criteria items
    if (inCriteriaSection) {
      if (trimmed.startsWith('-') || trimmed.startsWith('*') || trimmed.match(/^\d+\./)) {
        const criterion = trimmed.replace(/^[-*]\s*/, '').replace(/^\d+\.\s*/, '').trim();
        if (criterion) {
          criteria.push(criterion);
        }
      }
    }
  }

  return criteria;
}

/**
 * Detect framework from Jira issue
 * @param {Object} jiraIssue - Jira issue data
 * @returns {string} Framework name
 */
function detectFramework(jiraIssue) {
  const description = (jiraIssue.fields.description || '').toLowerCase();
  const labels = (jiraIssue.fields.labels || []).map(l => l.toLowerCase());

  if (description.includes('react') || labels.includes('react')) {
    return 'React';
  }
  if (description.includes('vue') || labels.includes('vue')) {
    return 'Vue';
  }
  if (description.includes('angular') || labels.includes('angular')) {
    return 'Angular';
  }
  if (description.includes('next') || labels.includes('nextjs')) {
    return 'Next.js';
  }

  return 'React'; // Default
}

/**
 * Generate spec as JSON string
 * @param {Object} spec - Implementation spec
 * @returns {string} JSON string
 */
function generateSpecJSON(spec) {
  return JSON.stringify(spec, null, 2);
}

/**
 * Generate spec as Markdown
 * @param {Object} spec - Implementation spec
 * @returns {string} Markdown string
 */
function generateSpecMarkdown(spec) {
  return `# Implementation Specification

## Metadata
- **Jira Key:** ${spec.metadata.jiraKey}
- **Summary:** ${spec.metadata.jiraSummary}
- **Created:** ${spec.metadata.createdAt}

## Design Source
- **Figma URL:** [${spec.design.file.name}](${spec.metadata.figmaUrl})
- **File:** ${spec.design.file.name}
- **Last Modified:** ${spec.design.file.lastModified || 'N/A'}

${spec.design.node ? `### Selected Node
- **Name:** ${spec.design.node.name}
- **Type:** ${spec.design.node.type}
- **ID:** ${spec.design.node.id}
` : ''}

## Requirements
${spec.requirements.description}

${spec.requirements.acceptanceCriteria.length > 0 ? `### Acceptance Criteria
${spec.requirements.acceptanceCriteria.map((c, i) => `${i + 1}. ${c}`).join('\n')}
` : ''}

### Labels
${spec.requirements.labels.join(', ') || 'None'}

### Priority
${spec.requirements.priority}

## Implementation
- **Framework:** ${spec.implementation.framework}
- **Output Path:** ${spec.implementation.outputPath}

### Notes
${spec.implementation.notes.map(n => `- ${n}`).join('\n')}
`;
}

module.exports = {
  buildImplementationSpec,
  generateSpecJSON,
  generateSpecMarkdown,
};

