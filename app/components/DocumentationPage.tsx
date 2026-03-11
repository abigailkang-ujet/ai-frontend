'use client';

import React from 'react';

/**
 * DocumentationPage Component
 *
 * API Reference documentation page - exact reproduction of Figma design
 * Figma: https://www.figma.com/design/F2lkYCId2xMqcd9RuXL20B/API-Portal?node-id=278-6621&m=dev
 *
 * Layout: 3-column (Sidebar 255px | Main Content 880px | Right TOC 305px)
 *
 * @component
 */
export default function DocumentationPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Top Navigation - matches Figma exactly */}
      <nav className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-6">
          {/* Left: Logo + Navigation Tabs */}
          <div className="flex items-center gap-8">
            {/* UJET Logo */}
            <div className="flex items-center gap-1">
              <span className="text-base font-bold text-[#00A3E0]">ujet</span>
              <span className="text-[10px] text-gray-400">LOGO</span>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-1">
              <a
                href="#"
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
              >
                Documentation
              </a>
              <a
                href="#"
                className="rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900"
              >
                API Reference
              </a>
              <a
                href="#"
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
              >
                Playground
              </a>
            </div>
          </div>

          {/* Right: Search + Actions */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <button className="flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-500 hover:border-gray-400">
              <span>Search</span>
              <span className="text-xs text-gray-400">⌘K</span>
            </button>

            {/* Log in */}
            <button className="px-4 py-1.5 text-sm font-medium text-gray-700 hover:text-gray-900">
              Log in
            </button>

            {/* Contact sales */}
            <button className="rounded bg-black px-4 py-1.5 text-sm text-white hover:bg-gray-800">
              Contact sales
            </button>
          </div>
        </div>
      </nav>

      {/* Main Layout: 3-column structure matching Figma exactly */}
      <div className="mx-auto flex max-w-[1440px]">
        {/* Left Sidebar - 255px width */}
        <aside className="w-[255px] border-r border-gray-200 bg-white">
          <div className="sticky top-0 h-screen overflow-y-auto p-4">
            {/* Sidebar Header */}
            <div className="mb-4">
              <div className="mb-1 text-sm font-semibold text-gray-900">API Reference</div>
              <div className="text-xs text-gray-500">v1.0.0</div>
            </div>

            {/* Search Input */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search the docs"
                className="w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Navigation Menu */}
            <nav className="space-y-1">
              {/* Authentication */}
              <div>
                <a href="#" className="block px-2 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
                  Authentification
                </a>
                <div className="ml-3 space-y-0.5">
                  <a href="#" className="block px-2 py-1 text-sm text-gray-600 hover:bg-gray-50">
                    Quick Start
                  </a>
                  <a href="#" className="block px-2 py-1 text-sm text-gray-600 hover:bg-gray-50">
                    Installation
                  </a>
                </div>
              </div>

              {/* Errors */}
              <div>
                <a href="#" className="block px-2 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
                  Errors
                </a>
                <div className="ml-3 space-y-0.5">
                  <a href="#" className="block px-2 py-1 text-sm text-gray-600 hover:bg-gray-50">
                    Quick Start
                  </a>
                  <a href="#" className="block px-2 py-1 text-sm text-gray-600 hover:bg-gray-50">
                    Installation
                  </a>
                </div>
              </div>

              {/* Rate Limits */}
              <div>
                <a href="#" className="block px-2 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
                  Rate Limits
                </a>
                <div className="ml-3 space-y-0.5">
                  <a href="#" className="block px-2 py-1 text-sm text-gray-600 hover:bg-gray-50">
                    Quick Start
                  </a>
                  <a href="#" className="block px-2 py-1 text-sm text-gray-600 hover:bg-gray-50">
                    Installation
                  </a>
                </div>
              </div>

              {/* Calls - with HTTP methods */}
              <div>
                <a href="#" className="block px-2 py-1.5 text-sm font-medium text-gray-900 hover:bg-gray-50">
                  Calls
                </a>
                <div className="ml-3 space-y-0.5">
                  <a href="#" className="flex items-center gap-2 px-2 py-1 text-sm font-medium text-gray-900 hover:bg-gray-50">
                    <span className="rounded-full bg-pink-100 px-2 py-0.5 text-[10px] font-medium text-pink-700">POST</span>
                    <span>Create Call</span>
                  </a>
                  <a href="#" className="flex items-center gap-2 px-2 py-1 text-sm text-gray-600 hover:bg-gray-50">
                    <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-medium text-green-700">GET</span>
                    <span>Get Call</span>
                  </a>
                  <a href="#" className="flex items-center gap-2 px-2 py-1 text-sm text-gray-600 hover:bg-gray-50">
                    <span className="rounded-full bg-orange-100 px-2 py-0.5 text-[10px] font-medium text-orange-700">PATCH</span>
                    <span>Update Call</span>
                  </a>
                </div>
              </div>

              {/* Queues */}
              <div>
                <a href="#" className="block px-2 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
                  Queues
                </a>
              </div>

              {/* Agents */}
              <div>
                <a href="#" className="block px-2 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
                  Agents
                </a>
              </div>
            </nav>
          </div>
        </aside>

        {/* Main Content - 880px width */}
        <main className="w-[880px] bg-white px-8 py-6">
          {/* Breadcrumb */}
          <div className="mb-6 flex items-center gap-2 text-sm text-gray-500">
            <a href="#" className="hover:text-gray-700">Home</a>
            <span>/</span>
            <a href="#" className="hover:text-gray-700">Documentation</a>
            <span>/</span>
            <span className="text-gray-900">Create Call</span>
          </div>

          {/* Header Section */}
          <div className="mb-6">
            {/* POST Badge */}
            <div className="mb-2">
              <span className="rounded-full bg-pink-100 px-2.5 py-1 text-xs font-medium text-pink-700">POST</span>
            </div>

            {/* Title */}
            <h1 className="mb-2 text-2xl font-bold text-gray-900">Create Call</h1>

            {/* Description */}
            <p className="text-sm text-gray-600">
              Create an inbound call for testing or integration purposes.
            </p>
          </div>

          {/* Authentication Section */}
          <section id="authentication" className="mb-8">
            <h2 className="mb-2 text-xl font-semibold text-gray-900">Authentication</h2>
            <p className="text-sm text-gray-600">Requires Apps API key.</p>
          </section>

          {/* Body Parameters Section */}
          <section id="body-parameters" className="mb-8">
            <h2 className="mb-3 text-lg font-semibold text-gray-900">Body Parameters</h2>

            {/* Simple Table - 2 columns */}
            <div className="space-y-3">
              <div className="flex gap-4">
                <div className="w-32">
                  <span className="rounded-full bg-pink-100 px-2 py-0.5 text-xs font-medium text-pink-700">selecting</span>
                </div>
                <div className="flex-1 text-sm text-gray-600">
                  Customer is navigating IVR menu
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-32">
                  <span className="rounded-full bg-pink-100 px-2 py-0.5 text-xs font-medium text-pink-700">queued</span>
                </div>
                <div className="flex-1 text-sm text-gray-600">
                  Call is waiting for an agent
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-32">
                  <span className="rounded-full bg-pink-100 px-2 py-0.5 text-xs font-medium text-pink-700">assigned</span>
                </div>
                <div className="flex-1 text-sm text-gray-600">
                  Agent is selected to receive the call
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-32">
                  <span className="rounded-full bg-pink-100 px-2 py-0.5 text-xs font-medium text-pink-700">connected</span>
                </div>
                <div className="flex-1 text-sm text-gray-600">
                  Agent and customer are on the call
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-32">
                  <span className="rounded-full bg-pink-100 px-2 py-0.5 text-xs font-medium text-pink-700">finished</span>
                </div>
                <div className="flex-1 text-sm text-gray-600">
                  Call ended after connection
                </div>
              </div>
            </div>
          </section>

          {/* Request Section */}
          <section id="request" className="mb-8">
            <h2 className="mb-3 text-lg font-semibold text-gray-900">Request</h2>

            {/* Code Block */}
            <div className="overflow-hidden rounded border border-gray-200">
              {/* Code Block Header */}
              <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-2">
                <div className="flex gap-3">
                  <button className="text-xs font-medium text-gray-900">
                    C-urlrc
                  </button>
                  <button className="text-xs text-gray-500">
                    Quote
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">TypeScript</span>
                  <button className="text-xs text-gray-500 hover:text-gray-700">📋</button>
                </div>
              </div>

              {/* Code Content */}
              <div className="bg-[#1E1E1E] p-4">
                <pre className="text-xs leading-relaxed text-gray-300"><code>{`import log "std:http:client" = "^1";

var client = http.client({
  __base = "https://api.pattern.com",
});

for (var i = 0; i < length; ++i) {
  var getter = __getters[i];
  if (!(key in getter)) continue;
  return getter[key].apply(this, arguments);
}

// (pattern.com/documentation) || 2 > "am"`}</code></pre>
              </div>
            </div>
          </section>

          {/* Response Section */}
          <section id="response" className="mb-8">
            <h2 className="mb-3 text-lg font-semibold text-gray-900">Response</h2>

            {/* Code Block */}
            <div className="overflow-hidden rounded border border-gray-200">
              {/* Code Block Header */}
              <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-2">
                <div className="flex gap-3">
                  <button className="text-xs font-medium text-gray-900">
                    C-urlrc
                  </button>
                  <button className="text-xs text-gray-500">
                    Quote
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">json</span>
                  <button className="text-xs text-gray-500 hover:text-gray-700">📋</button>
                </div>
              </div>

              {/* Code Content */}
              <div className="bg-[#1E1E1E] p-4">
                <pre className="text-xs leading-relaxed text-gray-300"><code>{`import log "std:http:client" = "^1";

var client = http.client({
  __base = "https://api.pattern.com",
});

for (var i = 0; i < length; ++i) {
  var getter = __getters[i];
  if (!(key in getter)) continue;
  return getter[key].apply(this, arguments);
}

// (pattern.com/documentation) || 2 > "am"`}</code></pre>
              </div>
            </div>
          </section>

          {/* Notes Section */}
          <section id="notes" className="mb-8">
            <h2 className="mb-2 text-xl font-semibold text-gray-900">Notes</h2>
            <p className="text-sm text-gray-600">
              This endpoint creates a call object that simulates an inbound call to your UJET system.
            </p>
          </section>

          {/* Related API endpoints Section */}
          <section id="related-endpoints" className="mb-8">
            <h2 className="mb-2 text-xl font-semibold text-gray-900">Related API endpoints</h2>
            <p className="text-sm text-gray-600">
              When a customer calls your UJET phone number:
            </p>
          </section>

          {/* Related Documentation Section */}
          <section id="related-docs" className="mb-8">
            <h2 className="mb-2 text-xl font-semibold text-gray-900">Related Documentation</h2>
            <p className="text-sm text-gray-600">
              When a customer calls your UJET phone number:
            </p>
          </section>
        </main>

        {/* Right TOC - 305px width */}
        <aside className="w-[305px] border-l border-gray-200 bg-white">
          <div className="sticky top-0 p-6">
            <div className="mb-4 text-sm font-semibold text-gray-900">On This Page</div>
            <nav className="space-y-2">
              <a href="#authentication" className="block text-sm text-gray-600 hover:text-gray-900">
                Authentication
              </a>
              <a href="#body-parameters" className="block text-sm text-gray-600 hover:text-gray-900">
                Body Parameters
              </a>
              <a href="#request" className="block text-sm text-gray-600 hover:text-gray-900">
                Request
              </a>
              <a href="#response" className="block text-sm text-gray-600 hover:text-gray-900">
                Response
              </a>
              <a href="#notes" className="block text-sm text-gray-600 hover:text-gray-900">
                Notes
              </a>
              <a href="#related-endpoints" className="block text-sm text-gray-600 hover:text-gray-900">
                Related API endpoints
              </a>
              <a href="#related-docs" className="block text-sm text-gray-600 hover:text-gray-900">
                Related Documentation
              </a>
            </nav>
          </div>
        </aside>
      </div>
    </div>
  );
}

