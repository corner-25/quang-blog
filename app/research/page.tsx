import type { Metadata } from "next";
import { Section, SectionHeader } from "@/components/section";
import { PressSection, ResearchPreview } from "@/components/home-sections";

export const metadata: Metadata = {
  title: "Dấu ấn — Nghiên cứu & Báo chí",
  description:
    "Các bài báo khoa học, tham luận hội nghị và những lần báo chí Việt Nam nhắc đến hành trình của Dương Hữu Quang.",
};

export default function ResearchPage() {
  return (
    <>
      <Section className="pt-28 md:pt-36 pb-6">
        <SectionHeader
          eyebrow="Dấu ấn"
          title="Nghiên cứu, công bố và những dấu mốc được ghi nhận."
          description="Nơi tổng hợp các nghiên cứu hình thành từ dữ liệu thực tiễn, cùng những bài viết báo chí ghi lại hành trình học tập và trưởng thành của tôi."
        />
      </Section>
      <ResearchPreview />
      <PressSection />
    </>
  );
}
