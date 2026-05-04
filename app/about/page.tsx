import type { Metadata } from "next";
import {
  AboutPreview,
  EducationSection,
  ExperienceSection,
} from "@/components/home-sections";
import { Section, SectionHeader } from "@/components/section";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "Giới thiệu",
  description:
    "Hành trình của Dương Hữu Quang — từ giảng đường Bách Khoa đến công việc chuyên viên dữ liệu tại Bệnh viện Đại học Y Dược TP.HCM.",
};

export default function AboutPage() {
  return (
    <>
      <Section className="pt-28 md:pt-36 pb-6">
        <div className="max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Về tôi
          </span>
          <h1 className="mt-3 font-display text-5xl font-bold tracking-tight md:text-6xl">
            {profile.name}
          </h1>
          <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
            {profile.bio}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {profile.roles.map((r) => (
              <span
                key={r}
                className="rounded-full border border-border bg-background/60 px-3 py-1 text-xs text-muted-foreground"
              >
                {r}
              </span>
            ))}
          </div>
        </div>
      </Section>

      <AboutPreview />
      <EducationSection />
      <ExperienceSection />
    </>
  );
}
