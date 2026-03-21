import FadeIn from "@/components/FadeIn";
import { DotGrid } from "@/components/Squiggly";

const links = [
  {
    label: "GitHub",
    href: "https://github.com/augustov58",
    description: "Check out my code and projects",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:hello@augustovalbuena.com",
    description: "Drop me a line anytime",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/augustovalbuena",
    description: "Connect professionally",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

export default function Contact() {
  return (
    <div className="px-6 md:px-12 lg:px-16 py-16 md:py-24 relative">
      <DotGrid className="absolute top-16 right-8 w-32 h-32 text-accent/15 hidden lg:block" />

      <div className="max-w-2xl">
        {/* Header */}
        <FadeIn>
          <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">
            Contact
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-primary mb-4">
            Let&apos;s talk<span className="text-accent">.</span>
          </h1>
          <p className="text-lg text-secondary mb-12">
            Got a project idea, want to collaborate, or just want to say hi? I&apos;m always
            open to interesting conversations.
          </p>
        </FadeIn>

        {/* Contact links */}
        <FadeIn stagger>
          <div className="space-y-4">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                className="group flex items-center gap-5 bg-surface rounded-card border border-border p-5 hover:shadow-lg hover:shadow-accent/5 hover:border-accent/30 transition-all duration-300"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-cream rounded-xl flex items-center justify-center text-secondary group-hover:text-accent group-hover:bg-accent/10 transition-all duration-300">
                  {link.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-heading font-bold text-primary group-hover:text-accent transition-colors">
                    {link.label}
                  </h3>
                  <p className="text-sm text-secondary">{link.description}</p>
                </div>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-border group-hover:text-accent group-hover:translate-x-1 transition-all duration-300 flex-shrink-0"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            ))}
          </div>
        </FadeIn>

        {/* Quick note */}
        <FadeIn>
          <div className="mt-12 p-6 bg-surface rounded-card border border-dashed border-border">
            <p className="text-secondary text-sm leading-relaxed">
              <span className="font-semibold text-primary">Prefer email?</span>{" "}
              I typically respond within 24 hours. For project inquiries, it helps
              to include a brief description of what you&apos;re looking for.
            </p>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
