import { NextResponse } from 'next/server';
import { getBlogPosts } from '@/lib/notion';

export async function GET() {
  const posts = await getBlogPosts();
  return NextResponse.json(posts);
}
