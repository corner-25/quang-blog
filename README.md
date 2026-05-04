# Dương Hữu Quang — Personal Site

Blog cá nhân & portfolio của Dương Hữu Quang. Built with Next.js 16, Tailwind v4, Framer Motion, MDX-style markdown content.

## Stack

- Next.js 16 (App Router, Turbopack)
- React 19 + TypeScript
- Tailwind CSS v4
- Framer Motion (animations)
- next-themes (dark/light mode)
- gray-matter + remark (markdown content pipeline)

## Local development

```bash
npm install
npm run dev
```

Mặc định chạy ở `http://localhost:3000`. Đổi port: `PORT=3456 npm run dev`.

## Cấu trúc nội dung

Bài Nhân sinh quan và cột mốc kỷ niệm là markdown — chỉ cần thêm file mới là tự động lên web, không cần đổi code.

- `content/blog/*.md` — bài viết Nhân sinh quan. Frontmatter: `title`, `excerpt`, `date`, `tags[]`.
- `content/timeline/*.md` — cột mốc. Frontmatter: `title`, `date`, `location?`, `image?`.
- `data/profile.ts` — thông tin cá nhân, học vấn, kinh nghiệm, dự án, nghiên cứu, báo chí (single source of truth).

## Deploy

Đang deploy trên Railway, build với Nixpacks. `npm run build` → `npm run start`.
