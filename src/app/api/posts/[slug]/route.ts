import { NextResponse } from 'next/server';
import { getBlogPost } from '@/lib/notion';

export async function GET(
  _request: Request,
  { params }: { params: { slug: string } }
) {
  const post = await getBlogPost(params.slug);

  if (!post) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }

  return NextResponse.json(post);
}
