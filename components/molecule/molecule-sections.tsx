import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import {
  education,
  experience,
  heroStats,
  hobbyNotes,
  profile,
  projectsByRecent,
  research,
} from "@/data/profile";
import type { ProjectCategory, ProjectDetail } from "@/data/projects";
import {
  CATEGORY_COLORS,
  CATEGORY_ORDER,
  COLORS,
  articles,
  facebookPosts,
  keys,
  stations,
} from "./stations";

// Nội dung HTML của 8 trạm. Mỗi dòng mang data-k trùng khoá nguyên tử
// để hover dòng thì nguyên tử phóng to, và ngược lại.

function Dot({ color }: { color: string }) {
  return <span className="mh-dot" style={{ "--dc": color } as CSSProperties} aria-hidden />;
}

function Eyebrow({ index, label }: { index: number; label: string }) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    <div className="mh-eyebrow">
      <span>
        Trạm {pad(index + 1)} / {pad(stations.length)}
      </span>
      {label}
    </div>
  );
}

function Row({ k, color, children, className }: { k: string; color: string; children: ReactNode; className?: string }) {
  return (
    <li className={`mh-row ${className ?? ""}`} data-k={k}>
      <Dot color={color} />
      <div>{children}</div>
    </li>
  );
}

const edu = education[0];
const job = experience[0];

export function LaunchStation() {
  return (
    <div className="mh-panel mh-hero">
      <div className="mh-pill">Xin chào, tôi là Quang.</div>
      <h1 className="mh-h1">{profile.name}</h1>
      <div className="mh-roles">
        {profile.roles.map((r, i) => (
          <span key={r} data-k={keys.role(i)}>
            <Dot color={COLORS.sky} />
            {r}
          </span>
        ))}
      </div>
      <p className="mh-tagline">{profile.tagline}</p>
      <div className="mh-ctas">
        <Link href="/projects" className="mh-btn mh-btn-primary">
          Xem các dự án →
        </Link>
        <Link href="/about" className="mh-btn">
          Đôi nét về tôi
        </Link>
        <Link href="/blog" className="mh-btn">
          Nhân sinh quan
        </Link>
      </div>
      <div className="mh-stats">
        {heroStats.map((s, i) => (
          <div key={s.k} className="mh-stat" data-k={keys.stat(i)}>
            <div className="mh-stat-k">
              <Dot color={COLORS.honor} />
              {s.k}
            </div>
            <div className="mh-stat-v">{s.v}</div>
            <div className="mh-stat-s">{s.sub}</div>
          </div>
        ))}
      </div>
      <div className="mh-hint">Cuộn để khởi hành</div>
    </div>
  );
}

export function AboutStation() {
  return (
    <div className="mh-panel mh-box">
      <Eyebrow index={1} label="Giới thiệu" />
      <h2 className="mh-h2">Một chút về tôi.</h2>
      <p className="mh-desc">{profile.bio}</p>
      <ul className="mh-rows">
        {hobbyNotes.map((h, i) => (
          <Row key={h.label} k={keys.hobby(i)} color={COLORS.bio}>
            <b>{h.label}</b>
            <p>{h.text}</p>
          </Row>
        ))}
      </ul>
      <p className="mh-meta" style={{ marginTop: 16 }}>
        {profile.location}
      </p>
    </div>
  );
}

export function EducationStation() {
  return (
    <div className="mh-panel mh-box">
      <Eyebrow index={2} label="Học vấn" />
      <h2 className="mh-h2">Nền tảng học thuật.</h2>
      <div className="mh-head">
        <b>{edu.school}</b>
        <span className="mh-meta">
          {edu.degree} · {edu.period}
        </span>
      </div>
      <ul className="mh-rows mh-two">
        {edu.highlights.map((h, i) => (
          <Row key={h} k={keys.edu(i)} color={COLORS.honor}>
            <b>{h}</b>
          </Row>
        ))}
      </ul>
      <div className="mh-thesis" data-k={keys.thesis}>
        <div className="mh-thesis-score">Khoá luận tốt nghiệp · {edu.thesis.score}</div>
        <h3>{edu.thesis.title}</h3>
        <p className="mh-en">{edu.thesis.titleEn}</p>
        <ul className="mh-rows">
          {edu.thesis.bullets.map((b, i) => (
            <Row key={b} k={keys.thesisBullet(i)} color={COLORS.thesis}>
              <p>{b}</p>
            </Row>
          ))}
        </ul>
        <p className="mh-concl">{edu.thesis.conclusion}</p>
      </div>
    </div>
  );
}

export function ExperienceStation() {
  return (
    <div className="mh-panel mh-box">
      <Eyebrow index={3} label="Kinh nghiệm" />
      <h2 className="mh-h2">Công việc tôi đang theo đuổi.</h2>
      <div className="mh-head">
        <b>
          {job.role} · {job.company}
        </b>
        <span className="mh-meta">{job.period}</span>
      </div>
      <p className="mh-meta">{job.location}</p>
      <ul className="mh-rows">
        {job.bullets.map((b, i) => (
          <Row key={b} k={keys.exp(i)} color={COLORS.work}>
            <p style={{ color: "var(--foreground)", marginTop: 0 }}>{b}</p>
          </Row>
        ))}
      </ul>
    </div>
  );
}

export function ProjectsStation({
  filter,
  onFilter,
  onOpen,
}: {
  filter: ProjectCategory | null;
  onFilter: (c: ProjectCategory | null) => void;
  onOpen: (p: ProjectDetail) => void;
}) {
  return (
    <div className="mh-panel mh-box">
      <Eyebrow index={4} label="Dự án thực tế" />
      <h2 className="mh-h2">Những gì tôi đã và đang xây dựng.</h2>
      <p className="mh-desc">
        Các sản phẩm dữ liệu và công cụ phần mềm phục vụ trực tiếp cho công tác chuyên môn và vận hành tại Bệnh viện
        Đại học Y Dược TP.HCM cùng các đối tác y tế.
      </p>
      <div className="mh-filters" role="group" aria-label="Lọc dự án theo mảng">
        <button type="button" aria-pressed={filter === null} onClick={() => onFilter(null)}>
          Tất cả <span className="mh-count">{projectsByRecent.length}</span>
        </button>
        {CATEGORY_ORDER.map((c) => (
          <button
            key={c}
            type="button"
            data-k={keys.category(c)}
            aria-pressed={filter === c}
            onClick={() => onFilter(filter === c ? null : c)}
          >
            <Dot color={CATEGORY_COLORS[c]} />
            {c} <span className="mh-count">{projectsByRecent.filter((p) => p.category === c).length}</span>
          </button>
        ))}
      </div>
      <ul className="mh-rows">
        {projectsByRecent.map((p) => (
          <li
            key={p.slug}
            className="mh-row"
            data-k={keys.project(p.slug)}
            hidden={filter !== null && p.category !== filter}
          >
            <Dot color={CATEGORY_COLORS[p.category]} />
            <button type="button" className="mh-proj" onClick={() => onOpen(p)}>
              <span className="mh-proj-top">
                <b>
                  {p.title}
                  {p.highlight && <span className="mh-star">★ Nổi bật</span>}
                </b>
                <span className="mh-year">{p.year}</span>
              </span>
              <p>{p.role}</p>
            </button>
          </li>
        ))}
      </ul>
      <Link href="/projects" className="mh-more">
        Xem tất cả ({projectsByRecent.length} dự án) →
      </Link>
    </div>
  );
}

export function ResearchStation() {
  return (
    <div className="mh-panel mh-box">
      <Eyebrow index={5} label="Nghiên cứu khoa học" />
      <h2 className="mh-h2">Nghiên cứu bắt đầu từ thực tiễn.</h2>
      <p className="mh-desc">
        Tôi theo đuổi những câu hỏi nảy sinh từ dữ liệu và hoạt động y tế, với mục tiêu tạo ra kết quả có giá trị học
        thuật và khả năng ứng dụng.
      </p>
      <ul className="mh-rows">
        {research.map((r, i) => (
          <Row key={r.title} k={keys.research(i)} color={COLORS.research} className="mh-rs">
            <span className="mh-year-tag">{r.year}</span>
            <b>{r.title}</b>
            <div className="mh-venue">{r.venue}</div>
            <p>{r.note}</p>
          </Row>
        ))}
      </ul>
    </div>
  );
}

function PressRow({ k, color, outlet, title, url }: { k: string; color: string; outlet: string; title: string; url: string }) {
  return (
    <li className="mh-row mh-press" data-k={k}>
      <Dot color={color} />
      <a href={url} target="_blank" rel="noreferrer" style={{ "--dc": color } as CSSProperties}>
        <span className="mh-outlet">{outlet}</span>
        <b>{title}</b>
        <span className="mh-go">Đọc bài ↗</span>
      </a>
    </li>
  );
}

export function PressStation() {
  return (
    <div className="mh-panel mh-box">
      <Eyebrow index={6} label="Báo chí nói về tôi" />
      <h2 className="mh-h2">Khi câu chuyện vượt ra ngoài bản thân.</h2>
      <div className="mh-subh">Báo chí · Tạp chí</div>
      <ul className="mh-rows" style={{ marginTop: 0 }}>
        {articles.map((p, i) => (
          <PressRow key={p.url} k={keys.article(i)} color={COLORS.press} outlet={p.outlet} title={p.title} url={p.url} />
        ))}
      </ul>
      <div className="mh-subh">Trên Facebook</div>
      <ul className="mh-rows" style={{ marginTop: 0 }}>
        {facebookPosts.map((p, i) => (
          <PressRow key={p.url} k={keys.facebook(i)} color={COLORS.facebook} outlet={p.outlet} title={p.title} url={p.url} />
        ))}
      </ul>
    </div>
  );
}

export function ContactStation() {
  return (
    <div className="mh-panel mh-box">
      <Eyebrow index={7} label="Liên hệ" />
      <h2 className="mh-h2">Bạn muốn cùng tôi xây gì đó?</h2>
      <p className="mh-desc">
        Mình luôn sẵn lòng trò chuyện về dữ liệu y tế, AI ứng dụng, hay đơn giản là một ý tưởng còn dang dở của bạn.
      </p>
      <div className="mh-ctas">
        <a href={`mailto:${profile.email}`} className="mh-btn mh-btn-primary" data-k={keys.mail}>
          Gửi email cho tôi
        </a>
        <Link href="/blog" className="mh-btn" data-k={keys.blog}>
          Đọc bài viết mới nhất
        </Link>
      </div>
      <p className="mh-meta" style={{ marginTop: 14 }}>
        {profile.email}
      </p>
    </div>
  );
}
