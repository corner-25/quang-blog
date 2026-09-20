import type { Metadata } from "next";
import { Section, SectionHeader } from "@/components/section";
import { ProjectsGrid } from "@/components/projects-grid";
import { projectsByRecent } from "@/data/profile";

export const metadata: Metadata = {
  title: "Dự án",
  description:
    "Các dự án tiêu biểu của Dương Hữu Quang trong lĩnh vực dữ liệu, AI, y tế và chuyển đổi số.",
};

export default function ProjectsPage() {
  return (
    <Section className="pt-28 md:pt-36 pb-24">
      <SectionHeader
        eyebrow="Danh mục dự án"
        title="Những sản phẩm và hệ thống tôi từng xây dựng."
        description="Tổng hợp các ứng dụng phần mềm, mô hình dữ liệu và công cụ tự động hóa tôi trực tiếp tham gia thiết kế, phát triển và đưa vào vận hành thực tế."
      />
      <div className="mt-8">
        <ProjectsGrid projects={projectsByRecent} />
      </div>
    </Section>
  );
}
