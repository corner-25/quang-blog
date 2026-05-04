import type { Metadata } from "next";
import { Section, SectionHeader } from "@/components/section";
import { ProjectsGrid } from "@/components/projects-grid";
import { projects } from "@/data/profile";

export const metadata: Metadata = {
  title: "Dự án",
  description:
    "Tổng hợp các dự án đã được Dương Hữu Quang phụ trách solo từ đầu đến cuối — từ phân tích yêu cầu, thiết kế, lập trình đến triển khai.",
};

export default function ProjectsPage() {
  return (
    <>
      <Section className="pt-28 md:pt-36 pb-6">
        <SectionHeader
          eyebrow="Dự án"
          title="Tất cả những thứ tôi đã xây."
          description="Mỗi dự án dưới đây tôi đều một mình phụ trách trọn vẹn — không có team. Đó là cách tôi học cách chịu trách nhiệm với từng dòng code, từng quyết định kiến trúc, và từng buổi đào tạo người dùng."
        />
      </Section>
      <Section className="pt-0 pb-20">
        <ProjectsGrid projects={projects} />
      </Section>
    </>
  );
}
