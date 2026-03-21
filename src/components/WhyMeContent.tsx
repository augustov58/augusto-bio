'use client';

export default function WhyMeContent() {
  const reasons = [
    {
      icon: '⚡',
      title: 'Engineering + Code',
      description:
        'I combine PE-licensed electrical engineering with full-stack development. I don\'t just build apps — I understand the industries they serve.',
    },
    {
      icon: '🤖',
      title: 'AI-First Thinking',
      description:
        'Every project I build leverages AI where it makes sense. Not as a buzzword — as a practical tool that delivers real value.',
    },
    {
      icon: '🚀',
      title: 'Ship Fast, Ship Often',
      description:
        'From idea to production in days, not months. I build with modern tools and deploy continuously.',
    },
    {
      icon: '🔧',
      title: 'Full Stack, Full Ownership',
      description:
        'Design, frontend, backend, infrastructure, deployment — I handle the entire stack. No handoffs, no gaps.',
    },
    {
      icon: '🌎',
      title: 'Bilingual & Bicultural',
      description:
        'Native Spanish speaker with deep understanding of both US and Latin American markets. Built products for both.',
    },
    {
      icon: '🎯',
      title: 'Builder Mindset',
      description:
        'I don\'t wait for permission to solve problems. I see a need, I build a tool. My GitHub is proof.',
    },
  ];

  return (
    <div className="p-6">
      <h2 className="font-heading text-xl font-bold text-primary mb-1">
        Why Hire Me?
      </h2>
      <p className="text-xs text-secondary mb-5">
        What makes me different from the next developer.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {reasons.map((reason) => (
          <div
            key={reason.title}
            className="p-3 border border-window-border rounded-lg hover:border-accent/30 transition-colors"
          >
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-lg">{reason.icon}</span>
              <h3 className="font-heading font-semibold text-sm text-primary">
                {reason.title}
              </h3>
            </div>
            <p className="text-xs text-secondary leading-relaxed">
              {reason.description}
            </p>
          </div>
        ))}
      </div>

      <div className="font-mono text-[10px] text-secondary/40 mt-5 pt-3 border-t border-window-border">
        why-hire-me.md &middot; {reasons.length} reasons
      </div>
    </div>
  );
}
