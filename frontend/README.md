# API Portal Frontend

Next.js 14 frontend application for API documentation portal.

## Getting Started

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3003](http://localhost:3003) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
frontend/
├── app/
│   ├── design/          # QuickStart Page (Figma-based)
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Home page
│   └── globals.css      # Global styles
├── components/          # Reusable components
├── public/              # Static assets
└── package.json
```

## Implementation Guidelines

1. **Figma = Source of Truth** - Do not redesign the UI
2. **Layout Hierarchy** - Follow Figma structure exactly
3. **Visual Fidelity** - Match colors, spacing, typography precisely
4. **Flag Ambiguity** - Do not invent patterns for unclear designs
5. **Separation** - Keep automation code separate from frontend code

## Routes

- `/` - Home page
- `/design` - QuickStart Page (API-33 implementation target)

## Tech Stack

- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS

