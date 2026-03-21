'use client';

import { useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

interface DesktopIconProps {
  icon: string;
  label: string;
  onClick: () => void;
  href?: string;
  initialPosition?: { x: number; y: number };
  compact?: boolean;
}

export default function DesktopIcon({ icon, label, onClick, href, initialPosition, compact }: DesktopIconProps) {
  const [position, setPosition] = useState(initialPosition || { x: 0, y: 0 });
  const [selected, setSelected] = useState(false);
  const isDragging = useRef(false);
  const hasMoved = useRef(false);
  const dragStart = useRef({ x: 0, y: 0, posX: 0, posY: 0 });

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (initialPosition) {
      e.preventDefault();
      isDragging.current = true;
      hasMoved.current = false;
      dragStart.current = {
        x: e.clientX,
        y: e.clientY,
        posX: position.x,
        posY: position.y,
      };
      setSelected(true);

      const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging.current) return;
        const dx = e.clientX - dragStart.current.x;
        const dy = e.clientY - dragStart.current.y;
        if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
          hasMoved.current = true;
        }
        setPosition({
          x: dragStart.current.posX + dx,
          y: dragStart.current.posY + dy,
        });
      };

      const handleMouseUp = () => {
        isDragging.current = false;
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
  }, [initialPosition, position.x, position.y]);

  const handleClick = useCallback(() => {
    if (hasMoved.current) return; // Don't trigger click after drag
    if (href) {
      globalThis.open(href, '_blank');
    } else {
      onClick();
    }
  }, [href, onClick]);

  const handleDoubleClick = useCallback(() => {
    if (href) {
      globalThis.open(href, '_blank');
    } else {
      onClick();
    }
  }, [href, onClick]);

  const handleBlur = useCallback(() => setSelected(false), []);

  const style = initialPosition ? {
    position: 'absolute' as const,
    left: position.x,
    top: position.y,
    zIndex: isDragging.current ? 1000 : 5,
  } : {};

  if (compact) {
    return (
      <motion.div
        className="desktop-icon flex flex-col items-center gap-0 p-1 rounded-lg cursor-pointer select-none"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleClick}
        tabIndex={0}
      >
        <div className="icon-glow w-10 h-10 flex items-center justify-center rounded-lg transition-all">
          <span className="text-2xl drop-shadow-md">{icon}</span>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={`desktop-icon flex flex-col items-center gap-0.5 p-2 rounded-lg cursor-pointer group w-[76px] select-none ${
        selected ? 'bg-accent/10 ring-1 ring-accent/30' : ''
      }`}
      style={style}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onMouseDown={handleMouseDown}
      onBlur={handleBlur}
      tabIndex={0}
    >
      <div className="icon-glow w-14 h-14 flex items-center justify-center rounded-lg transition-all">
        <span className="text-3xl drop-shadow-md">{icon}</span>
      </div>
      <span className="text-[10px] font-mono text-primary/90 text-center leading-tight break-words w-full px-0.5 drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
        {label}
      </span>
    </motion.div>
  );
}
