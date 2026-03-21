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

export default function Window({ window: win, children, toolbar }: WindowProps) {
  const { closeWindow, minimizeWindow, maximizeWindow, bringToFront, updatePosition } = useWindowStore();
  const [isMobile, setIsMobile] = useState(false);
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0, winX: 0, winY: 0 });

  useEffect(() => {
    const check = () => setIsMobile(globalThis.innerWidth < 768);
    check();
    globalThis.addEventListener('resize', check);
    return () => globalThis.removeEventListener('resize', check);
  }, []);

  // On mobile: default to centered, double-tap toggles to fullscreen
  const isMaximized = isMobile ? win.isMaximized : win.isMaximized;

  const handlePointerDown = useCallback(() => {
    bringToFront(win.id);
  }, [bringToFront, win.id]);

  // Manual drag implementation for reliability
  const handleTitleBarMouseDown = useCallback((e: React.MouseEvent) => {
    if (isMaximized) return;
    e.preventDefault();
    isDragging.current = true;
    dragStart.current = {
      x: e.clientX,
      y: e.clientY,
      winX: win.position.x,
      winY: win.position.y,
    };
    bringToFront(win.id);

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;
      const rawX = dragStart.current.winX + dx;
      const rawY = dragStart.current.winY + dy;
      
      // Constrain: don't let title bar go above menu bar or off screen
      const newY = Math.max(MENU_BAR_HEIGHT, rawY);
      const newX = Math.min(globalThis.innerWidth - 100, Math.max(-win.size.w + 100, rawX));
      
      updatePosition(win.id, newX, newY);
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [win.id, win.position.x, win.position.y, win.size.w, isMaximized, bringToFront, updatePosition]);

  // Touch drag for mobile
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (isMaximized) return;
    const touch = e.touches[0];
    isDragging.current = true;
    dragStart.current = {
      x: touch.clientX,
      y: touch.clientY,
      winX: win.position.x,
      winY: win.position.y,
    };
    bringToFront(win.id);

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging.current) return;
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
  }, [win.id, win.position.x, win.position.y, isMaximized, bringToFront, updatePosition]);

  if (!win.isOpen || win.isMinimized) return null;

  const openWindows = useWindowStore.getState().windows.filter(w => w.isOpen && !w.isMinimized);
  const isTopWindow = openWindows.length > 0 && openWindows.reduce((a, b) => (a.zIndex > b.zIndex ? a : b)).id === win.id;

  return (
    <motion.div
      className={`fixed flex flex-col border border-window-border ${
        isMaximized ? 'inset-0' : ''
      } ${isTopWindow ? 'window-shadow-active' : 'window-shadow'}`}
      style={
        isMaximized
          ? { zIndex: win.zIndex, top: MENU_BAR_HEIGHT, borderRadius: 0 }
          : isMobile
            ? {
                zIndex: win.zIndex,
                left: '3%',
                top: 80,
                width: '94%',
                height: '70vh',
                borderRadius: 8,
              }
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
      {/* Title bar */}
      <div
        className={`flex items-center justify-between px-3 h-8 select-none border-b border-window-border shrink-0 ${
          isMaximized ? '' : 'rounded-t-lg'
        } ${isMaximized ? 'cursor-default' : 'cursor-grab active:cursor-grabbing'}`}
        style={{ background: isTopWindow ? '#C8C2B4' : '#DDD8CE' }}
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
