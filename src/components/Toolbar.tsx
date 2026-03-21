'use client';

export default function Toolbar() {
  return (
    <div className="flex items-center gap-2 text-[10px] text-secondary font-mono">
      <div className="flex items-center gap-1">
        <button className="px-2 py-0.5 rounded hover:bg-black/5 transition-colors">
          <span className="font-bold">B</span>
        </button>
        <button className="px-2 py-0.5 rounded hover:bg-black/5 transition-colors">
          <span className="italic">I</span>
        </button>
        <button className="px-2 py-0.5 rounded hover:bg-black/5 transition-colors">
          <span className="underline">U</span>
        </button>
      </div>
      <div className="w-px h-4 bg-window-border" />
      <select className="bg-transparent text-[10px] outline-none cursor-pointer hover:bg-black/5 rounded px-1 py-0.5" disabled>
        <option>Inter</option>
      </select>
      <select className="bg-transparent text-[10px] outline-none cursor-pointer hover:bg-black/5 rounded px-1 py-0.5" disabled>
        <option>14px</option>
      </select>
      <div className="w-px h-4 bg-window-border" />
      <span className="text-[10px] text-secondary/50">100%</span>
    </div>
  );
}
