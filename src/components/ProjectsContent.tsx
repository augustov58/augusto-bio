'use client';

import { projects } from '@/data/projects';

export default function ProjectsContent() {
  return (
    <div className="p-5">
      {/* Finder-style header */}
      <div className="flex items-center gap-2 mb-4 font-mono text-[10px] text-secondary">
        <span>📁</span>
        <span>~/Projects</span>
        <span className="text-secondary/40">—</span>
        <span>{projects.length} items</span>
      </div>

      {/* Icon grid view like Finder */}
      <div className="grid grid-cols-2 gap-4">
        {projects.map((project) => (
          <div
            key={project.title}
            className="group border border-window-border rounded-lg p-4 hover:border-accent/40 hover:bg-paper/40 transition-all cursor-default"
          >
            <div className="flex items-start gap-3">
              <span className="text-3xl mt-0.5">{project.emoji}</span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-heading font-semibold text-sm text-primary group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  {project.featured && (
                    <span className="px-1.5 py-0.5 text-[9px] font-mono bg-accent/10 text-accent rounded">
                      featured
                    </span>
                  )}
                </div>
                <p className="text-xs text-secondary mt-1 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-1.5 py-0.5 text-[10px] font-mono bg-paper rounded text-secondary border border-window-border/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                {project.href && (
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 mt-2 text-[11px] font-mono text-accent hover:text-accent-hover transition-colors"
                  >
                    ↗ {project.href.replace('https://', '')}
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="font-mono text-[10px] text-secondary/40 mt-4 pt-3 border-t border-window-border">
        {projects.length} items &middot; {projects.filter(p => p.featured).length} featured
      </div>
    </div>
  );
}
