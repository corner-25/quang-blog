import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import readingTime from "reading-time";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");
const TIMELINE_DIR = path.join(process.cwd(), "content", "timeline");

export type BlogMeta = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  readingTimeMin: number;
};

export type BlogPost = BlogMeta & { html: string };

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

export function getAllBlogSlugs(): string[] {
  ensureDir(BLOG_DIR);
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"))
    .map((f) => f.replace(/\.(md|mdx)$/, ""));
}

export function getAllBlogPosts(): BlogMeta[] {
  const slugs = getAllBlogSlugs();
  const posts = slugs.map((slug) => {
    const { meta } = readBlogFile(slug);
    return meta;
  });
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

function readBlogFile(slug: string): { meta: BlogMeta; content: string } {
  const mdPath = path.join(BLOG_DIR, `${slug}.md`);
  const mdxPath = path.join(BLOG_DIR, `${slug}.mdx`);
  const filePath = fs.existsSync(mdPath) ? mdPath : mdxPath;
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const stats = readingTime(content);

  const meta: BlogMeta = {
    slug,
    title: String(data.title ?? slug),
    excerpt: String(data.excerpt ?? content.slice(0, 180).trim() + "…"),
    date: String(data.date ?? new Date().toISOString().slice(0, 10)),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    readingTimeMin: Math.max(1, Math.round(stats.minutes)),
  };

  return { meta, content };
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const { meta, content } = readBlogFile(slug);
    const processed = await remark().use(html).process(content);
    return { ...meta, html: processed.toString() };
  } catch {
    return null;
  }
}

export function getAllTags(): string[] {
  const set = new Set<string>();
  for (const p of getAllBlogPosts()) p.tags.forEach((t) => set.add(t));
  return [...set].sort();
}

// ───────────── Timeline ─────────────

export type TimelineItem = {
  slug: string;
  title: string;
  date: string;
  location?: string;
  image?: string;
  body: string;
};

export function getAllTimelineItems(): TimelineItem[] {
  ensureDir(TIMELINE_DIR);
  const files = fs
    .readdirSync(TIMELINE_DIR)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));

  const items: TimelineItem[] = files.map((f) => {
    const slug = f.replace(/\.(md|mdx)$/, "");
    const raw = fs.readFileSync(path.join(TIMELINE_DIR, f), "utf8");
    const { data, content } = matter(raw);
    return {
      slug,
      title: String(data.title ?? slug),
      date: String(data.date ?? new Date().toISOString().slice(0, 10)),
      location: data.location ? String(data.location) : undefined,
      image: data.image ? String(data.image) : undefined,
      body: content.trim(),
    };
  });

  return items.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}
