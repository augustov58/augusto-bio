export interface Project {
  title: string;
  description: string;
  tags: string[];
  href?: string;
  emoji: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    title: "Sparkplan",
    description:
      "AI-powered electrical design platform for code compliance. Streamlines NEC calculations, panel schedules, and EV charging system design.",
    tags: ["Next.js", "Python", "AI", "SaaS"],
    href: "https://sparkplan.app",
    emoji: "⚡",
    featured: true,
  },
  {
    title: "MiCasaVenezuela",
    description:
      "Real estate portal for the Venezuelan market. Automated scraping pipeline with AI-powered listing enrichment and intelligent search.",
    tags: ["Next.js", "Supabase", "Python", "Scraping"],
    href: "https://micasavenezuela.com",
    emoji: "🏠",
    featured: true,
  },
  {
    title: "AI Experiments",
    description:
      "A collection of AI and automation tools — crypto research bots, deal finders, PDF form filling, and more. Always tinkering.",
    tags: ["Python", "OpenAI", "Automation"],
    emoji: "🤖",
    featured: true,
  },
  {
    title: "GPU Deal Finder",
    description:
      "eBay price tracker for GPUs using the Browse API with smart filtering. Finds the best deals so you don't have to refresh all day.",
    tags: ["Python", "eBay API", "Data"],
    emoji: "🎮",
  },
];
