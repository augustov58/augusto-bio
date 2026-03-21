import { create } from 'zustand';

export interface WindowState {
  id: string;
  title: string;
  icon: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  position: { x: number; y: number };
  size: { w: number; h: number };
  zIndex: number;
  contentType: string;
  // For dynamic content like blog posts
  meta?: Record<string, string>;
}

interface WindowStore {
  windows: WindowState[];
  nextZIndex: number;
  openWindow: (id: string, meta?: Record<string, string>) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  bringToFront: (id: string) => void;
  updatePosition: (id: string, x: number, y: number) => void;
  closeActiveWindow: () => void;
}

const CASCADE_OFFSET = 30;

function getMobileAdjustedWindow(win: Omit<WindowState, 'zIndex'>) {
  if (typeof globalThis === 'undefined' || !globalThis.innerWidth) return win;
  const vw = globalThis.innerWidth;
  const vh = globalThis.innerHeight;
  if (vw >= 768) return win;
  // On mobile: fit windows to ~90% of viewport, centered
  const w = Math.min(win.size.w, vw - 20);
  const h = Math.min(win.size.h, vh - 80);
  const x = Math.max(10, (vw - w) / 2);
  const y = 45;
  return { ...win, position: { x, y }, size: { w, h } };
}

const defaultWindows: Omit<WindowState, 'zIndex'>[] = [
  {
    id: 'home',
    title: 'home.mdx',
    icon: '🏠',
    isOpen: true,
    isMinimized: false,
    isMaximized: false,
    position: { x: 140, y: 60 },
    size: { w: 720, h: 520 },
    contentType: 'home',
  },
  {
    id: 'about',
    title: 'about.md',
    icon: '📄',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 170, y: 80 },
    size: { w: 640, h: 500 },
    contentType: 'about',
  },
  {
    id: 'projects',
    title: 'Projects/',
    icon: '📁',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 200, y: 100 },
    size: { w: 700, h: 480 },
    contentType: 'projects',
  },
  {
    id: 'writing',
    title: 'Writing/',
    icon: '✏️',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 220, y: 80 },
    size: { w: 660, h: 500 },
    contentType: 'writing',
  },
  {
    id: 'contact',
    title: 'contact.vcf',
    icon: '📧',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 240, y: 100 },
    size: { w: 480, h: 400 },
    contentType: 'contact',
  },
  {
    id: 'resume',
    title: 'resume.pdf',
    icon: '📋',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 180, y: 90 },
    size: { w: 600, h: 480 },
    contentType: 'resume',
  },
  {
    id: 'whyme',
    title: 'why-hire-me.md',
    icon: '⭐',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 260, y: 70 },
    size: { w: 580, h: 460 },
    contentType: 'whyme',
  },
  {
    id: 'tools',
    title: 'tools.config',
    icon: '🛠️',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 210, y: 110 },
    size: { w: 620, h: 460 },
    contentType: 'tools',
  },
];

// Dynamic windows (blog posts) get created on the fly
let cascadeCounter = 0;

export const useWindowStore = create<WindowStore>((set, get) => ({
  windows: defaultWindows.map((w, i) => ({ ...getMobileAdjustedWindow(w), zIndex: i === 0 ? 10 : 1 })),
  nextZIndex: 11,

  openWindow: (id: string, meta?: Record<string, string>) => {
    const { windows, nextZIndex } = get();
    const existing = windows.find((w) => w.id === id);

    if (existing) {
      set({
        windows: windows.map((w) =>
          w.id === id
            ? { ...w, isOpen: true, isMinimized: false, zIndex: nextZIndex }
            : w
        ),
        nextZIndex: nextZIndex + 1,
      });
    } else {
      // Dynamic window (e.g., blog post)
      cascadeCounter++;
      const offset = (cascadeCounter % 8) * CASCADE_OFFSET;
      const rawWindow = {
        id,
        title: meta?.title || id,
        icon: meta?.icon || '📄',
        isOpen: true,
        isMinimized: false,
        isMaximized: false,
        position: { x: 180 + offset, y: 70 + offset },
        size: { w: 680, h: 500 },
        contentType: meta?.contentType || 'blogpost',
        meta,
      };
      const newWindow: WindowState = {
        ...getMobileAdjustedWindow(rawWindow),
        zIndex: nextZIndex,
      };
      set({
        windows: [...windows, newWindow],
        nextZIndex: nextZIndex + 1,
      });
    }
  },

  closeWindow: (id: string) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, isOpen: false, isMinimized: false, isMaximized: false } : w
      ),
    }));
  },

  minimizeWindow: (id: string) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, isMinimized: !w.isMinimized } : w
      ),
    }));
  },

  maximizeWindow: (id: string) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, isMaximized: !w.isMaximized } : w
      ),
    }));
  },

  bringToFront: (id: string) => {
    const { nextZIndex } = get();
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, zIndex: nextZIndex } : w
      ),
      nextZIndex: nextZIndex + 1,
    }));
  },

  updatePosition: (id: string, x: number, y: number) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, position: { x, y } } : w
      ),
    }));
  },

  closeActiveWindow: () => {
    const { windows } = get();
    const openWindows = windows.filter((w) => w.isOpen && !w.isMinimized);
    if (openWindows.length === 0) return;
    const topWindow = openWindows.reduce((a, b) => (a.zIndex > b.zIndex ? a : b));
    get().closeWindow(topWindow.id);
  },
}));
