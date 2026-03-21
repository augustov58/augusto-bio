'use client';

import { motion } from 'framer-motion';

export default function PixelArt() {
  return (
    <div className="absolute bottom-8 right-8 pointer-events-none select-none opacity-40 hidden lg:block">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        {/* Isometric computer desk pixel art using CSS */}
        <svg width="140" height="120" viewBox="0 0 140 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Desk surface */}
          <path d="M20 70 L70 45 L120 70 L70 95 Z" fill="#C4B9A8" stroke="#A89E8E" strokeWidth="1" />
          {/* Desk front */}
          <path d="M20 70 L20 85 L70 110 L70 95 Z" fill="#B5AA99" stroke="#A89E8E" strokeWidth="1" />
          {/* Desk side */}
          <path d="M70 95 L70 110 L120 85 L120 70 Z" fill="#ADA295" stroke="#A89E8E" strokeWidth="1" />
          {/* Monitor back */}
          <rect x="50" y="25" width="40" height="30" rx="2" fill="#8B8578" stroke="#706B60" strokeWidth="1" />
          {/* Monitor screen */}
          <rect x="52" y="27" width="36" height="24" rx="1" fill="#2D3748" />
          {/* Screen content - terminal lines */}
          <rect x="55" y="31" width="20" height="2" rx="1" fill="#48BB78" opacity="0.8" />
          <rect x="55" y="35" width="15" height="2" rx="1" fill="#48BB78" opacity="0.6" />
          <rect x="55" y="39" width="25" height="2" rx="1" fill="#48BB78" opacity="0.4" />
          {/* Blinking cursor */}
          <motion.rect
            x="55"
            y="43"
            width="6"
            height="2"
            rx="1"
            fill="#F54E00"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          />
          {/* Monitor stand */}
          <rect x="66" y="55" width="8" height="8" fill="#8B8578" />
          {/* Monitor base */}
          <path d="M58 63 L82 63 L78 66 L62 66 Z" fill="#8B8578" />
          {/* Keyboard */}
          <path d="M45 68 L65 58 L95 68 L75 78 Z" fill="#9B9488" stroke="#8B8578" strokeWidth="0.5" />
          {/* Coffee mug */}
          <ellipse cx="100" cy="58" rx="6" ry="3" fill="#D4A574" />
          <path d="M94 55 L94 58 Q94 61 100 61 Q106 61 106 58 L106 55" fill="#C49464" stroke="#B08454" strokeWidth="0.5" />
          {/* Steam */}
          <motion.path
            d="M98 52 Q97 48 99 45"
            stroke="#B8B3A8"
            strokeWidth="1"
            fill="none"
            animate={{ opacity: [0.3, 0.7, 0.3], y: [0, -2, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.path
            d="M102 51 Q103 47 101 44"
            stroke="#B8B3A8"
            strokeWidth="1"
            fill="none"
            animate={{ opacity: [0.5, 0.2, 0.5], y: [0, -3, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          />
        </svg>
      </motion.div>
    </div>
  );
}
