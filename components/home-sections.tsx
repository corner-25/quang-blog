"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Award,
  Briefcase,
  GraduationCap,
  Newspaper,
} from "lucide-react";
import { Section, SectionHeader } from "./section";
import { education, experience, press, research } from "@/data/profile";

const stagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
};
const itemUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

export function EducationSection() {
  const edu = education[0];
  return (
    <Section id="education">
      <SectionHeader
        eyebrow="Học vấn"
        title="Nền tảng học thuật."
      />

      <div className="grid gap-8 lg:grid-cols-5">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-2 rounded-2xl border border-border bg-card p-6"
        >
          <div className="flex items-start gap-3">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent-soft text-accent">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <h3 className="font-display text-xl font-bold leading-tight">
                {edu.school}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {edu.degree} · {edu.period}
              </p>
            </div>
          </div>
          <ul className="mt-5 space-y-2 text-sm">
            {edu.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2">
                <Award className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-3 rounded-2xl border border-border bg-card p-6"
        >
          <div className="text-xs font-semibold uppercase tracking-wider text-accent">
            Khoá luận tốt nghiệp · {edu.thesis.score}
          </div>
          <h3 className="mt-2 font-display text-xl font-bold leading-snug">
            {edu.thesis.title}
          </h3>
          <p className="mt-1 text-xs italic text-muted-foreground">
            {edu.thesis.titleEn}
          </p>
          <ul className="mt-5 space-y-2.5 text-sm leading-relaxed">
            {edu.thesis.bullets.map((b) => (
              <li key={b} className="flex gap-2">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                <span className="text-muted-foreground">{b}</span>
              </li>
            ))}
          </ul>
          <p className="mt-5 border-l-2 border-accent pl-4 text-sm italic">
            {edu.thesis.conclusion}
          </p>
        </motion.div>
      </div>
    </Section>
  );
}

export function ExperienceSection() {
  return (
    <Section id="experience">
      <SectionHeader
        eyebrow="Kinh nghiệm"
        title="Công việc tôi đang theo đuổi."
      />
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="space-y-5"
      >
        {experience.map((e) => (
          <motion.div
            key={e.company + e.period}
            variants={itemUp}
            className="group flex gap-5 rounded-2xl border border-border bg-card p-6 transition hover:border-accent/60"
          >
            <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent sm:inline-flex">
              <Briefcase className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="font-display text-lg font-bold">
                  {e.role} · {e.company}
                </h3>
                <span className="text-sm text-muted-foreground">
                  {e.period}
                </span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                {e.location}
              </p>
              <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                {e.bullets.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}

export function ResearchPreview() {
  return (
    <Section id="research">
      <SectionHeader
        eyebrow="Nghiên cứu khoa học"
        title="Nghiên cứu bắt đầu từ thực tiễn."
        description="Tôi theo đuổi những câu hỏi nảy sinh từ dữ liệu và hoạt động y tế, với mục tiêu tạo ra kết quả có giá trị học thuật và khả năng ứng dụng."
      />

      <div className="grid gap-5 md:grid-cols-2">
        {research.map((r) => (
          <motion.div
            key={r.title}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.45 }}
            className="rounded-2xl border border-border bg-card p-6"
          >
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent">
              <Newspaper className="h-3.5 w-3.5" /> {r.year}
            </div>
            <h3 className="mt-2 font-display text-lg font-bold leading-snug">
              {r.title}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">{r.venue}</p>
            <p className="mt-3 text-sm text-muted-foreground italic">{r.note}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

export function PressSection() {
  const articles = press.filter((p) => p.kind === "article");
  const fbPosts = press.filter((p) => p.kind === "facebook");

  return (
    <Section id="press">
      <SectionHeader
        eyebrow="Báo chí nói về tôi"
        title="Khi câu chuyện vượt ra ngoài bản thân."
      />

      <div className="space-y-10">
        <div>
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Báo chí · Tạp chí
          </h3>
          <motion.ul
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="divide-y divide-border rounded-2xl border border-border bg-card"
          >
            {articles.map((p) => (
              <motion.li key={p.url} variants={itemUp}>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between gap-4 px-6 py-5 transition hover:bg-muted"
                >
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-semibold uppercase tracking-wider text-accent">
                      {p.outlet}
                    </div>
                    <h3 className="mt-1 font-medium leading-snug group-hover:text-accent transition">
                      {p.title}
                    </h3>
                  </div>
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-muted-foreground transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                </a>
              </motion.li>
            ))}
          </motion.ul>
        </div>

        <div>
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Trên Facebook
          </h3>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="grid gap-4 md:grid-cols-2"
          >
            {fbPosts.map((p) => (
              <motion.a
                key={p.url}
                variants={itemUp}
                href={p.url}
                target="_blank"
                rel="noreferrer"
                className="group flex items-start gap-4 rounded-2xl border border-border bg-card p-5 transition hover:-translate-y-1 hover:border-accent/60 hover:shadow-[0_8px_30px_-10px_rgba(56,189,248,0.3)]"
              >
                <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-4 w-4"
                    aria-hidden
                  >
                    <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.14 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.9 3.78-3.9 1.09 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.44 2.91h-2.34V22c4.78-.8 8.43-4.94 8.43-9.94Z" />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-semibold uppercase tracking-wider text-accent">
                    {p.outlet}
                  </div>
                  <h4 className="mt-1 text-sm font-medium leading-snug group-hover:text-accent transition">
                    {p.title}
                  </h4>
                </div>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
