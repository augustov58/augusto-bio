import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const n2m = new NotionToMarkdown({ notionClient: notion });

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  tags: string[];
  date: string;
  status: string;
  coverImage?: string;
}

export interface BlogPostWithContent extends BlogPost {
  content: string;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function getPropertyValue(property: Record<string, any> | undefined): string | string[] | number {
  if (!property) return "";
  switch (property.type) {
    case "title":
      return property.title.map((t: Record<string, any>) => t.plain_text).join("");
    case "rich_text":
      return property.rich_text.map((t: Record<string, any>) => t.plain_text).join("");
    case "multi_select":
      return property.multi_select.map((s: Record<string, any>) => s.name);
    case "select":
      return property.select?.name || "";
    case "date":
      return property.date?.start || "";
    case "url":
      return property.url || "";
    case "number":
      return property.number || 0;
    case "created_time":
      return property.created_time || "";
    case "last_edited_time":
      return property.last_edited_time || "";
    case "files":
      if (property.files.length > 0) {
        const file = property.files[0];
        return file.type === "external" ? file.external.url : file.file.url;
      }
      return "";
    default:
      return "";
  }
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function pageToPost(page: Record<string, any>): BlogPost {
  const props = page.properties;
  // Adapt to actual DB columns: Note Title (title), Status (select), Category (select),
  // Reminder (date), Created (created_time), URL (url), Files (files)
  // Also support ideal columns: Title, Slug, Tags, Published, Description
  const title = (getPropertyValue(props["Note Title"] || props["Title"] || props["Name"]) as string) || "Untitled";
  const slug = (getPropertyValue(props["Slug"]) as string) || slugify(title);
  const description = (getPropertyValue(props["Description"]) as string) || "";
  const tags = props["Tags"]
    ? (getPropertyValue(props["Tags"]) as string[])
    : props["Category"]
      ? [getPropertyValue(props["Category"]) as string].filter(Boolean)
      : [];
  const date = (getPropertyValue(props["Published"]) as string)
    || (getPropertyValue(props["Reminder"]) as string)
    || (getPropertyValue(props["Created"]) as string)
    || "";
  const status = (getPropertyValue(props["Status"]) as string) || "";

  return {
    id: page.id,
    slug,
    title,
    description,
    tags,
    date,
    status,
    coverImage: page.cover
      ? page.cover.type === "external"
        ? page.cover.external.url
        : page.cover.file.url
      : undefined,
  };
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export async function getBlogPosts(): Promise<BlogPost[]> {
  const databaseId = process.env.NOTION_BLOG_DB_ID;
  if (!databaseId) return [];

  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: "Status",
        select: {
          equals: "Published",
        },
      },
      sorts: [
        {
          property: "Created",
          direction: "descending",
        },
      ],
    });

    return response.results.map((page) => pageToPost(page as Record<string, unknown>));
  } catch (err) {
    console.error("Failed to fetch blog posts:", err);
    return [];
  }
}

export async function getBlogPost(slug: string): Promise<BlogPostWithContent | null> {
  const allPosts = await getAllBlogPosts();
  const post = allPosts.find((p) => p.slug === slug);

  if (!post) return null;

  const mdBlocks = await n2m.pageToMarkdown(post.id);
  const content = n2m.toMarkdownString(mdBlocks).parent;

  return {
    ...post,
    content,
  };
}

async function getAllBlogPosts(): Promise<BlogPost[]> {
  const databaseId = process.env.NOTION_BLOG_DB_ID;
  if (!databaseId) return [];

  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      sorts: [
        {
          property: "Created",
          direction: "descending",
        },
      ],
    });

    return response.results.map((page) => pageToPost(page as Record<string, unknown>));
  } catch (err) {
    console.error("Failed to fetch all blog posts:", err);
    return [];
  }
}
