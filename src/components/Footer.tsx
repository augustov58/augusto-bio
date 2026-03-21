import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface/50 mt-auto">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h3 className="font-heading text-lg font-bold text-primary">
              Augusto<span className="text-accent">.</span>
            </h3>
            <p className="text-sm text-secondary mt-1">
              Building things that matter, one commit at a time.
            </p>
          </div>
          <nav className="flex flex-wrap gap-6">
            <Link href="/about" className="text-sm text-secondary hover:text-accent transition-colors">About</Link>
            <Link href="/projects" className="text-sm text-secondary hover:text-accent transition-colors">Projects</Link>
            <Link href="/writing" className="text-sm text-secondary hover:text-accent transition-colors">Writing</Link>
            <Link href="/contact" className="text-sm text-secondary hover:text-accent transition-colors">Contact</Link>
          </nav>
        </div>
        <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-secondary">
            &copy; {new Date().getFullYear()} Augusto Valbuena. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/augustov58"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:text-accent transition-colors"
              aria-label="GitHub"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
