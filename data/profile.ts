export const profile = {
  name: "Dương Hữu Quang",
  shortName: "Quang",
  roles: ["AI Engineer", "Data Scientist", "Healthcare Informatics"],
  tagline:
    "Tin rằng tri thức là tấm vé thông hành — và mỗi dòng dữ liệu đều có thể trở thành một quyết định cứu người.",
  bio: `Tôi là Dương Hữu Quang. Tôi viết code, viết bài, đọc sách,
và đang dùng dữ liệu để giúp các bác sĩ ra quyết định lâm sàng tốt hơn
tại Bệnh viện Đại học Y Dược TP.HCM.`,
  hobbies: ["Viết lách", "Đọc sách", "Coding"],
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
      "Tốt nghiệp Thủ khoa chuyên ngành",
      "Tốt nghiệp loại Xuất sắc",
      "Khoá luận tốt nghiệp 9.5/10",
    ],
    thesis: {
      title:
        "Tích hợp giữa Khai phá Luật kết hợp & Học sâu cho Hệ hỗ trợ quyết định lâm sàng tại Bệnh viện Đa khoa Khu vực Cai Lậy",
      titleEn:
        "An Integrated Approach of Association Rule Mining & Deep Learning for Clinical Decision Support at Cai Lậy Regional General Hospital",
      score: "9.5/10 —  Khoá luận đạt điểm cao nhất Khoa",
      bullets: [
        "Ẩn danh hoá hơn 100.000 lượt khám, chữa bệnh (2022–2024); xây dựng pipeline ETL Python (pandas, SQL) chạy hằng đêm, nạp dữ liệu vào Snowflake.",
        "Khai phá 57 luật lâm sàng có support cao bằng Apriori / FP-Growth, kết hợp luật và chuỗi sinh hiệu (vital signs) trong một mạng FCNN.",
        "Đạt AUROC 0.91 cho dự đoán tái nhập viện trong 7 ngày, 0.88 cho tử vong nội viện — cao hơn hồi quy logistic 14 điểm phần trăm mà vẫn giải thích được.",
        "Demo Streamlit đạt SUS 86/100; thời gian lập kế hoạch xuất viện giảm 18%.",
        "Kết quả công bố trên một tạp chí Tin học Y học quốc gia (2025) và một tạp chí quốc tế thuộc danh mục SCOPUS (in press); báo cáo tại SIM Conference 2025.",
      ],
      conclusion:
        "Chứng minh rằng việc kết hợp luật kết hợp minh bạch với học sâu cho ra một CDSS chính xác, được bác sĩ tin tưởng và có thể triển khai trên phần cứng phổ thông tại bệnh viện tuyến tỉnh.",
    },
  },
];

export const experience = [
  {
    company: "Bệnh viện Đại học Y Dược TP.HCM",
    role: "Chuyên viên",
    period: "08/2025 — Hiện tại",
    location: "TP. Hồ Chí Minh",
    bullets: [
      "Thống kê, phân tích dữ liệu phục vụ điều hành.",
      "Số hoá công tác Phòng Hành chính.",
      "Xây dựng mô hình bệnh tật hỗ trợ quyết định lâm sàng cho viên chức – người lao động.",
    ],
  },
];

export type Project = {
  title: string;
  year: string;
  org: string;
  summary: string;
  stack?: string[];
  role: string;
  highlight?: boolean;
};

export const projects: Project[] = [
  {
    title: "Số hoá tồn kho & Dự báo đơn hàng",
    year: "2024",
    org: "Công ty TNHH Giang Minh",
    summary:
      "Xây dựng hệ thống quản lý tồn kho theo thời gian thực kèm mô hình dự báo đơn hàng, giúp bộ phận kinh doanh chủ động lên kế hoạch nhập hàng và giảm tồn đọng.",
    stack: ["Python", "Time-series Forecasting", "PostgreSQL", "Power BI"],
    role: "Solo — toàn bộ vòng đời dự án",
  },
  {
    title: "Hệ thống chăm sóc sức khoẻ & Đặt lịch khám từ xa",
    year: "2025",
    org: "Bệnh viện Đa khoa Vạn An",
    summary:
      "Nền tảng cho phép người dùng theo dõi sức khoẻ người thân, đặt lịch khám từ xa, kết nối trực tiếp với hệ thống của bệnh viện.",
    stack: ["Node.js", "Express", "MongoDB", "React", "Redux Toolkit", "MUI"],
    role: "Solo — toàn bộ vòng đời dự án",
    highlight: true,
  },
  {
    title: "Hệ thống HIS Phòng khám Tim mạch",
    year: "2026",
    org: "Phòng khám Tim mạch Tuyết Lan",
    summary:
      "Hệ thống thông tin bệnh viện (HIS) chuyên biệt cho chuyên khoa tim mạch — quản lý bệnh nhân, lịch khám, hồ sơ điện tử, báo cáo thống kê.",
    stack: ["Node.js", "Express", "PostgreSQL", "React 19", "MUI 7", "Recharts"],
    role: "Solo — toàn bộ vòng đời dự án",
    highlight: true,
  },
  {
    title: "Hệ thống quản lý tập trung Phòng Hành chính",
    year: "2025 — 2026",
    org: "Bệnh viện Đại học Y Dược TP.HCM",
    summary:
      "Số hoá toàn bộ nghiệp vụ của Phòng Hành chính: tài liệu, văn bản, lịch trực, báo cáo — tích hợp một cửa cho lãnh đạo theo dõi.",
    stack: ["Full-stack", "Workflow Automation"],
    role: "Solo — toàn bộ vòng đời dự án",
  },
  {
    title: "Hệ thống Kỳ thi ảnh — Ngày Thư ký Thế giới 2026",
    year: "2026",
    org: "Bệnh viện Đại học Y Dược TP.HCM",
    summary:
      "Nền tảng tổ chức kỳ thi trực tuyến hướng đến sự kiện kỷ niệm “Ngày Thư ký Thế giới năm 2026”: ngân hàng câu hỏi, chấm tự động, bảng xếp hạng, tra cứu kết quả.",
    stack: ["Node.js", "MongoDB", "React", "Vite"],
    role: "Solo — toàn bộ vòng đời dự án",
  },
  {
    title: "Mô hình bệnh tật cho Viên chức – Người lao động",
    year: "2026",
    org: "Bệnh viện Đại học Y Dược TP.HCM",
    summary:
      "Phân tích hồ sơ khám sức khoẻ định kỳ để xây dựng mô hình bệnh tật theo nhóm tuổi, giới tính, vị trí công tác — phục vụ chương trình chăm sóc sức khoẻ chủ động.",
    stack: ["Python", "Statistical Modeling", "Clinical Data"],
    role: "Solo — toàn bộ vòng đời dự án",
    highlight: true,
  },
];

export const research = [
  {
    title:
      "Tiếp cận tích hợp giữa Khai phá Luật kết hợp & Học sâu cho Hệ hỗ trợ quyết định lâm sàng",
    venue: "Khoá luận tốt nghiệp — ĐH Bách Khoa TP.HCM",
    year: "2025",
    note: "Đăng trên tạp chí Tin học Y học quốc gia (2025) và tạp chí quốc tế thuộc danh mục SCOPUS (in press). Báo cáo tại SIM Conference 2025.",
  },
  {
    title:
      "Bài báo nộp Hội nghị Khoa học tuổi trẻ — Bệnh viện Đại học Y Dược TP.HCM",
    venue: "Hội nghị Khoa học tuổi trẻ BV ĐHYD TP.HCM",
    year: "2026",
    note: "Đang trong quá trình bình duyệt.",
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
