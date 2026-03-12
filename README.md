# AI Frontend

Monorepo containing automation server and frontend application for API Portal.

## Project Structure

```
ai-frontend/
├── automation/          # Jira automation server
│   ├── src/            # Server source code
│   ├── package.json
│   └── .env            # Environment variables
│
├── frontend/           # Next.js frontend app
│   ├── app/           # Next.js App Router pages
│   ├── components/    # Reusable components
│   ├── package.json
│   └── README.md
│
└── ai/                # AI-generated task packages
    ├── specs/         # Implementation specs (JSON)
    └── tasks/         # Task instructions (Markdown)
```

## Getting Started

### 1. Automation Server

```bash
cd automation
npm install
npm start
```

Server runs on: http://localhost:3000

### 2. Frontend App

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on: http://localhost:3003

## Automation Workflow

1. **Jira Issue** → Status changed to "Ready for AI"
2. **Webhook** → Triggers automation server (via ngrok)
3. **Figma Data** → Fetches design from Figma API
4. **Spec Generation** → Creates `ai/specs/{ISSUE-KEY}.json`
5. **Task Generation** → Creates `ai/tasks/{ISSUE-KEY}.md`
6. **Git Branch** → Creates feature branch
7. **Git Commit** → Commits spec and task files
8. **Pull Request** → Creates Draft PR on GitHub
9. **Jira Comment** → Posts automation summary
10. **Slack Notification** → Notifies team with PR link

## Implementation Guidelines

- **Figma = Source of Truth** - Do not redesign UI
- **Layout Hierarchy** - Follow Figma structure exactly
- **Visual Fidelity** - Match colors, spacing, typography
- **Flag Ambiguity** - Do not invent patterns
- **Separation** - Keep automation and frontend code separate

## Tech Stack

### Automation Server
- Node.js + Express
- Jira API
- Figma API
- GitHub API
- Slack Webhooks

### Frontend App
- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS