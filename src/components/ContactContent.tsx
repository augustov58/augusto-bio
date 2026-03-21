'use client';

export default function ContactContent() {
  const contacts = [
    {
      icon: '💼',
      label: 'LinkedIn',
      value: 'augustovalbuena',
      href: 'https://linkedin.com/in/augustovalbuena',
      description: 'Best way to reach me',
    },
    {
      icon: '🐙',
      label: 'GitHub',
      value: 'augustov58',
      href: 'https://github.com/augustov58',
      description: 'Check out my code',
    },
  ];

  return (
    <div className="p-6">
      <h2 className="font-heading text-xl font-bold text-primary mb-1">
        Get in Touch
      </h2>
      <p className="text-xs text-secondary mb-6">
        Always open to interesting conversations and collaborations.
      </p>

      <div className="space-y-3">
        {contacts.map((contact) => (
          <a
            key={contact.label}
            href={contact.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 border border-window-border rounded-lg hover:border-accent/40 hover:bg-paper/40 transition-all group"
          >
            <span className="text-2xl">{contact.icon}</span>
            <div className="flex-1 min-w-0">
              <div className="font-heading font-semibold text-sm text-primary group-hover:text-accent transition-colors">
                {contact.label}
              </div>
              <div className="font-mono text-xs text-secondary mt-0.5">
                {contact.value}
              </div>
              <div className="text-[10px] text-secondary/60 mt-0.5">
                {contact.description}
              </div>
            </div>
            <span className="text-secondary/30 group-hover:text-accent transition-colors">
              ↗
            </span>
          </a>
        ))}
      </div>

      <div className="font-mono text-[10px] text-secondary/40 mt-6 pt-3 border-t border-window-border">
        contact.vcf &middot; 2 entries
      </div>
    </div>
  );
}
