'use client';

import { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useWindowStore } from '@/stores/windowStore';
import MenuBar from './MenuBar';
import DesktopIcon from './DesktopIcon';
import Window from './Window';
import Toolbar from './Toolbar';
import HomeContent from './HomeContent';
import AboutContent from './AboutContent';
import ProjectsContent from './ProjectsContent';
import WritingContent from './WritingContent';
import ContactContent from './ContactContent';
import ToolsContent from './ToolsContent';
import WhyMeContent from './WhyMeContent';
import ResumeContent from './ResumeContent';
import BlogPostContent from './BlogPostContent';
import PixelArt from './PixelArt';

// Desktop icons with absolute positions (like real desktop icons)
const desktopIcons = [
  // Left column
  { id: 'home', icon: '🏠', label: 'home.mdx', position: { x: 24, y: 56 } },
  { id: 'about', icon: '📄', label: 'about.md', position: { x: 24, y: 152 } },
  { id: 'projects', icon: '📁', label: 'Projects', position: { x: 24, y: 248 } },
  { id: 'writing', icon: '✏️', label: 'Writing', position: { x: 24, y: 344 } },
  { id: 'contact', icon: '📧', label: 'Contact', position: { x: 24, y: 440 } },
  { id: 'resume', icon: '📋', label: 'resume.pdf', position: { x: 24, y: 536 } },
];

const desktopIconsRight = [
  { id: 'whyme', icon: '⭐', label: 'Why Me?', posFromRight: 24, posY: 56 },
  { id: 'tools', icon: '🛠️', label: 'Tools', posFromRight: 24, posY: 152 },
  { id: 'github', icon: '🐙', label: 'GitHub', posFromRight: 24, posY: 248, href: 'https://github.com/augustov58' },
];

function WindowContentRenderer({ contentType, meta }: { contentType: string; meta?: Record<string, string> }) {
  switch (contentType) {
    case 'home':
      return <HomeContent />;
    case 'about':
      return <AboutContent />;
    case 'projects':
      return <ProjectsContent />;
    case 'writing':
      return <WritingContent />;
    case 'contact':
      return <ContactContent />;
    case 'tools':
      return <ToolsContent />;
    case 'whyme':
      return <WhyMeContent />;
    case 'resume':
      return <ResumeContent />;
    case 'blogpost':
      return <BlogPostContent slug={meta?.slug || ''} />;
    default:
      return <div className="p-6 text-sm text-secondary">Unknown content type.</div>;
  }
}

export default function Desktop() {
  const { windows, openWindow, closeActiveWindow } = useWindowStore();

  // Escape key closes active window
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeActiveWindow();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [closeActiveWindow]);

  const showToolbar = (contentType: string) =>
    ['home', 'about', 'blogpost'].includes(contentType);

  return (
    <div className="desktop-bg fixed inset-0 overflow-hidden">
      {/* Menu bar */}
      <MenuBar />

      {/* Desktop icons - left side (absolute positioned, draggable) */}
      <div className="hidden md:block">
        {desktopIcons.map((icon) => (
          <DesktopIcon
            key={icon.id}
            icon={icon.icon}
            label={icon.label}
            initialPosition={icon.position}
            onClick={() => openWindow(icon.id)}
          />
        ))}
        {desktopIconsRight.map((icon) => (
          <DesktopIcon
            key={icon.id}
            icon={icon.icon}
            label={icon.label}
            initialPosition={{
              x: typeof globalThis !== 'undefined' && globalThis.innerWidth ? globalThis.innerWidth - icon.posFromRight - 76 : 1200,
              y: icon.posY,
            }}
            onClick={() => {
              if (icon.href) {
                globalThis.open(icon.href, '_blank');
              } else {
                openWindow(icon.id);
              }
            }}
            href={icon.href}
          />
        ))}
      </div>

      {/* Mobile icon strip */}
      <div className="flex md:hidden overflow-x-auto gap-1 px-3 py-2 z-10 relative mt-9">
        {[...desktopIcons, ...desktopIconsRight.map(i => ({ ...i, position: { x: 0, y: 0 } }))].map((icon) => (
          <DesktopIcon
            key={icon.id}
            icon={icon.icon}
            label={icon.label}
            onClick={() => {
              const href = 'href' in icon ? (icon as { href?: string }).href : undefined;
              if (href) {
                globalThis.open(href, '_blank');
              } else {
                openWindow(icon.id);
              }
            }}
          />
        ))}
      </div>

      {/* Windows */}
      <AnimatePresence>
        {windows
          .filter((w) => w.isOpen)
          .map((win) => (
            <Window
              key={win.id}
              window={win}
              toolbar={showToolbar(win.contentType) ? <Toolbar /> : undefined}
            >
              <WindowContentRenderer contentType={win.contentType} meta={win.meta} />
            </Window>
          ))}
      </AnimatePresence>

      {/* Pixel art decoration */}
      <PixelArt />
    </div>
  );
}
