'use client';

import { useState, useRef, useEffect } from 'react';
import { useWindowStore } from '@/stores/windowStore';

interface MenuItem {
  label: string;
  action?: () => void;
  href?: string;
  separator?: boolean;
}

interface Menu {
  label: string;
  items: MenuItem[];
}

export default function MenuBar() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const { openWindow } = useWindowStore();

  const menus: Menu[] = [
    {
      label: 'About',
      items: [
        { label: '📄  Bio', action: () => openWindow('about') },
        { label: '🛠️  Skills & Tools', action: () => openWindow('tools') },
        { label: '📋  Resume', action: () => openWindow('resume') },
      ],
    },
    {
      label: 'Projects',
      items: [
        { label: '📁  All Projects', action: () => openWindow('projects') },
        { separator: true, label: '' },
        { label: '⚡  Sparkplan', action: () => openWindow('projects') },
        { label: '🏠  MiCasaVenezuela', action: () => openWindow('projects') },
        { label: '🤖  AI Experiments', action: () => openWindow('projects') },
        { label: '🎮  GPU Deal Finder', action: () => openWindow('projects') },
      ],
    },
    {
      label: 'Writing',
      items: [
        { label: '✏️  All Posts', action: () => openWindow('writing') },
      ],
    },
    {
      label: 'Contact',
      items: [
        { label: '📧  Email', href: 'mailto:augustovalbuena@gmail.com' },
        { label: '🐙  GitHub', href: 'https://github.com/augustov58' },
        { label: '💼  LinkedIn', href: 'https://linkedin.com/in/augustovalbuena' },
      ],
    },
    {
      label: 'More',
      items: [
        { label: '⭐  Why Hire Me?', action: () => openWindow('whyme') },
        { label: '📋  Resume', action: () => openWindow('resume') },
      ],
    },
  ];

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div
      ref={menuRef}
      className="fixed top-0 left-0 right-0 h-[36px] menubar-glass flex items-center px-2 z-[9999] select-none"
    >
      {/* Logo */}
      <button
        onClick={() => openWindow('home')}
        className="px-3 py-1 font-heading font-bold text-sm text-accent hover:bg-black/5 rounded transition-colors mr-1"
      >
        AV
      </button>

      {/* Menus */}
      {menus.map((menu) => (
        <div key={menu.label} className="relative">
          <button
            className={`px-3 py-1 text-xs font-sans rounded transition-colors ${
              activeMenu === menu.label
                ? 'bg-accent text-white'
                : 'text-primary hover:bg-black/5'
            }`}
            onClick={() => setActiveMenu(activeMenu === menu.label ? null : menu.label)}
            onMouseEnter={() => {
              if (activeMenu) setActiveMenu(menu.label);
            }}
          >
            {menu.label}
          </button>

          {activeMenu === menu.label && (
            <div className="absolute top-full left-0 mt-0.5 min-w-[200px] bg-window-chrome border border-window-border rounded-md shadow-lg dropdown-animate py-1 z-[10000]">
              {menu.items.map((item, i) =>
                item.separator ? (
                  <div key={i} className="border-t border-window-border my-1" />
                ) : item.href ? (
                  <a
                    key={i}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-3 py-1.5 text-xs text-primary hover:bg-accent hover:text-white transition-colors"
                    onClick={() => setActiveMenu(null)}
                  >
                    {item.label}
                  </a>
                ) : (
                  <button
                    key={i}
                    className="block w-full text-left px-3 py-1.5 text-xs text-primary hover:bg-accent hover:text-white transition-colors"
                    onClick={() => {
                      item.action?.();
                      setActiveMenu(null);
                    }}
                  >
                    {item.label}
                  </button>
                )
              )}
            </div>
          )}
        </div>
      ))}

      {/* Right side: clock */}
      <div className="ml-auto font-mono text-xs text-secondary">
        <Clock />
      </div>
    </div>
  );
}

function Clock() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => {
      setTime(
        new Date().toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        })
      );
    };
    update();
    const interval = setInterval(update, 30000);
    return () => clearInterval(interval);
  }, []);

  return <span>{time}</span>;
}
