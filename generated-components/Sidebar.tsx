'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Book,
  Code,
  Zap,
  Settings,
  HelpCircle,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';

interface SidebarProps {
  className?: string;
  variant?: 'default' | 'compact';
}

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  children?: NavItem[];
}

/**
 * Sidebar Component
 * 
 * Navigation sidebar for the UJET Developer Portal.
 * Supports two variants: default (expanded) and compact (collapsed).
 * 
 * Based on Figma designs: node-id=278-8898 & node-id=278-8910
 * 
 * @component
 */
export default function Sidebar({ className = '', variant = 'default' }: SidebarProps) {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = React.useState<string[]>([]);

  const navItems: NavItem[] = [
    {
      label: 'Home',
      href: '/',
      icon: <Home className="h-5 w-5" />,
    },
    {
      label: 'Documentation',
      href: '/docs',
      icon: <Book className="h-5 w-5" />,
      children: [
        { label: 'Getting Started', href: '/docs/getting-started', icon: null },
        { label: 'Authentication', href: '/docs/authentication', icon: null },
        { label: 'API Reference', href: '/docs/api-reference', icon: null },
      ],
    },
    {
      label: 'Quick Start',
      href: '/quick-start',
      icon: <Zap className="h-5 w-5" />,
    },
    {
      label: 'Code Examples',
      href: '/examples',
      icon: <Code className="h-5 w-5" />,
      children: [
        { label: 'Call API', href: '/examples/call-api', icon: null },
        { label: 'Webhooks', href: '/examples/webhooks', icon: null },
      ],
    },
    {
      label: 'Settings',
      href: '/settings',
      icon: <Settings className="h-5 w-5" />,
    },
    {
      label: 'Support',
      href: '/support',
      icon: <HelpCircle className="h-5 w-5" />,
    },
  ];

  const toggleExpanded = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  const renderNavItem = (item: NavItem, level = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.label);
    const active = isActive(item.href);

    return (
      <div key={item.href}>
        <Link
          href={item.href}
          className={`
            flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium transition-colors
            ${active ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'}
            ${level > 0 ? 'ml-6' : ''}
          `}
          onClick={(e) => {
            if (hasChildren) {
              e.preventDefault();
              toggleExpanded(item.label);
            }
          }}
        >
          <div className="flex items-center space-x-3">
            {item.icon}
            {variant === 'default' && <span>{item.label}</span>}
          </div>
          {hasChildren && variant === 'default' && (
            isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />
          )}
        </Link>
        {hasChildren && isExpanded && variant === 'default' && (
          <div className="mt-1 space-y-1">
            {item.children!.map((child) => renderNavItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <aside
      className={`
        ${variant === 'default' ? 'w-64' : 'w-16'}
        h-screen sticky top-16 border-r border-gray-200 bg-white transition-all duration-300
        ${className}
      `}
    >
      <nav className="p-4 space-y-2">
        {navItems.map((item) => renderNavItem(item))}
      </nav>
    </aside>
  );
}

