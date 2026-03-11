'use client';

import React from 'react';

/**
 * Documentation Page Component
 *
 * Generated from Figma design: https://www.figma.com/design/F2lkYCId2xMqcd9RuXL20B/API-Portal?node-id=278-7350&m=dev
 *
 * @component
 */
export default function DocumentationPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <div className="text-2xl font-bold text-[#0271F3]">UJET</div>
              <nav className="hidden md:flex space-x-6">
                <a href="#" className="text-[#0271F3] font-medium">Documentation</a>
                <a href="#" className="text-gray-600 hover:text-gray-900">API Reference</a>
                <a href="#" className="text-gray-600 hover:text-gray-900">Playground</a>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900">
                Log in
              </button>
              <button className="px-4 py-2 text-sm bg-[#0271F3] text-white rounded-md hover:bg-[#0D74CE]">
                Contact sales
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 border-r border-gray-200 h-screen sticky top-16 overflow-y-auto">
          <div className="p-4">
            <div className="mb-4">
              <h2 className="text-sm font-semibold text-gray-900">Documentation v10.9</h2>
            </div>
            <nav className="space-y-1">
              <a href="#" className="block px-3 py-2 text-sm text-[#0271F3] font-medium">
                Quick Start
              </a>
              <a href="#" className="block px-3 py-2 text-sm text-gray-700 hover:text-gray-900">
                Calls
              </a>
              <a href="#" className="block px-3 py-2 text-sm text-gray-700 hover:text-gray-900">
                Queues
              </a>
              <a href="#" className="block px-3 py-2 text-sm text-gray-700 hover:text-gray-900">
                Agents
              </a>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="max-w-4xl">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Quick Start</h1>
            <p className="text-lg text-gray-600 mb-8">
              Welcome to the UJET Developer Portal! This guide will help you get started.
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">About This Documentation</h2>
              <p className="text-gray-700">
                This documentation provides comprehensive guides and API references for integrating with UJET.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">What You'll Find Here</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">📞 Calls</h3>
                  <p className="text-sm text-gray-600">Manage inbound and outbound calls</p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">👥 Queues</h3>
                  <p className="text-sm text-gray-600">Configure call queues and routing</p>
                </div>
              </div>
            </section>
          </div>
        </main>

        {/* Right Sidebar */}
        <aside className="w-64 border-l border-gray-200 p-4 hidden lg:block">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">On This Page</h3>
          <nav className="space-y-2">
            <a href="#" className="block text-sm text-gray-600 hover:text-gray-900">
              About This Documentation
            </a>
            <a href="#" className="block text-sm text-gray-600 hover:text-gray-900">
              What You'll Find Here
            </a>
          </nav>
        </aside>
      </div>
    </div>
  );
}
