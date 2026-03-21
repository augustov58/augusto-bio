import FadeIn from "@/components/FadeIn";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";

export default function Projects() {
  return (
    <div className="px-6 md:px-12 lg:px-16 py-16 md:py-24">
      <div className="max-w-5xl">
        {/* Header */}
        <FadeIn>
          <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">
            Projects
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-primary mb-4">
            Things I&apos;ve built<span className="text-accent">.</span>
          </h1>
          <p className="text-lg text-secondary max-w-xl mb-12">
            A mix of professional tools, side projects, and experiments. Some solve
            real problems. Others just scratch an itch.
          </p>
        </FadeIn>

        {/* Project Grid */}
        <FadeIn stagger>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.title} {...project} />
            ))}
          </div>
        </FadeIn>

        {/* More coming */}
        <FadeIn>
          <div className="mt-12 p-6 bg-surface rounded-card border border-dashed border-border text-center">
            <p className="text-secondary text-sm">
              More projects in the pipeline. Always building something new.
            </p>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
