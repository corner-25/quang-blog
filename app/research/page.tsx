import type { Metadata } from "next";
import { Section, SectionHeader } from "@/components/section";
import { PressSection, ResearchPreview } from "@/components/home-sections";

export const metadata: Metadata = {
  title: "Nghiên cứu & Báo chí",
  description:
    "Các bài báo khoa học, tham luận hội nghị và những lần báo chí Việt Nam nhắc đến hành trình của Dương Hữu Quang.",
};

export default function ResearchPage() {
  return (
    <>
      <Section className="pt-28 md:pt-36 pb-6">
        <SectionHeader
          eyebrow="Nghiên cứu & Báo chí"
          title="Khi câu chữ đi xa hơn người viết."
          description="Bắt đầu từ một khoá luận tốt nghiệp, rồi đến những bài báo trên truyền thông — đây là nơi tổng hợp lại tất cả."
        />
      </Section>
      <ResearchPreview />
      <PressSection />
    </>
  );
}
