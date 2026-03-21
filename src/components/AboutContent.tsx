'use client';

export default function AboutContent() {
  return (
    <div className="p-6 max-w-2xl font-sans">
      <article className="prose-sm">
        <h1 className="font-heading text-2xl font-bold text-primary mb-4">
          About Me
        </h1>

        <p className="text-secondary text-sm leading-relaxed mb-4">
          I&apos;m <strong className="text-primary">Augusto Valbuena</strong> — a PE-licensed electrical engineer
          based in Kissimmee, Florida. By day, I design electrical systems for commercial and
          residential construction projects. By night, I build software.
        </p>

        <h2 className="font-heading text-lg font-semibold text-primary mt-6 mb-3">
          🔧 What I Do
        </h2>
        <p className="text-secondary text-sm leading-relaxed mb-4">
          My engineering work focuses on power distribution, lighting design, and code compliance
          (NEC, FBC). But what really gets me going is building tools that make complex work simpler —
          whether that&apos;s AI-powered design platforms, real estate portals, or automation scripts that
          save hours of manual work.
        </p>

        <h2 className="font-heading text-lg font-semibold text-primary mt-6 mb-3">
          🚀 My Stack
        </h2>
        <div className="flex flex-wrap gap-2 mb-4">
          {['TypeScript', 'Python', 'Next.js', 'React', 'Node.js', 'Supabase', 'PostgreSQL', 'OpenAI', 'Tailwind CSS', 'Vercel'].map((tech) => (
            <span key={tech} className="px-2 py-1 text-xs font-mono bg-paper rounded-md border border-window-border text-secondary">
              {tech}
            </span>
          ))}
        </div>

        <h2 className="font-heading text-lg font-semibold text-primary mt-6 mb-3">
          🌎 Background
        </h2>
        <p className="text-secondary text-sm leading-relaxed mb-4">
          Born and raised in Venezuela, now calling Florida home. I bring a unique perspective
          that bridges Latin American markets with US tech — which is exactly what led me to
          build MiCasaVenezuela, a real estate portal for the Venezuelan market.
        </p>

        <h2 className="font-heading text-lg font-semibold text-primary mt-6 mb-3">
          ⚡ Fun Facts
        </h2>
        <ul className="text-secondary text-sm leading-relaxed space-y-1.5 mb-4 list-disc list-inside">
          <li>I automate everything I can — if I do it twice, there&apos;s a script for it</li>
          <li>I built an AI tool that does NEC code compliance checks</li>
          <li>I track GPU prices because... why not?</li>
          <li>I think the best portfolio is one that looks like an operating system</li>
        </ul>

        <div className="font-mono text-[10px] text-secondary/50 border-t border-window-border pt-3 mt-6">
          last modified: 2025 &middot; about.md &middot; 142 words
        </div>
      </article>
    </div>
  );
}
