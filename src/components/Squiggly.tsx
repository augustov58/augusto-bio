export function SquigglyLine({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 20" className={`w-full h-5 ${className}`} preserveAspectRatio="none">
      <path
        d="M0 10 Q25 0 50 10 Q75 20 100 10 Q125 0 150 10 Q175 20 200 10 Q225 0 250 10 Q275 20 300 10 Q325 0 350 10 Q375 20 400 10"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function DotGrid({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={`${className}`}>
      {Array.from({ length: 25 }).map((_, i) => (
        <circle
          key={i}
          cx={(i % 5) * 25 + 12.5}
          cy={Math.floor(i / 5) * 25 + 12.5}
          r="2"
          fill="currentColor"
          opacity="0.3"
        />
      ))}
    </svg>
  );
}
