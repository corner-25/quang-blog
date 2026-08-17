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
    <>
      <Section className="pt-28 md:pt-36 pb-6">
        <SectionHeader
          eyebrow="Dự án"
          title="Giải pháp được xây cho những nhu cầu cụ thể."
          description="Danh mục này ghi lại các sản phẩm tôi đã trực tiếp nghiên cứu, phân tích, thiết kế và phát triển. Mỗi dự án bắt đầu từ một vấn đề thực tế và hướng đến một kết quả có thể sử dụng, đo lường và tiếp tục cải tiến."
        />
      </Section>
      <Section className="pt-0 pb-20">
        <ProjectsGrid projects={projectsByRecent} />
      </Section>
    </>
  );
}
