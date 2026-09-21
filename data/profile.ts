export const profile = {
  name: "Dương Hữu Quang",
  shortName: "Quang",
  roles: ["AI Engineer", "Data Scientist", "Healthcare Informatics"],
  tagline:
    "Dùng dữ liệu, công nghệ và tư duy hệ thống để giải quyết những bài toán có ý nghĩa trong y tế.",
  bio: `Tôi là Dương Hữu Quang, kỹ sư AI và nhà khoa học dữ liệu theo đuổi lĩnh vực tin học y tế. Tôi xây dựng các sản phẩm dữ liệu, nghiên cứu mô hình hỗ trợ quyết định và chuyển những quy trình phức tạp thành hệ thống dễ sử dụng tại Bệnh viện Đại học Y Dược TP.HCM. Bên cạnh công việc, tôi viết để lưu lại những điều mình học được trên hành trình ấy.`,
  hobbies: ["Viết lách", "Đọc sách", "Vibe coding"],
  email: "huuquang.data@gmail.com",
  location: "TP. Hồ Chí Minh, Việt Nam",
};

export const education = [
  {
    school: "Trường Đại học Bách khoa — ĐHQG TP.HCM",
    degree: "Cử nhân",
    period: "2021 — 2025",
    highlights: [
      "GPA 3.8/4.0",
      "Thủ khoa chuyên ngành",
      "Tốt nghiệp loại xuất sắc",
      "Khóa luận tốt nghiệp: 9.5/10",
    ],
    thesis: {
      title:
        "Tích hợp khai phá luật kết hợp và học sâu cho hệ hỗ trợ quyết định lâm sàng tại Bệnh viện Đa khoa Khu vực Cai Lậy",
      titleEn:
        "An Integrated Approach of Association Rule Mining & Deep Learning for Clinical Decision Support at Cai Lậy Regional General Hospital",
      score: "9.5/10 — Điểm cao nhất khoa",
      bullets: [
        "Ẩn danh hóa hơn 100.000 lượt khám, chữa bệnh giai đoạn 2022–2024; xây dựng quy trình ETL bằng Python, pandas và SQL để xử lý dữ liệu hằng đêm và lưu trữ trên Snowflake.",
        "Khai phá 57 luật lâm sàng có độ hỗ trợ cao bằng Apriori và FP-Growth; tích hợp các luật này với chuỗi sinh hiệu trong mô hình mạng nơ-ron truyền thẳng (FCNN).",
        "Đạt AUROC 0.91 khi dự đoán tái nhập viện trong 7 ngày và 0.88 khi dự đoán tử vong nội viện; cao hơn mô hình hồi quy logistic 14 điểm phần trăm nhưng vẫn duy trì khả năng diễn giải.",
        "Xây dựng nguyên mẫu trên Streamlit, đạt điểm khả dụng SUS 86/100 và giúp rút ngắn 18% thời gian lập kế hoạch xuất viện.",
        "Kết quả được công bố trên một tạp chí tin học y học trong nước năm 2025, được chấp nhận đăng trên một tạp chí quốc tế thuộc danh mục Scopus và trình bày tại SIM Conference 2025.",
      ],
      conclusion:
        "Nghiên cứu cho thấy việc kết hợp tính minh bạch của luật kết hợp với năng lực dự báo của học sâu có thể tạo nên một hệ hỗ trợ quyết định lâm sàng chính xác, dễ được bác sĩ tiếp nhận và phù hợp với hạ tầng của bệnh viện tuyến tỉnh.",
    },
  },
];

export const experience = [
  {
    company: "Bệnh viện Đại học Y Dược TP.HCM",
    role: "Chuyên viên Tổng hợp",
    period: "08/2025 — Hiện tại",
    location: "TP. Hồ Chí Minh",
    bullets: [
      "Tổng hợp và phân tích dữ liệu, cung cấp thông tin phục vụ công tác điều hành.",
      "Số hóa quy trình hành chính và phát triển các công cụ hỗ trợ vận hành nội bộ.",
      "Phân tích dữ liệu khám sức khỏe định kỳ, xây dựng mô hình bệnh tật cho viên chức — người lao động.",
    ],
  },
];

export type { ProjectDetail } from "./projects";
export type Project = import("./projects").ProjectDetail;

import { projectsData } from "./projects";

export const projects: Project[] = projectsData;

// Sắp xếp theo năm mới nhất, dự án highlight được ưu tiên
export const projectsByRecent: Project[] = [...projectsData].sort((a, b) => {
  const parseYear = (y: string) => {
    if (y.includes("Hiện tại")) return 2026.5;
    const matches = y.match(/\d{4}/g);
    return matches ? parseInt(matches[matches.length - 1]) : 0;
  };
  const yearA = parseYear(a.year);
  const yearB = parseYear(b.year);
  if (yearB !== yearA) return yearB - yearA;
  if (b.highlight && !a.highlight) return 1;
  if (!b.highlight && a.highlight) return -1;
  return 0;
});

export const research = [
  {
    title:
      "Mô hình bệnh tật của viên chức — người lao động: phân tích hồ sơ khám sức khỏe định kỳ tại một bệnh viện tuyến cuối",
    venue: "Bài báo khoa học — phát triển từ dự án tại Bệnh viện Đại học Y Dược TP.HCM",
    year: "2026",
    note: "Nghiên cứu phân tích dữ liệu khám sức khỏe định kỳ nhằm nhận diện cơ cấu bệnh tật theo độ tuổi, giới tính và vị trí công tác, từ đó cung cấp bằng chứng cho việc thiết kế chương trình chăm sóc sức khỏe chủ động dành cho nhân viên y tế.",
  },
  {
    title:
      "Tiếp cận tích hợp giữa khai phá luật kết hợp và học sâu cho hệ hỗ trợ quyết định lâm sàng",
    venue: "Khóa luận tốt nghiệp — Trường Đại học Bách khoa, ĐHQG TP.HCM",
    year: "2025",
    note: "Nghiên cứu kết hợp các luật lâm sàng có khả năng diễn giải với mô hình học sâu nhằm nâng cao độ chính xác dự báo. Bài báo phát triển từ nghiên cứu đã được chấp nhận đăng trên một tạp chí quốc tế thuộc danh mục Scopus.",
  },
  {
    title:
      "Ứng dụng và so sánh các mô hình học máy trong dự đoán tái nhập viện ở người bệnh đái tháo đường típ 2",
    venue: "Hội nghị Khoa học Tuổi trẻ — Bệnh viện Đại học Y Dược TP.HCM",
    year: "2025",
    note: "Nghiên cứu đánh giá và so sánh hiệu năng của nhiều mô hình học máy, hướng đến lựa chọn phương pháp phù hợp cho bài toán nhận diện sớm nguy cơ tái nhập viện.",
  },
];

export type PressItem = {
  outlet: string;
  title: string;
  url: string;
  kind: "article" | "facebook";
};

export const press: PressItem[] = [
  {
    kind: "article",
    outlet: "VnExpress",
    title: "Tốt nghiệp xuất sắc Bách Khoa sau hai năm bỏ học chạy xe ôm",
    url: "https://vnexpress.net/tot-nghiep-xuat-sac-bach-khoa-sau-hai-nam-bo-hoc-chay-xe-om-4988843.html",
  },
  {
    kind: "article",
    outlet: "VNU-HCM",
    title:
      "Tri thức — tấm vé thông hành đưa chàng trai chạy xe ôm lội ngược dòng tốt nghiệp xuất sắc Trường ĐH Bách Khoa",
    url: "https://vnuhcm.edu.vn/bai-viet/tri-thuc-tam-ve-thong-hanh-dua-chang-trai-chay-xe-om-loi-nguoc-dong-tot-nghiep-xuat-sac-truong-dh-bach-khoa",
  },
  {
    kind: "article",
    outlet: "Báo Giáo dục Thời đại",
    title: "Tốt nghiệp xuất sắc Bách Khoa sau hai năm bỏ học chạy xe ôm",
    url: "https://giaoducthudo.giaoducthoidai.vn/tot-nghiep-xuat-sac-bach-khoa-sau-hai-nam-bo-hoc-chay-xe-om-194039.html",
  },
  {
    kind: "article",
    outlet: "Tạp chí Đời sống & Pháp luật",
    title:
      "Nam sinh từng bỏ học chạy xe công nghệ tốt nghiệp xuất sắc Đại học Bách Khoa TP.HCM",
    url: "https://doisongphapluat.com.vn/nam-sinh-tung-bo-hoc-chay-xe-cong-nghe-tot-nghiep-xuat-sac-dai-hoc-bach-khoa-tp-hcm-a705492.html",
  },
  {
    kind: "article",
    outlet: "Tạp chí điện tử Giáo dục Việt Nam",
    title:
      "Bỏ học đi giao hàng rồi học lại ở TTGDTX, nam sinh tốt nghiệp đại học với bằng xuất sắc",
    url: "https://giaoduc.net.vn/bo-hoc-di-giao-hang-roi-hoc-lai-o-ttgdtx-nam-sinh-tot-nghiep-dai-hoc-voi-bang-xuat-sac-post255995.gd",
  },
  {
    kind: "facebook",
    outlet: "Fanpage Khoa Quản lý Công nghiệp — Bách Khoa",
    title:
      "Bài viết tôn vinh tân kỹ sư tốt nghiệp xuất sắc của Khoa Quản lý Công nghiệp",
    url: "https://www.facebook.com/sim.hcmut.edu.vn/posts/pfbid02EjaFwpuGvbCtb25jQTJwhxZ81jcnYFSe1ZbG64ne3VYBRDZtvNgd3e8eGvaKtC72l",
  },
  {
    kind: "facebook",
    outlet: "Fanpage VTV3",
    title: "VTV3 đăng tải hành trình lội ngược dòng",
    url: "https://www.facebook.com/photo/?fbid=1279088020920599&set=a.599311272231614",
  },
  {
    kind: "facebook",
    outlet: "Fanpage Tin Giáo dục TP. Hồ Chí Minh",
    title: "Tin Giáo dục TP.HCM chia sẻ câu chuyện",
    url: "https://www.facebook.com/photo/?fbid=1296662395821177&set=a.641898171297606",
  },
  {
    kind: "facebook",
    outlet: "Fanpage Đại học Quốc gia TP. Hồ Chí Minh",
    title: "ĐHQG TP.HCM giới thiệu hành trình của một cựu sinh viên",
    url: "https://www.facebook.com/photo/?fbid=1183194823924213&set=a.573192348257800",
  },
];
