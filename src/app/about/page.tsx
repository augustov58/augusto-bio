import FadeIn from "@/components/FadeIn";
import { SquigglyLine } from "@/components/Squiggly";

const skills = [
  { category: "Engineering", items: ["Electrical Design", "NEC Compliance", "Power Systems", "EV Charging", "Construction Docs"] },
  { category: "Development", items: ["Next.js", "React", "TypeScript", "Python", "Tailwind CSS"] },
  { category: "AI & Data", items: ["OpenAI API", "LangChain", "Web Scraping", "Data Pipelines", "Automation"] },
  { category: "Tools", items: ["Supabase", "Vercel", "Git", "PostgreSQL", "eBay API"] },
];

export default function About() {
  return (
    <div className="px-6 md:px-12 lg:px-16 py-16 md:py-24">
      <div className="max-w-3xl">
        {/* Header */}
        <FadeIn>
          <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">
            About
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-primary mb-6">
            The full story<span className="text-accent">.</span>
          </h1>
        </FadeIn>

        {/* Bio */}
        <FadeIn>
          <div className="space-y-5 text-base sm:text-lg text-secondary leading-relaxed mb-16">
            <p>
              I&apos;m a licensed Professional Engineer based in Florida, specializing in
              electrical construction design. My day job is all about power systems,
              lighting, and making sure buildings meet code — especially when it comes
              to EV charging infrastructure.
            </p>
            <p>
              But after hours? That&apos;s where things get interesting. I&apos;m a builder
              at heart. I spend my nights and weekends working on software projects
              that sit at the intersection of AI, automation, and real-world problems.
              Whether it&apos;s building a compliance tool for electricians or scraping
              real estate data for the Venezuelan market, I&apos;m always making something.
            </p>
            <p>
              Born in Venezuela, I carry that scrappy, figure-it-out energy into
              everything I do. I believe the best way to learn is to build, ship,
              and iterate.
            </p>
          </div>
        </FadeIn>

        <div className="text-accent/20 mb-16">
          <SquigglyLine />
        </div>

        {/* After Hours */}
        <FadeIn>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-primary mb-6">
            After hours
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
            <div className="bg-surface rounded-card border border-border p-5">
              <span className="text-2xl mb-3 block">🤖</span>
              <h3 className="font-heading font-bold text-primary mb-1">AI Tinkerer</h3>
              <p className="text-sm text-secondary">
                Building tools with LLMs, experimenting with agents, and automating
                everything I can.
              </p>
            </div>
            <div className="bg-surface rounded-card border border-border p-5">
              <span className="text-2xl mb-3 block">₿</span>
              <h3 className="font-heading font-bold text-primary mb-1">Crypto Curious</h3>
              <p className="text-sm text-secondary">
                Researching on-chain data, building monitoring bots, and following
                the decentralized future.
              </p>
            </div>
            <div className="bg-surface rounded-card border border-border p-5">
              <span className="text-2xl mb-3 block">⚡</span>
              <h3 className="font-heading font-bold text-primary mb-1">PE by Day</h3>
              <p className="text-sm text-secondary">
                Licensed Professional Engineer designing electrical systems for
                commercial and industrial projects.
              </p>
            </div>
            <div className="bg-surface rounded-card border border-border p-5">
              <span className="text-2xl mb-3 block">🇻🇪</span>
              <h3 className="font-heading font-bold text-primary mb-1">Venezuelan Roots</h3>
              <p className="text-sm text-secondary">
                Bringing hustle, warmth, and a global perspective to everything I
                build.
              </p>
            </div>
          </div>
        </FadeIn>

        <div className="text-accent/20 mb-16">
          <SquigglyLine />
        </div>

        {/* Skills */}
        <FadeIn>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-primary mb-8">
            Skills & tools
          </h2>
        </FadeIn>
        <FadeIn stagger>
          <div className="space-y-8">
            {skills.map((group) => (
              <div key={group.category}>
                <h3 className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1.5 bg-surface border border-border rounded-full text-sm font-medium text-primary hover:border-accent hover:text-accent transition-colors cursor-default"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
