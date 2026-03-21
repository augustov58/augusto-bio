import Link from "next/link";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  href?: string;
  emoji?: string;
}

export default function ProjectCard({
  title,
  description,
  tags,
  href,
  emoji = "🔧",
}: ProjectCardProps) {
  const content = (
    <div className="group bg-surface rounded-card border border-border p-6 hover:shadow-lg hover:shadow-accent/5 hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
      <div className="flex items-start justify-between mb-4">
        <span className="text-3xl" role="img">{emoji}</span>
        {href && (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-border group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
          >
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        )}
      </div>
      <h3 className="font-heading text-lg font-bold text-primary mb-2 group-hover:text-accent transition-colors">
        {title}
      </h3>
      <p className="text-sm text-secondary leading-relaxed mb-4 flex-1">
        {description}
      </p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-1 bg-cream text-xs font-medium text-secondary rounded-full border border-border"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        {content}
      </Link>
    );
  }

  return content;
}
