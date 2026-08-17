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
    title: "Số hóa tồn kho và dự báo đơn hàng",
    year: "2024",
    org: "Công ty TNHH Giang Minh",
    summary:
      "Phát triển hệ thống theo dõi tồn kho theo thời gian thực, kết hợp mô hình dự báo nhu cầu để hỗ trợ bộ phận kinh doanh lập kế hoạch nhập hàng chủ động và hạn chế hàng tồn đọng.",
    stack: ["Python", "Time-series Forecasting", "PostgreSQL", "Power BI"],
    role: "Phụ trách toàn bộ vòng đời dự án",
  },
  {
    title: "Hệ thống chăm sóc sức khỏe và đặt lịch khám từ xa",
    year: "2025",
    org: "Bệnh viện Đa khoa Vạn An",
    summary:
      "Xây dựng nền tảng giúp người dùng quản lý thông tin sức khỏe của người thân, đặt lịch khám trực tuyến và kết nối dữ liệu với hệ thống bệnh viện.",
    stack: ["Node.js", "Express", "MongoDB", "React", "Redux Toolkit", "MUI"],
    role: "Phụ trách toàn bộ vòng đời dự án",
    highlight: true,
  },
  {
    title: "Hệ thống HIS cho phòng khám tim mạch",
    year: "2026",
    org: "Phòng khám Tim mạch Tuyết Lan",
    summary:
      "Phát triển hệ thống thông tin chuyên biệt cho phòng khám tim mạch, hợp nhất nghiệp vụ quản lý bệnh nhân, lịch khám, hồ sơ điện tử và báo cáo thống kê trên một nền tảng.",
    stack: ["Node.js", "Express", "PostgreSQL", "React 19", "MUI 7", "Recharts"],
    role: "Phụ trách toàn bộ vòng đời dự án",
    highlight: true,
  },
  {
    title: "Hệ thống quản lý tập trung Phòng Hành chính",
    year: "2025 — 2026",
    org: "Bệnh viện Đại học Y Dược TP.HCM",
    summary:
      "Xây dựng nền tảng tập trung để số hóa quy trình quản lý tài liệu, văn bản, lịch trực và báo cáo; giúp lãnh đạo theo dõi hoạt động hành chính tại một đầu mối thống nhất.",
    stack: ["Full-stack", "Workflow Automation"],
    role: "Phụ trách toàn bộ vòng đời dự án",
  },
  {
    title: "Hệ thống khảo sát nội bộ Phòng Hành chính",
    year: "2026",
    org: "Bệnh viện Đại học Y Dược TP.HCM",
    summary:
      "Phát triển công cụ khảo sát nội bộ hỗ trợ thiết kế phiếu, phân phối theo nhóm đối tượng, theo dõi tỷ lệ phản hồi và tự động tổng hợp kết quả; thay thế quy trình gửi biểu mẫu và nhập liệu thủ công.",
    stack: ["Full-stack", "Survey Design", "PostgreSQL"],
    role: "Phụ trách toàn bộ vòng đời dự án",
  },
  {
    title: "Cổng thông tin Hội nghị Viên chức — Người lao động 2026",
    year: "2026",
    org: "Bệnh viện Đại học Y Dược TP.HCM",
    summary:
      "Xây dựng cổng thông tin phục vụ tra cứu tài liệu, theo dõi chương trình và tiếp nhận ý kiến trước hội nghị. AI được ứng dụng để phân nhóm chủ đề và trực quan hóa nội dung phản hồi, giúp ban tổ chức nhanh chóng nhận diện các vấn đề được quan tâm.",
    stack: ["Next.js", "LLM", "NLP", "Word Cloud", "Data Visualization"],
    role: "Phụ trách toàn bộ vòng đời dự án",
  },
  {
    title: "Hệ thống kiểm tra nghiệp vụ và bình chọn ảnh — Ngày Thư ký Thế giới 2026",
    year: "2026",
    org: "Bệnh viện Đại học Y Dược TP.HCM",
    summary:
      "Phát triển nền tảng phục vụ Ngày Thư ký Thế giới 2026, tích hợp ngân hàng câu hỏi, thi và chấm điểm tự động, bảng xếp hạng, tra cứu kết quả và bình chọn ảnh trực tuyến.",
    stack: ["Node.js", "MongoDB", "React", "Vite"],
    role: "Phụ trách toàn bộ vòng đời dự án",
  },
  {
    title: "Mô hình bệnh tật của viên chức — người lao động",
    year: "2026",
    org: "Bệnh viện Đại học Y Dược TP.HCM",
    summary:
      "Phân tích hồ sơ khám sức khỏe định kỳ để mô tả cơ cấu bệnh tật theo độ tuổi, giới tính và vị trí công tác, làm cơ sở xây dựng chương trình chăm sóc sức khỏe chủ động cho nhân viên bệnh viện.",
    stack: ["Python", "Statistical Modeling", "Clinical Data"],
    role: "Nghiên cứu, phân tích dữ liệu và xây dựng mô hình",
    highlight: true,
  },
  {
    title: "Hệ thống quản lý đảng viên — Đảng ủy Bệnh viện",
    year: "2026",
    org: "Bệnh viện Đại học Y Dược TP.HCM",
    summary:
      "Số hóa nghiệp vụ quản lý hồ sơ đảng viên, sinh hoạt chi bộ, đảng phí, quá trình phấn đấu và báo cáo; giúp cấp ủy theo dõi dữ liệu nhất quán trên một hệ thống tập trung.",
    stack: ["Full-stack", "Workflow Automation", "PostgreSQL"],
    role: "Phụ trách toàn bộ vòng đời dự án",
  },
  {
    title: "Nền tảng quản lý chỉ số hoạt động bệnh viện",
    year: "2025 — 2026",
    org: "Bệnh viện Đại học Y Dược TP.HCM",
    summary:
      "Thiết kế nền tảng hợp nhất chỉ số hoạt động của các đơn vị, hỗ trợ thu thập, chuẩn hóa, lưu trữ và trực quan hóa dữ liệu tại một nguồn duy nhất. Báo cáo được cập nhật trực tiếp khi có dữ liệu mới, giảm phụ thuộc vào thao tác xuất — nhập thủ công qua các công cụ BI.",
    stack: ["Business Analysis", "Data Modeling", "Data Visualization", "Full-stack"],
    role: "Business Analyst — phân tích nghiệp vụ và thiết kế hệ thống",
    highlight: true,
  },
  {
    title: "Bảng điều hành dành cho Ban Giám đốc",
    year: "2026",
    org: "Bệnh viện Đại học Y Dược TP.HCM",
    summary:
      "Thiết kế bảng điều hành dành cho Ban Giám đốc, tự động cập nhật báo cáo hằng ngày, đối chiếu biến động giữa các kỳ và trình bày chỉ số qua biểu đồ trực quan; giúp lãnh đạo nắm bắt tình hình hoạt động mà không phải chờ tổng hợp thủ công.",
    stack: ["Business Analysis", "Frontend Design", "Data Visualization", "UI/UX"],
    role: "Business Analyst & Frontend Design",
    highlight: true,
  },
  {
    title: "Hệ thống quản lý vật tư — trang thiết bị y tế 360°",
    year: "2026",
    org: "Bệnh viện Đại học Y Dược TP.HCM",
    summary:
      "Xây dựng hệ thống quản lý xuyên suốt vòng đời trang thiết bị y tế, từ hợp đồng, linh kiện, nhập — xuất kho đến bảo trì, khấu hao và thanh lý. Mỗi thiết bị có một hồ sơ tập trung, hỗ trợ theo dõi vị trí, tình trạng và giá trị còn lại.",
    stack: ["Asset Lifecycle", "Inventory", "PostgreSQL", "Full-stack"],
    role: "Phụ trách toàn bộ vòng đời dự án",
    highlight: true,
  },
  {
    title: "UMC AI Hub — Nền tảng AI cho công tác hành chính",
    year: "2026",
    org: "Bệnh viện Đại học Y Dược TP.HCM",
    summary:
      "Phát triển nền tảng tập trung các ứng dụng AI cho nghiệp vụ hành chính, gồm trợ lý xử lý văn bản, tra cứu quy trình và tự động hóa tác vụ lặp lại; qua đó giảm thời gian thao tác thủ công và tăng khả năng tiếp cận thông tin nội bộ.",
    stack: ["LLM", "RAG", "Next.js", "Python", "Vector DB"],
    role: "Phụ trách toàn bộ vòng đời dự án",
    highlight: true,
  },
];

// Năm lớn nhất xuất hiện trong chuỗi year (vd "2025 — 2026" -> 2026).
function latestYear(year: string): number {
  const matches = year.match(/\d{4}/g);
  if (!matches) return 0;
  return Math.max(...matches.map(Number));
}

// Dự án sắp xếp theo gần đây nhất trước. Cùng năm thì dự án khai báo sau
// (mới thêm) đứng trước — sort ổn định nên ta đảo chỉ số khi hoà.
export const projectsByRecent: Project[] = projects
  .map((project, index) => ({ project, index }))
  .sort((a, b) => {
    const diff = latestYear(b.project.year) - latestYear(a.project.year);
    return diff !== 0 ? diff : b.index - a.index;
  })
  .map(({ project }) => project);

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
