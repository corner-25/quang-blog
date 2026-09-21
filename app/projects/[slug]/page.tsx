import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Building2,
  UserCheck,
  Layers,
  Server,
  Cpu,
  Database,
  ExternalLink,
} from "lucide-react";
import { Section } from "@/components/section";
import {
  getAllProjectSlugs,
  getProjectBySlug,
  projectsData,
} from "@/data/projects";

function GithubIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Dự án không tồn tại" };

  return {
    title: `${project.title} — Case Study`,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  // Find next/prev project
  const currentIndex = projectsData.findIndex((p) => p.slug === slug);
  const prevProject = currentIndex > 0 ? projectsData[currentIndex - 1] : null;
  const nextProject =
    currentIndex < projectsData.length - 1 ? projectsData[currentIndex + 1] : null;

  return (
    <article className="pt-24 pb-20 md:pt-32">
      <Section>
        {/* Back Link */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Tất cả dự án
          </Link>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-accent">
              {project.category}
            </span>
            {project.highlight && (
              <span className="inline-flex items-center rounded-full bg-amber-500/15 px-2.5 py-0.5 text-xs font-semibold text-amber-500 dark:text-amber-400">
                Nổi bật
              </span>
            )}
          </div>
        </div>

        {/* Hero Header */}
        <div className="max-w-4xl">
          <h1 className="font-heading text-3xl font-extrabold tracking-tight md:text-5xl lg:text-6xl text-foreground">
            {project.title}
          </h1>
          <p className="mt-4 font-sans text-lg md:text-xl font-medium text-accent">
            {project.subtitle}
          </p>

          <div className="mt-6 flex flex-wrap gap-4 text-sm text-muted-foreground border-y border-border py-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-accent" />
              <span>{project.year}</span>
            </div>
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-accent" />
              <span>{project.org}</span>
            </div>
            <div className="flex items-center gap-2">
              <UserCheck className="h-4 w-4 text-accent" />
              <span>{project.role}</span>
            </div>
          </div>
        </div>

        {/* Metrics Overview */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 max-w-4xl">
            {project.metrics.map((m) => (
              <div
                key={m.label}
                className="relative overflow-hidden rounded-2xl border border-accent/25 bg-card/60 p-5 shadow-sm"
              >
                <div className="absolute top-0 right-0 h-16 w-16 bg-accent/10 rounded-full blur-xl" />
                <div className="font-heading text-2xl font-bold text-accent md:text-3xl">
                  {m.value}
                </div>
                <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground font-medium">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Main Content Grid */}
        <div className="mt-12 grid gap-10 lg:grid-cols-12 max-w-5xl">
          {/* Left / Main Details */}
          <div className="space-y-10 lg:col-span-8">
            {/* Overview / Summary */}
            <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-accent">
                Tổng quan Case Study
              </h2>
              <p className="mt-3 text-base md:text-lg leading-relaxed text-foreground">
                {project.summary}
              </p>
            </div>

            {/* The Challenge */}
            <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-red-500 dark:text-red-400">
                <span className="h-2 w-2 rounded-full bg-current" />
                Bài toán thực tế & Thách thức
              </div>
              <p className="mt-4 text-sm md:text-base leading-relaxed text-muted-foreground">
                {project.challenge}
              </p>
            </div>

            {/* The Solution */}
            <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-emerald-500 dark:text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-current" />
                Giải pháp & Chiến lược kỹ thuật
              </div>
              <p className="mt-4 text-sm md:text-base leading-relaxed text-muted-foreground">
                {project.solution}
              </p>
            </div>

            {/* Key Features */}
            {project.keyFeatures && project.keyFeatures.length > 0 && (
              <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
                <h2 className="text-xs font-semibold uppercase tracking-widest text-accent">
                  Chức năng & Phân hệ tiêu biểu
                </h2>
                <ul className="mt-5 space-y-3.5">
                  {project.keyFeatures.map((feat, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm md:text-base">
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      <span className="text-foreground/90 leading-relaxed">
                        {feat}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right Sidebar: Tech Specs & Links */}
          <div className="space-y-6 lg:col-span-4">
            {/* Action Card */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Tài nguyên & Mã nguồn
              </h3>
              <div className="mt-4 space-y-3">
                {project.githubUrl ? (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-foreground px-4 py-3 text-sm font-medium text-background hover:opacity-90 transition"
                  >
                    <GithubIcon className="h-4 w-4" />
                    Xem trên GitHub
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                ) : project.isPrivate ? (
                  <div className="rounded-xl border border-border/80 bg-muted/40 p-3 text-center text-xs text-muted-foreground">
                    <strong>Dự án bảo mật nội bộ</strong>
                    <div className="mt-1 text-[11px]">
                      Mã nguồn thuộc quyền sở hữu của đơn vị y tế.
                    </div>
                  </div>
                ) : null}

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-border px-4 py-3 text-sm font-medium text-foreground hover:bg-muted transition"
                  >
                    Xem sản phẩm thực tế
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>

            {/* Architecture Details */}
            {project.architecture && (
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Kiến trúc hệ thống
                </h3>
                <div className="mt-4 space-y-3.5 text-xs">
                  {project.architecture.frontend && (
                    <div className="border-b border-border/60 pb-3">
                      <div className="flex items-center gap-1.5 font-semibold text-foreground">
                        <Layers className="h-3.5 w-3.5 text-accent" />
                        Frontend
                      </div>
                      <div className="mt-1 text-muted-foreground">
                        {project.architecture.frontend}
                      </div>
                    </div>
                  )}

                  {project.architecture.backend && (
                    <div className="border-b border-border/60 pb-3">
                      <div className="flex items-center gap-1.5 font-semibold text-foreground">
                        <Server className="h-3.5 w-3.5 text-accent" />
                        Backend
                      </div>
                      <div className="mt-1 text-muted-foreground">
                        {project.architecture.backend}
                      </div>
                    </div>
                  )}

                  {project.architecture.aiEngine && (
                    <div className="border-b border-border/60 pb-3">
                      <div className="flex items-center gap-1.5 font-semibold text-foreground">
                        <Cpu className="h-3.5 w-3.5 text-accent" />
                        AI Pipeline
                      </div>
                      <div className="mt-1 text-muted-foreground">
                        {project.architecture.aiEngine}
                      </div>
                    </div>
                  )}

                  {project.architecture.database && (
                    <div className="border-b border-border/60 pb-3">
                      <div className="flex items-center gap-1.5 font-semibold text-foreground">
                        <Database className="h-3.5 w-3.5 text-accent" />
                        Database
                      </div>
                      <div className="mt-1 text-muted-foreground">
                        {project.architecture.database}
                      </div>
                    </div>
                  )}

                  {project.architecture.deployment && (
                    <div>
                      <div className="flex items-center gap-1.5 font-semibold text-foreground">
                        Deployment
                      </div>
                      <div className="mt-1 text-muted-foreground">
                        {project.architecture.deployment}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Tech stack badges */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Tech Stack
              </h3>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-border bg-muted/60 px-2.5 py-1 text-xs font-mono text-foreground"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation prev/next */}
        <div className="mt-16 border-t border-border pt-8 max-w-5xl flex items-center justify-between gap-4">
          {prevProject ? (
            <Link
              href={`/projects/${prevProject.slug}`}
              className="group flex flex-col items-start"
            >
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-1" />
                Dự án trước
              </span>
              <span className="mt-1 font-heading text-sm font-semibold text-foreground group-hover:text-accent transition">
                {prevProject.title}
              </span>
            </Link>
          ) : <div />}

          {nextProject ? (
            <Link
              href={`/projects/${nextProject.slug}`}
              className="group flex flex-col items-end"
            >
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                Dự án tiếp theo
                <ArrowLeft className="h-3 w-3 rotate-180 transition-transform group-hover:translate-x-1" />
              </span>
              <span className="mt-1 font-heading text-sm font-semibold text-foreground group-hover:text-accent transition">
                {nextProject.title}
              </span>
            </Link>
          ) : <div />}
        </div>
      </Section>
    </article>
  );
}
