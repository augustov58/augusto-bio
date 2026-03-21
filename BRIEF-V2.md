# Augusto Valbuena — Personal Bio & Portfolio Site — V2

## Design Philosophy: Retro Desktop OS Metaphor
The ENTIRE site should look and behave like a **retro desktop operating system** — think classic Mac OS / Windows 95 crossed with a warm paper/cardboard aesthetic. This is NOT a conventional modern website. It's an interactive desktop environment.

## Reference: PostHog.com
PostHog's website is built as a desktop OS:
- **Paper/cardboard textured background** (not flat color — use a subtle paper texture CSS pattern or image)
- **Desktop icons** arranged on left sidebar and right sidebar — pixel-art style with labels underneath
- **Clicking an icon opens a "window"** — a draggable, resizable panel with:
  - Title bar (with icon + filename)
  - Window controls (minimize ─, maximize □, close ✕)
  - Optional toolbar (like a text editor toolbar)
  - Content area inside
- **Top menu bar** — like a classic OS menu bar with dropdown menus
- **Isometric pixel art** illustrations on the desktop
- **File-naming convention** — pages are named like files (home.mdx, about.txt, projects/)

## Tech Stack
- Next.js 14 (App Router)
- Tailwind CSS
- TypeScript
- Framer Motion (for drag, animations)
- Deploy to Vercel

## Color Palette
- **Background:** Warm paper/cardboard texture — base `#E8E2D6` or `#EEEFE9` with CSS noise/texture overlay
- **Window chrome:** `#F5F0E8` (warm light)
- **Window title bar:** `#D4CFC4` (slightly darker warm gray)
- **Primary text:** `#1D2939` (dark charcoal)
- **Secondary text:** `#475467`
- **Accent/links:** `#F54E00` (orange-red, like PostHog)
- **Accent hover:** `#E04400`
- **Window borders:** `#B8B3A8`
- **Active window shadow:** soft warm shadow

## Typography
- Headings: `Plus Jakarta Sans` — bold, clean
- Body: `Inter` — readable, modern
- Mono: `JetBrains Mono` — for code/filenames
- Icon labels: Small, centered under icons, mono or sans

## Core Components

### 1. Desktop Background
- Full-screen paper/cardboard texture
- Subtle noise overlay for realism
- CSS-based (no heavy image file needed — use repeating patterns)

### 2. Top Menu Bar
Fixed at top. Items:
- **🏠 AV** (logo/home) — left side
- **About** — dropdown with: Bio, Skills, Experience
- **Projects** — dropdown with: Sparkplan, MiCasaVenezuela, AI Experiments, GPU Tracker
- **Writing** — dropdown with: All Posts, Tags
- **Contact** — dropdown with: Email, GitHub, LinkedIn
- **More** — dropdown with: Resume, Fun stuff

Style: Flat menu bar like classic Mac. Hover shows dropdown. Dropdowns have clean list items with optional icons.

### 3. Desktop Icons (Left Sidebar)
Arranged vertically on the left side. Each icon is:
- A pixel-art style icon (64x64 or similar) — use emoji or SVG illustrations
- Label text underneath (centered, small)
- **Clickable** — opens corresponding window
- **Draggable** (nice-to-have, use Framer Motion)

Icons:
| Icon | Label | Action |
|------|-------|--------|
| 📄 | about.md | Opens About window |
| 📁 | Projects | Opens Projects window |
| ✏️ | Writing | Opens Writing window |
| 📧 | Contact | Opens Contact window |
| 🎬 | demo.mov | Opens a demo/intro video or animation |
| 📋 | resume.pdf | Opens resume or links to PDF |

### 4. Desktop Icons (Right Sidebar)
| Icon | Label | Action |
|------|-------|--------|
| ⭐ | Why Me? | Opens a "why hire me" window |
| 🔗 | GitHub | External link to github.com/augustov58 |
| 🛠️ | Tools | Opens tools/tech stack window |

### 5. Window Component (CRITICAL)
This is the main UI element. When an icon is clicked, a window opens:

**Window anatomy:**
```
┌─────────────────────────────────────┐
│ [icon] filename.ext          ─ □ ✕  │  ← Title bar (draggable)
├─────────────────────────────────────┤
│ ◀ ▶ | [toolbar items...]           │  ← Optional toolbar
├─────────────────────────────────────┤
│                                     │
│         Content goes here           │  ← Scrollable content area
│                                     │
└─────────────────────────────────────┘
```

**Behaviors:**
- **Draggable** — click and drag title bar to move (Framer Motion)
- **Close button** — closes/hides window
- **Minimize** — collapses to just title bar or hides
- **Maximize** — expands to fill viewport (with animation)
- **Z-index management** — clicking a window brings it to front
- **Default positions** — each window opens at a slightly different position (cascading)
- **Responsive** — on mobile, windows are full-screen by default

### 6. Window Content Types

**About Window (about.md):**
- Rendered like a markdown document inside the window
- Bio, professional background, interests
- Has a text-editor toolbar (fake, decorative — bold, italic, font dropdown)

**Projects Window:**
- Grid of project cards inside the window, each with:
  - Pixel-art or emoji icon
  - Project name
  - Short description
  - Tech stack tags
  - Link to live site
- Looks like a file browser / Finder window with icon view

**Writing Window:**
- Blog post list (pulls from Notion API)
- Each post is a row: date, title, tags
- Clicking a post opens a NEW window with the full post content
- Post window has the text-editor toolbar aesthetic

**Contact Window:**
- Interactive cards for each contact method
- GitHub, Email, LinkedIn
- Clean, minimal

**Tools/Stack Window:**
- Grid of technology icons
- Categories: Languages, Frameworks, Tools, Cloud

### 7. Desktop Decorations
- **Isometric pixel art** — a small illustration on the desktop (bottom-right area like PostHog)
- Can be a simple SVG/illustration of a desk, computer, or tools
- Optional: animated elements (spinning gear, blinking cursor)

### 8. Main Content Window (home.mdx)
On page load, a main window should be open by default (like PostHog's home.mdx):
- Title: "home.mdx"
- Contains: Hero text, intro, featured projects, quick links
- Has the fake toolbar (Zoom, Bold, Italic, Font dropdowns)
- This is the "landing page" content but presented inside a window

## Interaction Design

### Window Management
- Multiple windows can be open simultaneously
- Click a window to bring to front (z-index management)
- Windows cascade when opened (each offset 30px down and right from previous)
- Escape key closes active window
- Double-click icon to open window

### Mobile Behavior
- Desktop icons become a horizontal scrollable strip or a grid
- Windows open full-screen (like apps)
- Top menu bar becomes a hamburger menu
- Swipe gestures to close windows

### Animations
- Window open: scale from 0.9 to 1.0 with slight fade-in (fast, ~200ms)
- Window close: reverse
- Icon hover: slight scale up (1.05)
- Menu dropdown: slide down with fade
- All animations via Framer Motion

## Data Sources
- **Blog posts:** Notion API (database ID: 32a92c99182b80378f0ae49dc992b698)
  - Columns: Note Title (title), Status (select), Category (select), Created (created_time), Description (rich_text), Slug (text), Tags (multi-select), Published (date)
  - Filter: Status = "Published"
- **Projects:** Hardcoded in data file (projects.ts)
- **About/Contact:** Hardcoded in components

## Content

### About
- Name: Augusto Valbuena
- Title: Electrical Engineer · Builder · Tinkerer
- Bio: PE-licensed electrical engineer in Florida doing construction design by day. By night, I build AI-powered tools, automate things that shouldn't be manual, and tinker with whatever catches my interest.
- Venezuelan roots, based in Kissimmee FL area.

### Projects
1. **Sparkplan** — AI-powered electrical design platform for code compliance. Streamlines NEC calculations, panel schedules, and EV charging system design. [sparkplan.app] Tags: Next.js, Python, AI, SaaS
2. **MiCasaVenezuela** — Real estate portal for the Venezuelan market. Automated scraping pipeline with AI-powered listing enrichment. [micasavenezuela.com] Tags: Next.js, Supabase, Python
3. **AI Experiments** — Collection of AI and automation tools: crypto research bots, deal finders, PDF form filling. Tags: Python, OpenAI, Automation
4. **GPU Deal Finder** — eBay price tracker using Browse API with smart filtering. Tags: Python, eBay API

### Contact
- GitHub: augustov58
- Email: augustovalbuena@gmail.com (or contact form)

## File Structure
```
src/
├── app/
│   ├── layout.tsx          # Desktop layout with background texture
│   ├── page.tsx            # Desktop with icons + default open window
│   └── globals.css         # Paper texture, noise overlay
├── components/
│   ├── Desktop.tsx         # Main desktop container
│   ├── DesktopIcon.tsx     # Individual draggable icon
│   ├── Window.tsx          # Window component (draggable, closable, z-index)
│   ├── WindowManager.tsx   # State management for open windows
│   ├── MenuBar.tsx         # Top OS-style menu bar
│   ├── MenuDropdown.tsx    # Dropdown menus
│   ├── Toolbar.tsx         # Fake text-editor toolbar
│   ├── AboutContent.tsx    # About window content
│   ├── ProjectsContent.tsx # Projects grid content
│   ├── WritingContent.tsx  # Blog post list content
│   ├── PostContent.tsx     # Individual blog post content
│   ├── ContactContent.tsx  # Contact info content
│   └── PixelArt.tsx        # Decorative isometric art
├── lib/
│   └── notion.ts           # Notion API integration
├── data/
│   └── projects.ts         # Hardcoded project data
├── hooks/
│   └── useWindowManager.ts # Window state management hook
└── styles/
    └── paper-texture.css   # Background texture styles
```

## Key Technical Notes
- Use `react-rnd` or Framer Motion for drag + resize on windows
- Window state: { id, title, icon, isOpen, isMinimized, isMaximized, position: {x, y}, size: {w, h}, zIndex }
- Global state via React Context or zustand for window management
- Paper texture: CSS-only using gradients + noise filter, or a small tiling image
- Icons: Use emoji initially, can upgrade to custom pixel art SVGs later
- Ensure proper Next.js SSR — window interactions should be client-side only
