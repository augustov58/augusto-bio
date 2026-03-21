'use client';

import { useEffect, useState } from 'react';
import { useWindowStore } from '@/stores/windowStore';

interface PostSummary {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  date: string;
}

export default function WritingContent() {
  const [posts, setPosts] = useState<PostSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const { openWindow } = useWindowStore();

  useEffect(() => {
    fetch('/api/posts')
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="p-5">
      <div className="flex items-center gap-2 mb-4 font-mono text-[10px] text-secondary">
        <span>✏️</span>
        <span>~/Writing</span>
        <span className="text-secondary/40">—</span>
        <span>{posts.length} posts</span>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="font-mono text-xs text-secondary animate-pulse">
            Loading posts...
          </div>
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-12">
          <span className="text-3xl mb-3 block">📝</span>
          <p className="text-sm text-secondary">No posts yet. Check back soon!</p>
          <p className="font-mono text-[10px] text-secondary/50 mt-2">
            $ ls ~/writing/ &mdash; 0 items
          </p>
        </div>
      ) : (
        <div className="divide-y divide-window-border">
          {posts.map((post) => (
            <button
              key={post.slug}
              onClick={() =>
                openWindow(`post-${post.slug}`, {
                  title: `${post.title.slice(0, 30)}...`,
                  icon: '📝',
                  contentType: 'blogpost',
                  slug: post.slug,
                })
              }
              className="w-full text-left py-3 px-2 hover:bg-paper/50 transition-colors group flex items-start gap-3"
            >
              <span className="font-mono text-[10px] text-secondary/60 mt-1 shrink-0 w-20">
                {post.date ? new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: '2-digit' }) : '—'}
              </span>
              <div className="min-w-0 flex-1">
                <div className="font-heading font-medium text-sm text-primary group-hover:text-accent transition-colors truncate">
                  {post.title}
                </div>
                {post.description && (
                  <p className="text-xs text-secondary mt-0.5 line-clamp-1">
                    {post.description}
                  </p>
                )}
                {post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[9px] font-mono text-secondary/60 bg-paper px-1 py-0.5 rounded"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <span className="text-secondary/30 text-xs group-hover:text-accent transition-colors">
                ↗
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
