import type { Metadata } from "next";
import { Section, SectionHeader } from "@/components/section";
import { TimelineView } from "@/components/timeline-view";
import { getAllTimelineItems } from "@/lib/content";

export const metadata: Metadata = {
  title: "Cột mốc kỷ niệm",
  description:
    "Một dòng thời gian những khoảnh khắc, kỷ niệm và bước ngoặt trong hành trình của Dương Hữu Quang.",
};

export default function TimelinePage() {
  const items = getAllTimelineItems();
  return (
    <>
      <Section className="pt-28 md:pt-36 pb-6">
        <SectionHeader
          eyebrow="Cột mốc kỷ niệm"
          title="Những khoảnh khắc tôi không muốn quên."
          description="Sau mỗi bức ảnh, mỗi cột mốc, là một câu chuyện rất riêng. Tôi giữ chúng ở đây như một cách để cảm ơn quá khứ."
        />
      </Section>
      <Section className="pt-0 pb-24">
        <TimelineView items={items} />
      </Section>
    </>
  );
}
