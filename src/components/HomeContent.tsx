'use client';

import { useWindowStore } from '@/stores/windowStore';
import { projects } from '@/data/projects';

export default function HomeContent() {
  const { openWindow } = useWindowStore();
  const featured = projects.filter((p) => p.featured);

  return (
    <div className="p-6 max-w-2xl">
      {/* Hero */}
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-primary mb-2">
          Hey, I&apos;m Augusto <span className="inline-block animate-bounce">👋</span>
        </h1>
        <p className="text-secondary text-base leading-relaxed">
          Electrical Engineer &middot; Builder &middot; Tinkerer
        </p>
        <p className="text-secondary text-sm leading-relaxed mt-3">
          PE-licensed electrical engineer in Florida doing construction design by day.
          By night, I build AI-powered tools, automate things that shouldn&apos;t be manual,
          and tinker with whatever catches my interest.
        </p>
      </div>

      {/* Quick links as file icons */}
      <div className="mb-8">
        <h2 className="font-mono text-xs text-secondary mb-3 uppercase tracking-wider">
          ~/quick-links
        </h2>
        <div className="flex flex-wrap gap-3">
          {[
            { icon: '📄', label: 'about.md', id: 'about' },
            { icon: '📁', label: 'Projects/', id: 'projects' },
            { icon: '✏️', label: 'Writing/', id: 'writing' },
            { icon: '📧', label: 'contact.vcf', id: 'contact' },
          ].map((link) => (
            <button
              key={link.id}
              onClick={() => openWindow(link.id)}
              className="flex items-center gap-2 px-3 py-2 border border-window-border rounded-md hover:bg-paper/50 hover:border-accent/30 transition-colors group"
            >
              <span className="text-lg">{link.icon}</span>
              <span className="font-mono text-xs text-secondary group-hover:text-accent transition-colors">
                {link.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Featured projects */}
      <div className="mb-8">
        <h2 className="font-mono text-xs text-secondary mb-3 uppercase tracking-wider">
          ~/featured-projects
        </h2>
        <div className="space-y-3">
          {featured.map((project) => (
            <button
              key={project.title}
              onClick={() => openWindow('projects')}
              className="block w-full text-left p-3 border border-window-border rounded-md hover:border-accent/30 hover:bg-paper/50 transition-colors group"
            >
              <div className="flex items-start gap-3">
                <span className="text-xl mt-0.5">{project.emoji}</span>
                <div className="min-w-0">
                  <div className="font-heading font-semibold text-sm text-primary group-hover:text-accent transition-colors">
                    {project.title}
                  </div>
                  <p className="text-xs text-secondary mt-0.5 line-clamp-1">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-1.5 py-0.5 text-[10px] font-mono bg-paper rounded text-secondary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Status bar */}
      <div className="font-mono text-[10px] text-secondary/60 border-t border-window-border pt-3">
        <span>$ echo &quot;Based in Central Florida 🌴 | Venezuelan roots 🇻🇪&quot;</span>
      </div>
    </div>
  );
}
