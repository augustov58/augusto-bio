export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
}

export const posts: Post[] = [
  {
    slug: "building-a-real-estate-scraping-pipeline",
    title: "Building a Real Estate Scraping Pipeline",
    excerpt:
      "How I built an automated scraping system for Venezuelan real estate listings — from data collection to AI enrichment to a live portal.",
    date: "2024-12-15",
    readTime: "8 min",
    tags: ["Python", "Scraping", "Supabase"],
  },
  {
    slug: "ai-powered-electrical-code-compliance",
    title: "Why AI-Powered Electrical Code Compliance Matters",
    excerpt:
      "The NEC is thousands of pages long. AI can help electricians and inspectors navigate it in seconds. Here's why that matters.",
    date: "2024-11-20",
    readTime: "6 min",
    tags: ["AI", "NEC", "Electrical"],
  },
  {
    slug: "notes-on-crypto-research-automation",
    title: "Notes on Crypto Research Automation",
    excerpt:
      "I built a bot that monitors on-chain activity and aggregates research from multiple sources. Here's what I learned along the way.",
    date: "2024-10-08",
    readTime: "5 min",
    tags: ["Crypto", "Python", "Automation"],
  },
];
