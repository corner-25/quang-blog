import {
  education,
  experience,
  heroStats,
  hobbyNotes,
  press,
  profile,
  projectsByRecent,
  research,
} from "@/data/profile";
import type { ProjectCategory } from "@/data/projects";

// Mỗi trạm của trang chủ là một phân tử: dữ liệu là các nguyên tử liên kết quanh
// nguyên tử trung tâm. Khoá (key) của nguyên tử trùng với data-k trên dòng HTML
// tương ứng để hover hai chiều.

export type AtomItem = {
  key: string;
  label: string;
  sub: string;
  color: string;
  big?: boolean;
  slug?: string;
  category?: ProjectCategory;
};

export type AtomGroup = {
  key: string;
  label: string;
  color: string;
  category?: ProjectCategory;
  items: AtomItem[];
};

export type Station = {
  id: string;
  name: string;
  color: string;
  // flat: nguyên tử nối thẳng vào tâm; ngược lại mỗi nhóm có một nguyên tử phụ.
  flat: boolean;
  groups: AtomGroup[];
};

export const CATEGORY_ORDER: ProjectCategory[] = [
  "AI & Data Science",
  "Tin học Y tế",
  "Chuyển đổi số & Vận hành",
  "Full-stack System",
];

export const CATEGORY_COLORS: Record<ProjectCategory, string> = {
  "AI & Data Science": "#2563EB",
  "Tin học Y tế": "#0D9488",
  "Chuyển đổi số & Vận hành": "#0EA5E9",
  "Full-stack System": "#7C3AED",
};

export const COLORS = {
  sky: "#0284C7",
  bio: "#059669",
  honor: "#D97706",
  thesis: "#F59E0B",
  work: "#0EA5E9",
  projects: "#0369A1",
  research: "#4F46E5",
  press: "#E11D48",
  facebook: "#2563EB",
};

export const keys = {
  role: (i: number) => `role-${i}`,
  stat: (i: number) => `stat-${i}`,
  hobby: (i: number) => `hob-${i}`,
  edu: (i: number) => `edu-${i}`,
  thesis: "thesis",
  thesisBullet: (i: number) => `tb-${i}`,
  exp: (i: number) => `exp-${i}`,
  project: (slug: string) => `p-${slug}`,
  category: (c: ProjectCategory) => `cat-${c}`,
  research: (i: number) => `rs-${i}`,
  article: (i: number) => `pa-${i}`,
  facebook: (i: number) => `pf-${i}`,
  mail: "ct-mail",
  blog: "ct-blog",
};

export const articles = press.filter((p) => p.kind === "article");
export const facebookPosts = press.filter((p) => p.kind === "facebook");

function shorten(text: string, max = 90): string {
  return text.length > max ? `${text.slice(0, max).trimEnd()}…` : text;
}

const edu = education[0];
const job = experience[0];

export const stations: Station[] = [
  {
    id: "khoi-hanh",
    name: "Khởi hành",
    color: COLORS.sky,
    flat: false,
    groups: [
      {
        key: "grp-roles",
        label: "Vai trò",
        color: COLORS.sky,
        items: profile.roles.map((r, i) => ({ key: keys.role(i), label: r, sub: "Vai trò", color: COLORS.sky })),
      },
      {
        key: "grp-stats",
        label: "Thành tích",
        color: COLORS.honor,
        items: heroStats.map((s, i) => ({
          key: keys.stat(i),
          label: s.v,
          sub: `${s.k} · ${s.sub}`,
          color: COLORS.honor,
          big: true,
        })),
      },
    ],
  },
  {
    id: "gioi-thieu",
    name: "Giới thiệu",
    color: COLORS.bio,
    flat: true,
    groups: [
      {
        key: "grp-hobbies",
        label: "Sở thích",
        color: COLORS.bio,
        items: hobbyNotes.map((h, i) => ({ key: keys.hobby(i), label: h.label, sub: h.text, color: COLORS.bio, big: true })),
      },
    ],
  },
  {
    id: "hoc-van",
    name: "Học vấn",
    color: COLORS.honor,
    flat: false,
    groups: [
      {
        key: "grp-edu",
        label: edu.school,
        color: COLORS.honor,
        items: edu.highlights.map((h, i) => ({ key: keys.edu(i), label: h, sub: edu.school, color: COLORS.honor, big: true })),
      },
      {
        key: keys.thesis,
        label: "Khóa luận tốt nghiệp",
        color: COLORS.thesis,
        items: edu.thesis.bullets.map((b, i) => ({
          key: keys.thesisBullet(i),
          label: `Kết quả ${i + 1}`,
          sub: shorten(b),
          color: COLORS.thesis,
        })),
      },
    ],
  },
  {
    id: "kinh-nghiem",
    name: "Kinh nghiệm",
    color: COLORS.work,
    flat: true,
    groups: [
      {
        key: "grp-exp",
        label: job.role,
        color: COLORS.work,
        items: job.bullets.map((b, i) => ({ key: keys.exp(i), label: `Nhiệm vụ ${i + 1}`, sub: shorten(b), color: COLORS.work, big: true })),
      },
    ],
  },
  {
    id: "du-an",
    name: "Dự án",
    color: COLORS.projects,
    flat: false,
    groups: CATEGORY_ORDER.map((c) => ({
      key: keys.category(c),
      label: c,
      color: CATEGORY_COLORS[c],
      category: c,
      items: projectsByRecent
        .filter((p) => p.category === c)
        .map((p) => ({
          key: keys.project(p.slug),
          label: p.title,
          sub: `${c} · ${p.year}${p.highlight ? " · nổi bật" : ""} · bấm để xem`,
          color: CATEGORY_COLORS[c],
          big: !!p.highlight,
          slug: p.slug,
          category: c,
        })),
    })),
  },
  {
    id: "nghien-cuu",
    name: "Nghiên cứu",
    color: COLORS.research,
    flat: true,
    groups: [
      {
        key: "grp-research",
        label: "Nghiên cứu",
        color: COLORS.research,
        items: research.map((r, i) => ({
          key: keys.research(i),
          label: shorten(r.title, 70),
          sub: `${r.year} · ${r.venue}`,
          color: COLORS.research,
          big: true,
        })),
      },
    ],
  },
  {
    id: "bao-chi",
    name: "Báo chí",
    color: COLORS.press,
    flat: false,
    groups: [
      {
        key: "grp-articles",
        label: "Báo chí · Tạp chí",
        color: COLORS.press,
        items: articles.map((p, i) => ({ key: keys.article(i), label: p.outlet, sub: shorten(p.title), color: COLORS.press, big: true })),
      },
      {
        key: "grp-facebook",
        label: "Trên Facebook",
        color: COLORS.facebook,
        items: facebookPosts.map((p, i) => ({ key: keys.facebook(i), label: p.outlet, sub: shorten(p.title), color: COLORS.facebook })),
      },
    ],
  },
  {
    id: "lien-he",
    name: "Liên hệ",
    color: COLORS.sky,
    flat: true,
    groups: [
      {
        key: "grp-contact",
        label: "Liên hệ",
        color: COLORS.sky,
        items: [
          { key: keys.mail, label: "Gửi email cho tôi", sub: profile.email, color: COLORS.sky, big: true },
          { key: keys.blog, label: "Đọc bài viết mới nhất", sub: "Nhân sinh quan", color: COLORS.bio, big: true },
        ],
      },
    ],
  },
];
