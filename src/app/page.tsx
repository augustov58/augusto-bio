import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import ProjectCard from "@/components/ProjectCard";
import { SquigglyLine, DotGrid } from "@/components/Squiggly";
import { projects } from "@/data/projects";

export default function Home() {
  const featured = projects.filter((p) => p.featured);

  return (
    <div className="relative">
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center px-6 md:px-12 lg:px-16 overflow-hidden">
        {/* Decorative elements */}
        <DotGrid className="absolute top-12 right-8 w-32 h-32 text-accent/20 hidden md:block" />
        <DotGrid className="absolute bottom-20 left-4 w-24 h-24 text-border hidden md:block" />

        <div className="max-w-3xl">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent/10 rounded-full mb-6">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span className="text-xs font-medium text-accent">Available for projects</span>
            </div>
          </FadeIn>

          <FadeIn>
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-primary leading-[1.1] mb-6">
              Augusto
              <br />
              Valbuena<span className="text-accent">.</span>
            </h1>
          </FadeIn>

          <FadeIn>
            <p className="text-lg sm:text-xl text-secondary font-medium mb-4">
              Electrical Engineer &middot; Builder &middot; Tinkerer
            </p>
          </FadeIn>

          <FadeIn>
            <p className="text-base sm:text-lg text-secondary leading-relaxed max-w-xl mb-8">
              Professional Engineer based in Florida, designing electrical systems by day
              and building AI-powered tools by night. Venezuelan roots, global curiosity.
            </p>
          </FadeIn>

          <FadeIn>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent-hover transition-colors duration-200 shadow-sm"
              >
                See my work
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
              <Link
                href="/writing"
                className="inline-flex items-center gap-2 px-6 py-3 bg-surface text-primary font-semibold rounded-lg border border-border hover:border-accent hover:text-accent transition-colors duration-200"
              >
                Read my writing
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Squiggly divider */}
      <div className="px-6 md:px-12 lg:px-16 text-accent/20">
        <SquigglyLine />
      </div>

      {/* Featured Projects */}
      <section className="px-6 md:px-12 lg:px-16 py-20">
        <FadeIn>
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-2">
                Featured Work
              </p>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-primary">
                Recent projects
              </h2>
            </div>
            <Link
              href="/projects"
              className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-secondary hover:text-accent transition-colors"
            >
              View all
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </FadeIn>

        <FadeIn stagger>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((project) => (
              <ProjectCard key={project.title} {...project} />
            ))}
          </div>
        </FadeIn>

        <div className="sm:hidden mt-8 text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1 text-sm font-medium text-accent"
          >
            View all projects
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
