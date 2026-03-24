'use client';

import { useEffect, useRef } from 'react';
import { useWindowStore } from '@/stores/windowStore';

/**
 * Hash-based routing for the desktop windows.
 *
 * Supported formats:
 *   #projects, #about, #writing, #contact, #resume, #whyme, #tools, #home
 *   #post/<slug>   — opens a blog post window
 */

// Known static window ids
const STATIC_IDS = new Set([
  'home', 'about', 'projects', 'writing', 'contact', 'resume', 'whyme', 'tools',
]);

/** Parse hash into a window target. Returns null if hash is empty/invalid. */
function parseHash(hash: string): { id: string; meta?: Record<string, string> } | null {
  const raw = hash.replace(/^#/, '').trim();
  if (!raw) return null;

  // Blog post: #post/my-slug
  if (raw.startsWith('post/')) {
    const slug = raw.slice(5);
    if (!slug) return null;
    return {
      id: `post-${slug}`,
      meta: {
        title: slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
        icon: '📝',
        contentType: 'blogpost',
        slug,
      },
    };
  }

  // Static window
  if (STATIC_IDS.has(raw)) {
    return { id: raw };
  }

  return null;
}

/** Build a hash string from a window id */
function buildHash(id: string, meta?: Record<string, string>): string {
  if (id.startsWith('post-') && meta?.slug) {
    return `#post/${meta.slug}`;
  }
  if (STATIC_IDS.has(id)) {
    return `#${id}`;
  }
  return '';
}

export function useHashRouting() {
  const { windows, openWindow, bringToFront } = useWindowStore();
  const suppressHashUpdate = useRef(false);
  const initialized = useRef(false);

  // On mount: read hash and open the target window
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const target = parseHash(window.location.hash);
    if (target) {
      // Small delay to let the initial render settle
      requestAnimationFrame(() => {
        openWindow(target.id, target.meta);
      });
    }
  }, [openWindow]);

  // Sync hash → store on browser back/forward
  useEffect(() => {
    const onHashChange = () => {
      if (suppressHashUpdate.current) {
        suppressHashUpdate.current = false;
        return;
      }
      const target = parseHash(window.location.hash);
      if (target) {
        const existing = useWindowStore.getState().windows.find((w) => w.id === target.id);
        if (existing?.isOpen) {
          bringToFront(target.id);
        } else {
          openWindow(target.id, target.meta);
        }
      }
    };

    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, [openWindow, bringToFront]);

  // Sync store → hash: update hash when the topmost visible window changes
  useEffect(() => {
    const openWins = windows.filter((w) => w.isOpen && !w.isMinimized);
    if (openWins.length === 0) {
      if (window.location.hash) {
        suppressHashUpdate.current = true;
        history.replaceState(null, '', window.location.pathname);
      }
      return;
    }

    const top = openWins.reduce((a, b) => (a.zIndex > b.zIndex ? a : b));
    const newHash = buildHash(top.id, top.meta);

    if (newHash && window.location.hash !== newHash) {
      suppressHashUpdate.current = true;
      history.replaceState(null, '', newHash);
    }
  }, [windows]);
}
