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

const edgeCursors: Record<ResizeEdge, string> = {
  n: 'cursor-n-resize',
  s: 'cursor-s-resize',
  e: 'cursor-e-resize',
  w: 'cursor-w-resize',
  ne: 'cursor-ne-resize',
  nw: 'cursor-nw-resize',
  se: 'cursor-se-resize',
  sw: 'cursor-sw-resize',
};

export default function Window({ window: win, children, toolbar }: WindowProps) {
  const { closeWindow, minimizeWindow, maximizeWindow, bringToFront, updatePosition, updateSize } = useWindowStore();
  const [isMobile, setIsMobile] = useState(false);
  const isDragging = useRef(false);
  const isResizing = useRef<ResizeEdge | null>(null);
  const dragStart = useRef({ x: 0, y: 0, winX: 0, winY: 0, winW: 0, winH: 0 });
  const mobileDragInitialized = useRef(false);

  useEffect(() => {
    const check = () => setIsMobile(globalThis.innerWidth < 768);
    check();
    globalThis.addEventListener('resize', check);
    return () => globalThis.removeEventListener('resize', check);
  }, []);

  // On mobile first open, center the window if it hasn't been dragged yet
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

  // ─── Drag (mouse) ───
  const handleTitleBarMouseDown = useCallback((e: React.MouseEvent) => {
    if (isMaximized) return;
    e.preventDefault();
    isDragging.current = true;
    dragStart.current = {
      x: e.clientX, y: e.clientY,
      winX: win.position.x, winY: win.position.y,
      winW: win.size.w, winH: win.size.h,
    };
    bringToFront(win.id);

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;
      const newY = Math.max(MENU_BAR_HEIGHT, dragStart.current.winY + dy);
      const newX = Math.min(globalThis.innerWidth - 100, Math.max(-win.size.w + 100, dragStart.current.winX + dx));
      updatePosition(win.id, newX, newY);
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [win.id, win.position.x, win.position.y, win.size.w, isMaximized, bringToFront, updatePosition]);

  // ─── Drag (touch) ───
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (isMaximized) return;
    const touch = e.touches[0];
    isDragging.current = true;
    dragStart.current = {
      x: touch.clientX, y: touch.clientY,
      winX: win.position.x, winY: win.position.y,
      winW: win.size.w, winH: win.size.h,
    };
    bringToFront(win.id);

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging.current) return;
      e.preventDefault(); // prevent scroll while dragging
      const touch = e.touches[0];
      const dx = touch.clientX - dragStart.current.x;
      const dy = touch.clientY - dragStart.current.y;
      const newX = dragStart.current.winX + dx;
      const newY = Math.max(MENU_BAR_HEIGHT, dragStart.current.winY + dy);
      updatePosition(win.id, newX, newY);
    };

    const handleTouchEnd = () => {
      isDragging.current = false;
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };

    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [win.id, win.position.x, win.position.y, isMaximized, bringToFront, updatePosition]);

  // ─── Resize (mouse + touch) ───
  const startResize = useCallback((edge: ResizeEdge, clientX: number, clientY: number) => {
    if (isMaximized) return;
    isResizing.current = edge;
    dragStart.current = {
      x: clientX, y: clientY,
      winX: win.position.x, winY: win.position.y,
      winW: win.size.w, winH: win.size.h,
    };
    bringToFront(win.id);

    const doResize = (cx: number, cy: number) => {
      if (!isResizing.current) return;
      const dx = cx - dragStart.current.x;
      const dy = cy - dragStart.current.y;
      const { winX, winY, winW, winH } = dragStart.current;
      let newX = winX, newY = winY, newW = winW, newH = winH;

      const e = isResizing.current;
      if (e.includes('e')) newW = Math.max(MIN_WIDTH, winW + dx);
      if (e.includes('w')) { newW = Math.max(MIN_WIDTH, winW - dx); newX = winX + winW - newW; }
      if (e.includes('s')) newH = Math.max(MIN_HEIGHT, winH + dy);
      if (e.includes('n')) { newH = Math.max(MIN_HEIGHT, winH - dy); newY = Math.max(MENU_BAR_HEIGHT, winY + winH - newH); }

      updatePosition(win.id, newX, newY);
      updateSize(win.id, newW, newH);
    };

    const onMouseMove = (e: MouseEvent) => { e.preventDefault(); doResize(e.clientX, e.clientY); };
    const onTouchMove = (e: TouchEvent) => { e.preventDefault(); doResize(e.touches[0].clientX, e.touches[0].clientY); };

    const cleanup = () => {
      isResizing.current = null;
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', cleanup);
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', cleanup);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', cleanup);
    document.addEventListener('touchmove', onTouchMove, { passive: false });
    document.addEventListener('touchend', cleanup);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [win.id, win.position.x, win.position.y, win.size.w, win.size.h, isMaximized, bringToFront, updatePosition, updateSize]);

  if (!win.isOpen || win.isMinimized) return null;

  const openWindows = useWindowStore.getState().windows.filter(w => w.isOpen && !w.isMinimized);
  const isTopWindow = openWindows.length > 0 && openWindows.reduce((a, b) => (a.zIndex > b.zIndex ? a : b)).id === win.id;

  // Resize handle component
  const ResizeHandle = ({ edge }: { edge: ResizeEdge }) => {
    const isCorner = edge.length === 2;
    const size = isCorner ? 12 : 6;

    const style: React.CSSProperties = { position: 'absolute' };

    // Position the handle
    if (edge.includes('n')) { style.top = -3; style.height = size; }
    if (edge.includes('s')) { style.bottom = -3; style.height = size; }
    if (edge.includes('e')) { style.right = -3; style.width = size; }
    if (edge.includes('w')) { style.left = -3; style.width = size; }

    // Edge handles span the full side
    if (edge === 'n' || edge === 's') { style.left = 10; style.right = 10; }
    if (edge === 'e' || edge === 'w') { style.top = 10; style.bottom = 10; }

    // Corner handles
    if (edge === 'nw') { style.top = -3; style.left = -3; }
    if (edge === 'ne') { style.top = -3; style.right = -3; }
    if (edge === 'sw') { style.bottom = -3; style.left = -3; }
    if (edge === 'se') { style.bottom = -3; style.right = -3; }

    return (
      <div
        className={`${edgeCursors[edge]} z-50`}
        style={style}
        onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); startResize(edge, e.clientX, e.clientY); }}
        onTouchStart={(e) => { e.stopPropagation(); startResize(edge, e.touches[0].clientX, e.touches[0].clientY); }}
      />
    );
  };

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
      {/* Resize handles (hidden when maximized) */}
      {!isMaximized && (
        <>
          <ResizeHandle edge="n" />
          <ResizeHandle edge="s" />
          <ResizeHandle edge="e" />
          <ResizeHandle edge="w" />
          <ResizeHandle edge="ne" />
          <ResizeHandle edge="nw" />
          <ResizeHandle edge="se" />
          <ResizeHandle edge="sw" />
        </>
      )}

      {/* Title bar */}
      <div
        className={`flex items-center justify-between px-3 h-8 select-none border-b border-window-border shrink-0 ${
          isMaximized ? '' : 'rounded-t-lg'
        } ${isMaximized ? 'cursor-default' : 'cursor-grab active:cursor-grabbing'}`}
        style={{ background: isTopWindow ? '#C8C2B4' : '#DDD8CE', touchAction: 'none' }}
        onMouseDown={handleTitleBarMouseDown}
        onTouchStart={handleTouchStart}
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
