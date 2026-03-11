# Installation Guide

## Prerequisites

- Next.js 14+ with App Router
- React 18+
- TypeScript
- Tailwind CSS configured
- Lucide React icons

## Installation Steps

### 1. Install Dependencies

```bash
npm install lucide-react
# or
yarn add lucide-react
```

### 2. Copy Components

Copy all `.tsx` files from this directory to your Next.js project:

```
your-project/
├── app/
│   └── components/
│       ├── Header.tsx
│       ├── Sidebar.tsx
│       ├── QuickStartContent.tsx
│       └── InboundCalls.tsx
```

### 3. Tailwind Configuration

Ensure your `tailwind.config.js` includes the components directory:

```javascript
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  // ... rest of config
}
```

### 4. Usage Examples

#### Header Component

```tsx
import Header from '@/components/Header';

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}
```

#### Sidebar Component

```tsx
import Sidebar from '@/components/Sidebar';

export default function DocsLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar variant="default" />
      <main className="flex-1">{children}</main>
    </div>
  );
}
```

#### Quick Start Content

```tsx
import QuickStartContent from '@/components/QuickStartContent';

export default function QuickStartPage() {
  return <QuickStartContent />;
}
```

#### Inbound Calls Demo

```tsx
import InboundCalls from '@/components/InboundCalls';

export default function DemoPage() {
  return <InboundCalls />;
}
```

## Customization

All components accept a `className` prop for additional styling:

```tsx
<Header className="shadow-lg" />
<Sidebar className="bg-gray-50" variant="compact" />
```

## Notes

- Components use Tailwind CSS utility classes
- All components are client components (`'use client'`)
- Icons are from Lucide React
- Components are fully responsive
- TypeScript types are included

## Support

For issues or questions, refer to the Jira ticket: API-31

