import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import { Section } from "@/components/section";
import { getAllBlogSlugs, getBlogPost } from "@/lib/content";
import { formatDate } from "@/lib/utils";

export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return { title: "Không tìm thấy bài viết" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();

  return (
    <article>
      <Section className="pt-24 md:pt-32 pb-6">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition"
        >
          <ArrowLeft className="h-4 w-4" /> Tất cả bài viết
        </Link>

        <div className="mt-8 max-w-3xl">
          {post.tags.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {post.tags.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1 rounded-full bg-accent-soft px-2.5 py-1 text-[11px] font-medium text-accent"
                >
                  <Tag className="h-3 w-3" />
                  {t}
                </span>
              ))}
            </div>
          )}
          <h1 className="font-display text-4xl font-bold tracking-tight leading-[1.1] md:text-5xl">
            {post.title}
          </h1>
          <div className="mt-5 flex items-center gap-5 text-sm text-muted-foreground">
            <div className="inline-flex items-center gap-1.5">
              <Calendar className="h-4 w-4" /> {formatDate(post.date)}
            </div>
            <div className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" /> {post.readingTimeMin} phút đọc
            </div>
          </div>
        </div>
      </Section>

      <Section className="pt-2 pb-24">
        <div
          className="prose-custom"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />

        <div className="mt-16 border-t border-border pt-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition"
          >
            <ArrowLeft className="h-4 w-4" /> Quay lại tất cả bài viết
          </Link>
        </div>
      </Section>
    </article>
  );
}
