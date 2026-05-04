import type { Metadata } from "next";
import { Section, SectionHeader } from "@/components/section";
import { BlogList } from "@/components/blog-list";
import { getAllBlogPosts, getAllTags } from "@/lib/content";

export const metadata: Metadata = {
  title: "Nhân sinh quan",
  description:
    "Những suy ngẫm, quan điểm và câu chuyện cá nhân của Dương Hữu Quang về cuộc sống, nghề nghiệp, dữ liệu y tế và hành trình tự học.",
};

export default function BlogIndexPage() {
  const posts = getAllBlogPosts();
  const tags = getAllTags();

  return (
    <>
      <Section className="pt-28 md:pt-36 pb-6">
        <SectionHeader
          eyebrow="Nhân sinh quan"
          title="Những điều tôi nghĩ về thế giới."
          description="Một góc riêng để viết — không phải để hay, mà để thật. Bài mới sẽ được thêm dần theo thời gian."
        />
      </Section>
      <Section className="pt-0 pb-20">
        <BlogList posts={posts} allTags={tags} />
      </Section>
    </>
  );
}
