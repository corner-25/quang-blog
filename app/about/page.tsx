import type { Metadata } from "next";
import Link from "next/link";
import {
  BookOpen,
  PenLine,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { EducationSection, ExperienceSection } from "@/components/home-sections";
import { Section } from "@/components/section";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "Giới thiệu — Dương Hữu Quang",
  description:
    "Hành trình của Dương Hữu Quang — từ 2 năm bỏ học chạy xe ôm đến thủ khoa Bách Khoa TP.HCM và kỹ sư AI tại Bệnh viện Đại học Y Dược TP.HCM.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero Header */}
      <Section className="pt-28 md:pt-36 pb-12">
        <div className="max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent font-mono">
            Câu chuyện & Hành trình
          </span>
          <h1 className="mt-4 font-heading text-4xl font-extrabold tracking-tight md:text-6xl text-foreground">
            {profile.name}
          </h1>
          <p className="mt-4 text-xl font-medium text-accent">
            {profile.tagline}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {profile.roles.map((r) => (
              <span
                key={r}
                className="rounded-full border border-border bg-card px-3.5 py-1 text-xs font-medium text-muted-foreground shadow-sm"
              >
                {r}
              </span>
            ))}
          </div>
        </div>

        {/* Narrative Storytelling Card */}
        <div className="mt-12 rounded-3xl border border-border bg-card p-8 md:p-12 shadow-sm space-y-6 text-base md:text-lg leading-relaxed text-muted-foreground">
          <h2 className="font-heading text-2xl font-bold text-foreground">
            Làm công nghệ bằng sự thấu hiểu và tính kỷ luật.
          </h2>
          <p>
            {profile.bio}
          </p>
          <p>
            Trước khi quay lại giảng đường, tôi từng có hai năm tạm gác việc học để mưu sinh bằng nghề giao hàng và chạy xe ôm công nghệ khắp các nẻo đường TP.HCM. Những tháng ngày ấy rèn cho tôi sự kiên nhẫn, sức chịu đựng và quan trọng nhất: nhìn nhận cuộc sống một cách chân thật, không ảo tưởng.
          </p>
          <p>
            Khi trở lại Trường Đại học Bách khoa (ĐHQG TP.HCM), tôi dành toàn bộ sự tập trung cho hướng đi Tin học Y tế và Khoa học Dữ liệu. Với tôi, mỗi thuật toán hay mô hình dự báo không phải để phô diễn kỹ thuật, mà nhằm trả lời một câu hỏi cụ thể: làm sao để nhân viên y tế bớt vất vả, người bệnh bớt chờ đợi và quy trình trong bệnh viện vận hành trơn tru hơn.
          </p>
          <p>
            Tôi hoàn thành chương trình đại học với danh hiệu <strong>Thủ khoa chuyên ngành</strong>, <strong>GPA 3.8/4.0</strong> và điểm khóa luận tốt nghiệp <strong>9.5/10</strong> (điểm cao nhất khoa). Hiện tại ở Bệnh viện Đại học Y Dược TP.HCM, tôi tiếp tục công việc mình yêu thích: phân tích dữ liệu lâm sàng, phát triển các công cụ hỗ trợ điều hành và tìm kiếm lời giải cho những bài toán y tế từ chính thực tế mỗi ngày.
          </p>

          <div className="pt-4 flex flex-wrap gap-4 border-t border-border">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background hover:opacity-90 transition"
            >
              Xem các dự án thực tế <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/research"
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground hover:bg-muted transition"
            >
              Bài báo khoa học & Báo chí
            </Link>
          </div>
        </div>

        {/* Personal Values & Hobbies */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            {
              icon: PenLine,
              label: "Viết lách & Chiêm nghiệm",
              text: "Viết là cách tôi đối thoại với chính mình, ghi lại những bài học trên con đường nghề nghiệp và nhân sinh quan.",
            },
            {
              icon: BookOpen,
              label: "Đọc sách & Nghiên cứu",
              text: "Mỗi cuốn sách, mỗi bài báo khoa học là một cuộc đời đi mượn, giúp mở rộng góc nhìn và sự khiêm nhường.",
            },
            {
              icon: Sparkles,
              label: "Vibe coding & Thực thi",
              text: "Không dừng lại ở mô hình lý thuyết trên giấy. Mọi dòng code viết ra phải phục vụ một bài toán thật có thể dùng được.",
            },
          ].map(({ icon: Icon, label, text }) => (
            <div
              key={label}
              className="rounded-2xl border border-border bg-card p-6 shadow-sm"
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-heading font-bold text-foreground">
                {label}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {text}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <EducationSection />
      <ExperienceSection />
    </>
  );
}
