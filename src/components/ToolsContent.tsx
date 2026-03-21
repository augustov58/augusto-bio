'use client';

const toolCategories = [
  {
    name: 'Languages',
    icon: '💻',
    tools: ['TypeScript', 'Python', 'JavaScript', 'SQL'],
  },
  {
    name: 'Frameworks',
    icon: '🏗️',
    tools: ['Next.js', 'React', 'Node.js', 'FastAPI', 'Tailwind CSS'],
  },
  {
    name: 'Data & AI',
    icon: '🤖',
    tools: ['OpenAI API', 'LangChain', 'PostgreSQL', 'Supabase', 'Notion API'],
  },
  {
    name: 'Cloud & DevOps',
    icon: '☁️',
    tools: ['Vercel', 'AWS', 'Docker', 'GitHub Actions', 'Railway'],
  },
  {
    name: 'Tools',
    icon: '🔧',
    tools: ['VS Code', 'Git', 'Figma', 'Postman', 'Claude'],
  },
];

export default function ToolsContent() {
  return (
    <div className="p-5">
      <div className="flex items-center gap-2 mb-4 font-mono text-[10px] text-secondary">
        <span>🛠️</span>
        <span>~/tools.config</span>
      </div>

      <div className="space-y-5">
        {toolCategories.map((category) => (
          <div key={category.name}>
            <h3 className="font-heading font-semibold text-sm text-primary mb-2 flex items-center gap-2">
              <span>{category.icon}</span>
              {category.name}
            </h3>
            <div className="flex flex-wrap gap-2">
              {category.tools.map((tool) => (
                <span
                  key={tool}
                  className="px-2.5 py-1.5 text-xs font-mono bg-paper border border-window-border rounded-md text-secondary hover:border-accent/30 hover:text-accent transition-colors cursor-default"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="font-mono text-[10px] text-secondary/40 mt-5 pt-3 border-t border-window-border">
        {toolCategories.reduce((acc, c) => acc + c.tools.length, 0)} tools configured
      </div>
    </div>
  );
}
