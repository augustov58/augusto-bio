'use client';

import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface BlogPostContentProps {
  slug: string;
}

interface PostData {
  title: string;
  content: string;
  date: string;
  tags: string[];
}

export default function BlogPostContent({ slug }: BlogPostContentProps) {
  const [post, setPost] = useState<PostData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/posts/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <span className="font-mono text-xs text-secondary animate-pulse">
          Loading post...
        </span>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex items-center justify-center p-12">
        <span className="font-mono text-xs text-secondary">
          Post not found.
        </span>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl">
      {/* Post header */}
      <div className="mb-6">
        <h1 className="font-heading text-xl font-bold text-primary mb-2">
          {post.title}
        </h1>
        <div className="flex items-center gap-3 font-mono text-[10px] text-secondary">
          {post.date && (
            <span>
              {new Date(post.date).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
          )}
          {post.tags?.length > 0 && (
            <div className="flex gap-1">
              {post.tags.map((tag) => (
                <span key={tag} className="bg-paper px-1.5 py-0.5 rounded">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Markdown content */}
      <div className="prose-sm max-w-none text-secondary text-sm leading-relaxed [&_h1]:font-heading [&_h1]:text-lg [&_h1]:font-bold [&_h1]:text-primary [&_h1]:mt-6 [&_h1]:mb-3 [&_h2]:font-heading [&_h2]:text-base [&_h2]:font-semibold [&_h2]:text-primary [&_h2]:mt-5 [&_h2]:mb-2 [&_h3]:font-heading [&_h3]:text-sm [&_h3]:font-semibold [&_h3]:text-primary [&_h3]:mt-4 [&_h3]:mb-2 [&_p]:mb-3 [&_a]:text-accent [&_a]:underline [&_a:hover]:text-accent-hover [&_code]:font-mono [&_code]:text-xs [&_code]:bg-paper [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded [&_pre]:bg-paper [&_pre]:p-4 [&_pre]:rounded-lg [&_pre]:overflow-x-auto [&_pre]:my-4 [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_ul]:list-disc [&_ul]:list-inside [&_ul]:mb-3 [&_ol]:list-decimal [&_ol]:list-inside [&_ol]:mb-3 [&_li]:mb-1 [&_blockquote]:border-l-2 [&_blockquote]:border-accent/30 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:my-4">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {post.content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
