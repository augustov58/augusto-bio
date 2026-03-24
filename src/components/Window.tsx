'use client';

import { useRef, useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useWindowStore, WindowState } from '@/stores/windowStore';

interface WindowProps {
  window: WindowState;
  children: React.ReactNode;
  toolbar?: React.ReactNode;
}

const MENU_BAR_HEIGHT = 36;
const MIN_WIDTH = 280;
const MIN_HEIGHT = 200;

type ResizeEdge = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw';

const CURSOR_MAP: Record<ResizeEdge, string> = {
  n: 'ns-resize', s: 'ns-resize',
  e: 'ew-resize', w: 'ew-resize',
  ne: 'nesw-resize', sw: 'nesw-resize',
  nw: 'nwse-resize', se: 'nwse-resize',
};

export default function Window({ window: win, children, toolbar }: WindowProps) {
  const { closeWindow, minimizeWindow, maximizeWindow, bringToFront, updatePosition, updateSize } = useWindowStore();
  const [isMobile, setIsMobile] = useState(false);
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0, winX: 0, winY: 0, winW: 0, winH: 0 });
  const mobileDragInitialized = useRef(false);
  const winIdRef = useRef(win.id);
  winIdRef.current = win.id;

  useEffect(() => {
    const check = () => setIsMobile(globalThis.innerWidth < 768);
    check();
    globalThis.addEventListener('resize', check);
    return () => globalThis.removeEventListener('resize', check);
  }, []);

  // On mobile first open, center the window
  useEffect(() => {
    if (isMobile && win.isOpen && !mobileDragInitialized.current) {
      mobileDragInitialized.current = true;
      const vw = globalThis.innerWidth;
      const wWidth = Math.round(vw * 0.94);
      const wHeight = Math.round(globalThis.innerHeight * 0.7);
      const x = Math.round((vw - wWidth) / 2);
      updatePosition(win.id, x, 80);
      updateSize(win.id, wWidth, wHeight);
    }
  }, [isMobile, win.isOpen, win.id, updatePosition, updateSize]);

  const isMaximized = win.isMaximized;

  const handlePointerDown = useCallback(() => {
    bringToFront(win.id);
  }, [bringToFront, win.id]);

  // ─── Drag via title bar ───
  const startDrag = useCallback((clientX: number, clientY: number) => {
    if (win.isMaximized) return;
    isDragging.current = true;
    const state = useWindowStore.getState().windows.find(w => w.id === win.id);
    if (!state) return;
    dragStart.current = {
      x: clientX, y: clientY,
      winX: state.position.x, winY: state.position.y,
      winW: state.size.w, winH: state.size.h,
    };
    bringToFront(win.id);

    const onMove = (cx: number, cy: number) => {
      if (!isDragging.current) return;
      const dx = cx - dragStart.current.x;
      const dy = cy - dragStart.current.y;
      const newY = Math.max(MENU_BAR_HEIGHT, dragStart.current.winY + dy);
      const newX = Math.min(globalThis.innerWidth - 100, Math.max(-dragStart.current.winW + 100, dragStart.current.winX + dx));
      updatePosition(winIdRef.current, newX, newY);
    };

    const onMouseMove = (e: MouseEvent) => onMove(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => { e.preventDefault(); onMove(e.touches[0].clientX, e.touches[0].clientY); };
    const cleanup = () => {
      isDragging.current = false;
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', cleanup);
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', cleanup);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', cleanup);
    document.addEventListener('touchmove', onTouchMove, { passive: false });
    document.addEventListener('touchend', cleanup);
  }, [win.id, win.isMaximized, bringToFront, updatePosition]);

  // ─── Resize from edges/corners ───
  const startResize = useCallback((edge: ResizeEdge, clientX: number, clientY: number) => {
    if (win.isMaximized) return;
    // Read latest from store, not from stale props
    const state = useWindowStore.getState().windows.find(w => w.id === win.id);
    if (!state) return;

    const startX = clientX;
    const startY = clientY;
    const origX = state.position.x;
    const origY = state.position.y;
    const origW = state.size.w;
    const origH = state.size.h;

    // Set cursor on body during resize
    const prevCursor = document.body.style.cursor;
    document.body.style.cursor = CURSOR_MAP[edge];
    // Prevent text selection during resize
    const prevUserSelect = document.body.style.userSelect;
    document.body.style.userSelect = 'none';

    const doResize = (cx: number, cy: number) => {
      const dx = cx - startX;
      const dy = cy - startY;
      let newX = origX, newY = origY, newW = origW, newH = origH;

      if (edge.includes('e')) newW = Math.max(MIN_WIDTH, origW + dx);
      if (edge.includes('w')) { newW = Math.max(MIN_WIDTH, origW - dx); newX = origX + origW - newW; }
      if (edge.includes('s')) newH = Math.max(MIN_HEIGHT, origH + dy);
      if (edge.includes('n')) { newH = Math.max(MIN_HEIGHT, origH - dy); newY = Math.max(MENU_BAR_HEIGHT, origY + origH - newH); }

      updatePosition(winIdRef.current, newX, newY);
      updateSize(winIdRef.current, newW, newH);
    };

    const onMouseMove = (e: MouseEvent) => { e.preventDefault(); doResize(e.clientX, e.clientY); };
    const onTouchMove = (e: TouchEvent) => { e.preventDefault(); doResize(e.touches[0].clientX, e.touches[0].clientY); };
    const cleanup = () => {
      document.body.style.cursor = prevCursor;
      document.body.style.userSelect = prevUserSelect;
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', cleanup);
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', cleanup);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', cleanup);
    document.addEventListener('touchmove', onTouchMove, { passive: false });
    document.addEventListener('touchend', cleanup);
  }, [win.id, win.isMaximized, updatePosition, updateSize]);

  if (!win.isOpen || win.isMinimized) return null;

  const openWindows = useWindowStore.getState().windows.filter(w => w.isOpen && !w.isMinimized);
  const isTopWindow = openWindows.length > 0 && openWindows.reduce((a, b) => (a.zIndex > b.zIndex ? a : b)).id === win.id;

  // Build resize handle styles
  const EDGE = 6;
  const CORNER = 14;

  const handleStyle = (edge: ResizeEdge): React.CSSProperties => {
    const s: React.CSSProperties = {
      position: 'absolute',
      zIndex: 50,
      cursor: CURSOR_MAP[edge],
    };
    const isCorner = edge.length === 2;
    if (isCorner) {
      s.width = CORNER; s.height = CORNER;
      if (edge.includes('n')) s.top = 0;
      if (edge.includes('s')) s.bottom = 0;
      if (edge.includes('w')) s.left = 0;
      if (edge.includes('e')) s.right = 0;
    } else if (edge === 'n' || edge === 's') {
      s.left = CORNER; s.right = CORNER; s.height = EDGE;
      if (edge === 'n') s.top = 0; else s.bottom = 0;
    } else {
      s.top = CORNER; s.bottom = CORNER; s.width = EDGE;
      if (edge === 'w') s.left = 0; else s.right = 0;
    }
    return s;
  };

  const edges: ResizeEdge[] = ['n', 's', 'e', 'w', 'ne', 'nw', 'se', 'sw'];

  return (
    <motion.div
      className={`fixed flex flex-col border border-window-border ${
        isMaximized ? 'inset-0' : ''
      } ${isTopWindow ? 'window-shadow-active' : 'window-shadow'}`}
      style={
        isMaximized
          ? { zIndex: win.zIndex, top: MENU_BAR_HEIGHT, borderRadius: 0 }
          : {
              zIndex: win.zIndex,
              left: win.position.x,
              top: win.position.y,
              width: win.size.w,
              height: win.size.h,
              borderRadius: 8,
            }
      }
      initial={{ scale: 0.92, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.92, opacity: 0 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
      onPointerDown={handlePointerDown}
    >
      {/* Resize handles */}
      {!isMaximized && edges.map((edge) => (
        <div
          key={edge}
          style={handleStyle(edge)}
          onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); startResize(edge, e.clientX, e.clientY); }}
          onTouchStart={(e) => { e.stopPropagation(); startResize(edge, e.touches[0].clientX, e.touches[0].clientY); }}
        />
      ))}

      {/* Title bar */}
      <div
        className={`flex items-center justify-between px-3 h-8 select-none border-b border-window-border shrink-0 ${
          isMaximized ? '' : 'rounded-t-lg'
        } ${isMaximized ? 'cursor-default' : 'cursor-grab active:cursor-grabbing'}`}
        style={{ background: isTopWindow ? '#C8C2B4' : '#DDD8CE', touchAction: 'none' }}
        onMouseDown={(e) => { e.preventDefault(); startDrag(e.clientX, e.clientY); }}
        onTouchStart={(e) => startDrag(e.touches[0].clientX, e.touches[0].clientY)}
        onDoubleClick={() => maximizeWindow(win.id)}
      >
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-base">{win.icon}</span>
          <span className="font-mono text-xs text-primary/80 truncate font-medium">{win.title}</span>
        </div>
        <div className="flex items-center gap-0.5 ml-2 shrink-0">
          <button
            onClick={(e) => { e.stopPropagation(); minimizeWindow(win.id); }}
            className="w-7 h-6 flex items-center justify-center text-primary/60 hover:bg-black/10 transition-colors text-xs font-mono"
            title="Minimize"
            onMouseDown={(e) => e.stopPropagation()}
          >
            ─
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); maximizeWindow(win.id); }}
            className="w-7 h-6 flex items-center justify-center text-primary/60 hover:bg-black/10 transition-colors text-xs font-mono"
            title="Maximize"
            onMouseDown={(e) => e.stopPropagation()}
          >
            □
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); closeWindow(win.id); }}
            className="w-7 h-6 flex items-center justify-center text-primary/60 hover:bg-red-500 hover:text-white transition-colors text-xs font-mono rounded-tr-lg"
            title="Close"
            onMouseDown={(e) => e.stopPropagation()}
          >
            ✕
          </button>
        </div>
      </div>

      {/* Optional toolbar */}
      {toolbar && (
        <div className="border-b border-window-border bg-window-chrome px-3 py-1.5 shrink-0">
          {toolbar}
        </div>
      )}

      {/* Content */}
      <div
        className={`flex-1 overflow-auto window-content bg-window-chrome ${
          isMaximized ? '' : 'rounded-b-lg'
        }`}
      >
        {children}
      </div>
    </motion.div>
  );
}
