"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Tag } from "lucide-react";
import type { BlogMeta } from "@/lib/content";
import { formatDate, cn } from "@/lib/utils";

export function BlogList({
  posts,
  allTags,
}: {
  posts: BlogMeta[];
  allTags: string[];
}) {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return posts.filter((p) => {
      const matchTag = activeTag ? p.tags.includes(activeTag) : true;
      const q = query.trim().toLowerCase();
      const matchQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q));
      return matchTag && matchQuery;
    });
  }, [posts, query, activeTag]);

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm bài viết, chủ đề..."
            className="w-full rounded-full border border-border bg-background py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/30"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveTag(null)}
            className={cn(
              "rounded-full border px-3 py-1 text-xs transition",
              !activeTag
                ? "border-foreground bg-foreground text-background"
                : "border-border text-muted-foreground hover:text-foreground"
            )}
          >
            Tất cả
          </button>
          {allTags.map((t) => (
            <button
              type="button"
              key={t}
              onClick={() => setActiveTag(t === activeTag ? null : t)}
              className={cn(
                "inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs transition",
                activeTag === t
                  ? "border-accent bg-accent-soft text-accent"
                  : "border-border text-muted-foreground hover:text-foreground"
              )}
            >
              <Tag className="h-3 w-3" /> {t}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="popLayout">
        {filtered.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="rounded-2xl border border-dashed border-border bg-card p-10 text-center text-muted-foreground"
          >
            Chưa có bài viết phù hợp. Thử từ khoá khác nhé.
          </motion.div>
        ) : (
          <motion.ul layout className="grid gap-5 md:grid-cols-2">
            {filtered.map((p, i) => (
              <motion.li
                layout
                key={p.slug}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, delay: (i % 4) * 0.04 }}
              >
                <Link
                  href={`/blog/${p.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:border-accent/60 hover:shadow-[0_10px_40px_-12px_rgba(56,189,248,0.3)]"
                >
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <time>{formatDate(p.date)}</time>
                    <span className="h-1 w-1 rounded-full bg-muted-foreground/60" />
                    <span>{p.readingTimeMin} phút đọc</span>
                  </div>
                  <h3 className="mt-3 font-display text-xl font-bold leading-snug group-hover:text-accent transition-colors">
                    {p.title}
                  </h3>
                  <p className="mt-3 line-clamp-3 text-sm text-muted-foreground leading-relaxed">
                    {p.excerpt}
                  </p>
                  {p.tags.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-border px-2 py-0.5 text-[10.5px] text-muted-foreground"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                  )}
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
