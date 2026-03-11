'use client';

import React from 'react';
import { Copy, Check, Terminal, Code2, Zap } from 'lucide-react';

interface QuickStartContentProps {
  className?: string;
}

/**
 * QuickStartContent Component
 * 
 * Quick start guide content for the UJET Developer Portal.
 * Provides step-by-step instructions for getting started with the API.
 * 
 * Based on Figma design: node-id=278-6039
 * 
 * @component
 */
export default function QuickStartContent({ className = '' }: QuickStartContentProps) {
  const [copiedIndex, setCopiedIndex] = React.useState<number | null>(null);

  const codeSnippets = [
    {
      title: '1. Install the SDK',
      language: 'bash',
      code: 'npm install @ujet/sdk',
    },
    {
      title: '2. Initialize the client',
      language: 'typescript',
      code: `import { UJETClient } from '@ujet/sdk';

const client = new UJETClient({
  apiKey: 'your-api-key',
  environment: 'production'
});`,
    },
    {
      title: '3. Make your first API call',
      language: 'typescript',
      code: `const call = await client.calls.create({
  to: '+1234567890',
  from: '+0987654321',
  url: 'https://your-app.com/twiml'
});

console.log('Call SID:', call.sid);`,
    },
  ];

  const copyToClipboard = async (code: string, index: number) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className={`max-w-4xl mx-auto p-6 ${className}`}>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Zap className="h-6 w-6 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Quick Start</h1>
        </div>
        <p className="text-lg text-gray-600">
          Get up and running with the UJET API in minutes. Follow these simple steps to make your first API call.
        </p>
      </div>

      {/* Prerequisites */}
      <div className="mb-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h3 className="text-sm font-semibold text-yellow-900 mb-2">Prerequisites</h3>
        <ul className="text-sm text-yellow-800 space-y-1">
          <li>• Node.js 16+ installed</li>
          <li>• A UJET account with API access</li>
          <li>• Your API key (get it from the dashboard)</li>
        </ul>
      </div>

      {/* Code Steps */}
      <div className="space-y-6">
        {codeSnippets.map((snippet, index) => (
          <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
            {/* Step Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <Code2 className="h-4 w-4 text-gray-600" />
                <h3 className="text-sm font-semibold text-gray-900">{snippet.title}</h3>
              </div>
              <button
                onClick={() => copyToClipboard(snippet.code, index)}
                className="flex items-center space-x-1 px-3 py-1 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded transition-colors"
              >
                {copiedIndex === index ? (
                  <>
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="text-green-600">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Code Block */}
            <div className="bg-gray-900 p-4 overflow-x-auto">
              <pre className="text-sm text-gray-100 font-mono">
                <code>{snippet.code}</code>
              </pre>
            </div>
          </div>
        ))}
      </div>

      {/* Next Steps */}
      <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">Next Steps</h3>
        <ul className="space-y-2 text-blue-800">
          <li className="flex items-start">
            <Terminal className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
            <span>Explore the <a href="/docs/api-reference" className="underline font-medium">API Reference</a> for all available endpoints</span>
          </li>
          <li className="flex items-start">
            <Code2 className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
            <span>Check out <a href="/examples" className="underline font-medium">Code Examples</a> for common use cases</span>
          </li>
          <li className="flex items-start">
            <Zap className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
            <span>Try the <a href="/demo" className="underline font-medium">Interactive Demo</a> to test the API in your browser</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

