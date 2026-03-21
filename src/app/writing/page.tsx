import FadeIn from "@/components/FadeIn";
import { SquigglyLine } from "@/components/Squiggly";
import { posts } from "@/data/posts";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function Writing() {
  return (
    <div className="px-6 md:px-12 lg:px-16 py-16 md:py-24">
      <div className="max-w-3xl">
        {/* Header */}
        <FadeIn>
          <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">
            Writing
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-primary mb-4">
            Notes & ideas<span className="text-accent">.</span>
          </h1>
          <p className="text-lg text-secondary mb-12">
            Thinking out loud about building, engineering, and the things I learn along the way.
          </p>
        </FadeIn>

        {/* Posts */}
        <div className="space-y-0">
          {posts.map((post, i) => (
            <FadeIn key={post.slug}>
              <article className="group py-8 cursor-pointer">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="sm:w-32 shrink-0">
                    <time className="text-sm text-secondary">
                      {formatDate(post.date)}
                    </time>
                  </div>
                  <div className="flex-1">
                    <h2 className="font-heading text-xl font-bold text-primary group-hover:text-accent transition-colors mb-2">
                      {post.title}
                    </h2>
                    <p className="text-secondary text-sm leading-relaxed mb-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 bg-cream text-xs font-medium text-secondary rounded-full border border-border"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <span className="text-xs text-secondary">
                        {post.readTime} read
                      </span>
                    </div>
                  </div>
                </div>
              </article>
              {i < posts.length - 1 && (
                <div className="border-b border-border" />
              )}
            </FadeIn>
          ))}
        </div>

        {/* Coming soon */}
        <FadeIn>
          <div className="mt-8 text-accent/20">
            <SquigglyLine />
          </div>
          <p className="text-center text-sm text-secondary mt-6">
            More posts coming soon. Stay tuned.
          </p>
        </FadeIn>
      </div>
    </div>
  );
}
