'use client';

export default function ResumeContent() {
  return (
    <div className="p-6 max-w-2xl">
      <h2 className="font-heading text-xl font-bold text-primary mb-1">
        Resume
      </h2>
      <p className="text-xs text-secondary mb-6">
        Augusto Valbuena — Electrical Engineer &amp; Software Builder
      </p>

      {/* Experience */}
      <section className="mb-6">
        <h3 className="font-heading font-semibold text-sm text-primary mb-3 flex items-center gap-2">
          <span>💼</span> Experience
        </h3>
        <div className="space-y-4">
          <div className="border-l-2 border-accent/30 pl-3">
            <div className="font-heading font-semibold text-sm text-primary">
              Electrical Engineer (PE)
            </div>
            <div className="font-mono text-[10px] text-secondary mt-0.5">
              Construction Design &middot; Florida &middot; Current
            </div>
            <p className="text-xs text-secondary mt-1 leading-relaxed">
              Power distribution, lighting design, NEC code compliance for commercial
              and residential projects.
            </p>
          </div>
          <div className="border-l-2 border-accent/30 pl-3">
            <div className="font-heading font-semibold text-sm text-primary">
              Independent Software Builder
            </div>
            <div className="font-mono text-[10px] text-secondary mt-0.5">
              Side Projects &amp; Products &middot; Ongoing
            </div>
            <p className="text-xs text-secondary mt-1 leading-relaxed">
              Building AI-powered SaaS tools, automation pipelines, and web applications.
              Shipped Sparkplan, MiCasaVenezuela, and multiple AI experiments.
            </p>
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="mb-6">
        <h3 className="font-heading font-semibold text-sm text-primary mb-3 flex items-center gap-2">
          <span>🎓</span> Education
        </h3>
        <div className="border-l-2 border-window-border pl-3">
          <div className="font-heading font-semibold text-sm text-primary">
            Electrical Engineering
          </div>
          <div className="font-mono text-[10px] text-secondary mt-0.5">
            PE Licensed &middot; State of Florida
          </div>
        </div>
      </section>

      {/* Skills summary */}
      <section>
        <h3 className="font-heading font-semibold text-sm text-primary mb-3 flex items-center gap-2">
          <span>🛠️</span> Core Skills
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {[
            'TypeScript', 'Python', 'Next.js', 'React', 'Node.js',
            'PostgreSQL', 'Supabase', 'OpenAI API', 'AWS', 'Docker',
            'NEC Code', 'Power Systems', 'Lighting Design',
          ].map((skill) => (
            <span
              key={skill}
              className="px-2 py-1 text-[10px] font-mono bg-paper border border-window-border rounded text-secondary"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      <div className="font-mono text-[10px] text-secondary/40 mt-6 pt-3 border-t border-window-border">
        resume.pdf &middot; page 1 of 1
      </div>
    </div>
  );
}
