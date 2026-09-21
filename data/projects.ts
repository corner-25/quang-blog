export type ProjectCategory =
  | "AI & Data Science"
  | "Tin học Y tế"
  | "Chuyển đổi số & Vận hành"
  | "Full-stack System";

export type ProjectDetail = {
  slug: string;
  title: string;
  subtitle: string;
  year: string;
  category: ProjectCategory;
  org: string;
  role: string;
  highlight?: boolean;
  summary: string;
  challenge: string;
  solution: string;
  architecture: {
    frontend?: string;
    backend?: string;
    database?: string;
    aiEngine?: string;
    deployment?: string;
  };
  keyFeatures: string[];
  metrics: { label: string; value: string }[];
  stack: string[];
  githubUrl?: string;
  isPrivate?: boolean;
  liveUrl?: string;
};

export const projectsData: ProjectDetail[] = [
  {
    slug: "umc-ai-hub",
    title: "UMC AI Hub — Nền tảng Trợ lý AI Đa tác vụ Bệnh viện",
    subtitle: "Trung tâm AI hợp nhất phục vụ đa dạng nghiệp vụ y tế, văn bản hành chính và hỗ trợ điều hành tại BV ĐHYD TP.HCM",
    year: "2026",
    category: "AI & Data Science",
    org: "Bệnh viện Đại học Y Dược TP.HCM",
    role: "Lead AI Engineer & Full-stack Developer",
    highlight: true,
    summary:
      "Nền tảng trí tuệ nhân tạo toàn diện của Bệnh viện Đại học Y Dược TP.HCM, tích hợp nhiều module AI giải quyết hàng loạt bài toán thực tế: từ tự động chuyển âm thanh cuộc họp thành biên bản chuẩn Nghị định 30 (Meeting AI), xử lý và trích xuất công văn, trợ lý hỏi đáp quy chế nội bộ (Policy RAG), đến tự động hóa quy trình nghiệp vụ cho cán bộ nhân viên y tế.",
    challenge:
      "Bệnh viện tuyến cuối quy mô lớn với hàng nghìn y bác sĩ và nhân viên hành chính phải xử lý khối lượng công việc khổng lồ: các cuộc họp giao ban kéo dài tốn nhiều giờ gõ biên bản, hàng nghìn trang quy chế chính sách phức tạp khó tra cứu nhanh, cùng lượng lớn văn bản công văn đến/đi mỗi ngày. Việc thiếu một nền tảng AI tập trung khiến các công cụ bị phân mảnh, tốn công thủ công và khó kiểm soát bảo mật dữ liệu y tế.",
    solution:
      "Xây dựng UMC AI Hub như một nền tảng AI tập trung đa tác vụ (Multi-task Hospital AI Platform): tích hợp Gemini 2.0 Flash (nhận diện giọng nói y khoa tốc độ cao, xử lý văn bản đa phương thức), DeepSeek (lý luận ngữ cảnh, biên tập văn bản, tóm tắt điều hành), kết hợp Vector Search (pgvector) cho tra cứu quy chế nội bộ và các API tự động hóa. Hệ sinh thái gồm các phân hệ chuyên biệt: Meeting AI, Trợ lý Quy chế & Pháp quy (Policy Assistant), Phân loại & Trích xuất Văn bản (Document Intelligence), và Tự động hóa tác vụ điều hành.",
    architecture: {
      frontend: "Next.js 16 (App Router), React 19, Tailwind CSS, Web Audio API",
      backend: "Python FastAPI + Next.js Server Actions, Microservices Architecture",
      aiEngine: "Gemini 2.0 Flash (Speech-to-Text) + DeepSeek LLM + Hybrid Vector Search (pgvector)",
      database: "PostgreSQL 17, Redis Cache, Document Store",
      deployment: "Docker Container trên hạ tầng máy chủ nội bộ bệnh viện (On-premise)",
    },
    keyFeatures: [
      "Phân hệ Meeting AI: Ghi âm, nhận dạng giọng nói chuyên ngành y tế đa người nói và tự động xuất biên bản .docx chuẩn 100% Nghị định 30/2020/NĐ-CP",
      "Phân hệ Document Intelligence: Tự động trích xuất, phân loại chủ đề và tóm tắt công văn, văn bản hành chính",
      "Phân hệ Policy RAG: Trợ lý hỏi đáp quy chế bệnh viện, quy trình nội bộ bằng ngôn ngữ tự nhiên có dẫn chứng nguồn",
      "Phân hệ Task Automation: Tự động hóa các tác vụ lặp lại trong điều hành và hỗ trợ tổng hợp báo cáo",
      "Kiến trúc mô-đun linh hoạt, bảo đảm an toàn dữ liệu y tế trên hạ tầng máy chủ nội bộ (On-premise)",
    ],
    metrics: [
      { label: "Nền tảng", value: "Đa tác vụ AI Bệnh viện" },
      { label: "Meeting AI", value: "Chuẩn NĐ 30" },
      { label: "Hạ tầng", value: "Bảo mật On-premise" },
    ],
    stack: ["Next.js 16", "React 19", "Python", "Gemini 2.0", "DeepSeek", "pgvector", "PostgreSQL", "Docker"],
    isPrivate: true,
  },
  {
    slug: "disease-model-umc",
    title: "Mô hình Bệnh tật Viên chức — Người lao động 13 năm",
    subtitle: "Phân tích dọc 31.924 lượt khám sức khỏe tại BV ĐHYD TP.HCM (2014–2026)",
    year: "2026",
    category: "Tin học Y tế",
    org: "Bệnh viện Đại học Y Dược TP.HCM",
    role: "Lead Data Scientist & Clinical Modeler",
    highlight: true,
    summary:
      "Hệ thống phân tích dữ liệu khám sức khỏe định kỳ 13 năm trên hơn 4.200 nhân viên y tế, chuẩn hóa đơn vị xét nghiệm đa năm, xây dựng mô hình bệnh tật và báo cáo dự báo sức khỏe chủ động.",
    challenge:
      "Dữ liệu khám sức khỏe định kỳ suốt 13 năm (2014–2026) của hơn 4.200 nhân viên y tế bị phân mảnh qua nhiều file Excel biểu mẫu khác nhau; đơn vị đo xét nghiệm biến thiên qua các năm (mg/dL ↔ mmol/L, g/L ↔ g/dL) và thiếu sự liên kết dọc giữa các lần khám của cùng một người.",
    solution:
      "Thiết kế quy trình ETL tự động chuẩn hóa đơn vị chỉ số lâm sàng (đường huyết, men gan, mỡ máu, chức năng thận); xây dựng mô hình dữ liệu dọc (longitudinal data modeling) theo dõi diễn tiến sức khỏe của từng nhân sự theo nhóm tuổi, giới tính và khối công tác (lâm sàng, cận lâm sàng, hành chính).",
    architecture: {
      frontend: "TypeScript, Tailwind CSS, Recharts, Interactive Clinical Dashboards",
      backend: "Python Data Engine (Pandas, Polars, SciPy, Scikit-learn)",
      database: "PostgreSQL chuyên dụng phân tích số liệu y tế",
      deployment: "Triển khai nội bộ bảo mật dữ liệu y tế (On-premise)",
    },
    keyFeatures: [
      "Xử lý dataset 4.235 nhân sự với 31.924 lượt khám (trung bình 7.5 lượt/người)",
      "Bộ chuyển đổi tự động đồng nhất đơn vị xét nghiệm đa năm không mất mát độ chính xác",
      "Phân nhóm bệnh tật theo ICD-10 và đánh giá mối tương quan nguy cơ tim mạch/chuyển hóa",
      "Dashboard trực quan hóa cơ cấu bệnh tật theo độ tuổi, giới tính và khoa/phòng",
      "Cơ sở dữ liệu khoa học để phát triển bài báo công bố trên tạp chí chuyên ngành",
    ],
    metrics: [
      { label: "Quy mô nhân sự", value: "4.235 người" },
      { label: "Số lượt khám phân tích", value: "31.924 lượt" },
      { label: "Thời gian nghiên cứu dọc", value: "13 năm" },
    ],
    stack: ["Python", "Pandas", "Statistical Modeling", "Clinical Data", "TypeScript", "PostgreSQL"],
    isPrivate: true,
  },
  {
    slug: "equipment-umc",
    title: "UMC-MELMS — Quản lý Vòng đời Trang thiết bị Y tế",
    subtitle: "Hệ thống CMMS/EAM chuyên biệt cho trang thiết bị y tế bệnh viện tuyến cuối",
    year: "2026",
    category: "Chuyển đổi số & Vận hành",
    org: "Bệnh viện Đại học Y Dược TP.HCM",
    role: "Lead Full-stack Architect & Developer",
    highlight: true,
    summary:
      "Nền tảng quản lý xuyên suốt vòng đời trang thiết bị y tế: từ hồ sơ pháp lý, hợp đồng mua sắm, linh kiện thay thế, nhật ký bảo trì, kiểm định định kỳ đến điều chuyển và thanh lý.",
    challenge:
      "Bệnh viện quản lý hàng nghìn thiết bị y tế có giá trị cao, yêu cầu nghiêm ngặt về quy trình kiểm định an toàn bức xạ, bảo dưỡng định kỳ và kiểm soát vị trí phòng mổ/khoa lâm sàng. Các phần mềm tài sản thông thường không đáp ứng được tính phức tạp của cấu phần cha-con, phụ tùng thay thế và điều chuyển liên tục.",
    solution:
      "Thiết kế kiến trúc EAM/CMMS chuyên sâu với hạ tầng temporal theo dõi trạng thái thiết bị theo thời gian thực; cơ chế gán vị trí 4 chiều (khoa, phòng, giường, người phụ trách); hệ thống sinh mã QR token tra cứu nhanh tại giường bệnh.",
    architecture: {
      frontend: "React, Next.js, Tailwind CSS, Shadcn/ui",
      backend: "Node.js, TypeScript, RESTful API + Temporal State Transition Engine",
      database: "PostgreSQL 17, Prisma ORM, Docker Compose",
      deployment: "Hạ tầng Docker nội bộ + Railway CI/CD",
    },
    keyFeatures: [
      "Mô hình Catalog thiết bị đa cấp (hỗ trợ linh kiện cha - con và phụ tùng dự phòng)",
      "9 quy trình điều chuyển thiết bị với xác nhận giao - nhận hai chiều điện tử",
      "Quản lý lịch bảo dưỡng dự phòng (Preventive Maintenance) và cảnh báo kiểm định",
      "Tra cứu hồ sơ lý lịch máy chi tiết qua mã QR token quét trên điện thoại di động",
      "Nhật ký kiểm toán (Audit Log) ghi nhận toàn bộ biến động vị trí và hiện trạng máy",
    ],
    metrics: [
      { label: "Quy trình điều chuyển", value: "9 loại nghiệp vụ" },
      { label: "Dữ liệu thiết bị", value: "Hồ sơ số đồng bộ" },
      { label: "Kiểm định định kỳ", value: "Tự động cảnh báo" },
    ],
    stack: ["TypeScript", "Next.js", "Node.js", "PostgreSQL", "Prisma", "Docker"],
    isPrivate: true,
  },
  {
    slug: "ql-dang-vien",
    title: "Hệ thống Quản lý Đảng viên — Đảng ủy Bệnh viện",
    subtitle: "Số hóa nghiệp vụ công tác Đảng cho toàn bộ Đảng bộ BV ĐHYD TP.HCM",
    year: "2026",
    category: "Chuyển đổi số & Vận hành",
    org: "Bệnh viện Đại học Y Dược TP.HCM",
    role: "Lead Full-stack Developer (Solo Project)",
    highlight: false,
    summary:
      "Hệ thống số hóa toàn diện hồ sơ đảng viên, phân quyền 2 cấp Đảng ủy — Chi bộ, quản lý nguồn kết nạp, tự động tính tuổi Đảng/tuổi đời, sổ văn bản đến/đi và báo cáo thống kê.",
    challenge:
      "Công tác quản lý đảng viên tại đơn vị lớn có hàng chục chi bộ cơ sở đòi hỏi độ chính xác tuyệt đối về hồ sơ 48 trường thông tin, các mốc thời gian chuyển chính thức, tuổi Đảng và chế độ chính sách. Việc tổng hợp báo cáo thủ công qua Excel thường xuyên phát sinh sai lệch.",
    solution:
      "Phát triển hệ thống hoàn chỉnh qua 5 giai đoạn: phân quyền độc lập cho từng chi bộ; engine tự động tính tuổi đời, tuổi Đảng, hạn hưu trí theo ngày sinh; quản lý nguồn kết nạp theo timeline; tích hợp sổ văn bản đến/đi và dashboard thống kê cơ cấu lý luận chính trị.",
    architecture: {
      frontend: "React, Tailwind CSS, Tokenized Đảng bộ Design System",
      backend: "Node.js Express, TypeScript, JWT with Chi-bo Scoping",
      database: "PostgreSQL, DB Migrations & Seed data",
      deployment: "Railway Container, Nixpacks configuration",
    },
    keyFeatures: [
      "Hồ sơ đảng viên 48 trường thông tin chuẩn quy định Ban Tổ chức Trung ương",
      "Phân quyền 2 cấp nghiêm ngặt: Đảng bộ quản lý toàn diện, Chi bộ chỉ thấy dữ liệu nội bộ",
      "Thuật toán tự tính tuổi, tuổi Đảng, thời gian công tác còn lại tự động chuẩn xác theo ngày",
      "Quy trình quản lý nguồn kết nạp với timeline tiến độ hồ sơ và chuyển đổi 1 chạm",
      "Xuất / Nhập Excel giữ nguyên cấu trúc header 2 tầng phức tạp của biểu mẫu gốc",
    ],
    metrics: [
      { label: "Giai đoạn hoàn thành", value: "5/5 giai đoạn" },
      { label: "Trường dữ liệu hồ sơ", value: "48 trường chuẩn" },
      { label: "Tự động hóa", value: "100% tính tuổi" },
    ],
    stack: ["Node.js", "Express", "PostgreSQL", "React", "JWT", "Railway"],
    isPrivate: true,
  },
  {
    slug: "hoinghi-vcnld-2026",
    title: "Cổng Thông tin Hội nghị Viên chức — Người lao động 2026",
    subtitle: "Cổng trực tuyến thu thập ý kiến, đề cử đại biểu và phân tích phản hồi bằng AI",
    year: "2026",
    category: "AI & Data Science",
    org: "Bệnh viện Đại học Y Dược TP.HCM",
    role: "Lead Full-stack Developer & AI Integrator",
    highlight: false,
    summary:
      "Cổng tiếp nhận ý kiến đóng góp và đề cử đại biểu cho Hội nghị đại biểu VC-NLĐ cấp Bệnh viện; ứng dụng AI phân loại chủ đề và tổng hợp báo cáo tự động.",
    challenge:
      "Trước đây, bệnh viện dùng biểu mẫu Google Form với các ô văn bản tự do, dẫn đến việc phòng chuyên môn phải đọc thủ công hàng trăm ý kiến dài dòng, trùng lặp và tốn nhiều ngày để phân loại vào từng mảng công tác.",
    solution:
      "Xây dựng cổng trực tuyến với biểu mẫu nhập liệu có cấu trúc; tích hợp mô hình ngôn ngữ lớn (LLM) để tự động phân tích ngữ nghĩa, phân loại vào các nhóm chủ đề (chế độ chính sách, chuyên môn y tế, cơ sở vật chất, đào tạo) và trực quan hóa xu hướng phản hồi cho ban tổ chức.",
    architecture: {
      frontend: "Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion",
      backend: "Next.js API Routes, LLM Processing Pipeline",
      database: "PostgreSQL, Excel Auto-generator",
      deployment: "Vercel / On-premise",
    },
    keyFeatures: [
      "Biểu mẫu nộp phiếu tổng hợp phân cấp theo chức danh, đơn vị và mã viên chức",
      "Tính năng đính kèm biên bản hội nghị cấp tổ (PDF, hình ảnh) kiểm tra tính xác thực",
      "AI tự động phân loại và tóm tắt ý kiến đóng góp theo từng nhóm chủ đề",
      "Trang quản trị cho Phòng Hành chính: theo dõi tiến độ nộp theo thời gian thực",
      "Xuất dữ liệu Excel chuẩn xác danh sách đại biểu và ý kiến tổng hợp phục vụ Đoàn Chủ tịch",
    ],
    metrics: [
      { label: "Tỷ lệ nộp đúng hạn", value: "100% Tổ CĐ" },
      { label: "Thời gian tổng hợp", value: "Từ 3 ngày -> 1 giờ" },
      { label: "Phân cụm AI", value: "Tự động theo chủ đề" },
    ],
    stack: ["Next.js", "TypeScript", "LLM", "NLP", "Tailwind CSS", "PostgreSQL"],
    isPrivate: true,
  },
  {
    slug: "umc-survey",
    title: "Hệ thống Khảo sát Nội bộ BV ĐHYD TP.HCM",
    subtitle: "Phần mềm khảo sát nhân viên y tế tối ưu trải nghiệm thiết bị di động",
    year: "2026",
    category: "Chuyển đổi số & Vận hành",
    org: "Bệnh viện Đại học Y Dược TP.HCM",
    role: "Full-stack Developer",
    highlight: false,
    summary:
      "Nền tảng khảo sát nội bộ bệnh viện tối ưu cho smartphone, xác thực định danh nhân viên, chống nộp trùng lặp phiếu và thống kê phản hồi thời gian thực.",
    challenge:
      "Nhân viên y tế (bác sĩ, điều dưỡng) có đặc thù công việc lâm sàng bận rộn, hiếm khi ngồi máy tính bàn. Các khảo sát gửi qua link thông thường có tỷ lệ phản hồi thấp, dễ trùng phiếu hoặc thông tin người điền không đồng nhất với danh bạ nhân sự.",
    solution:
      "Phát triển ứng dụng khảo sát chuẩn Mobile-first; người dùng chỉ cần nhập Mã số nhân viên (Employee ID) một lần để hệ thống tự động đối chiếu thông tin khoa/phòng và hiển thị các khảo sát cần thực hiện, đảm bảo nguyên tắc mỗi nhân sự một phiếu duy nhất.",
    architecture: {
      frontend: "Next.js 16 (App Router), React 19, Tailwind CSS 4",
      backend: "Next.js Server Actions, Prisma 7 ORM",
      database: "PostgreSQL 17 Container",
      deployment: "Railway Cloud Deployment, Playwright Automated Testing",
    },
    keyFeatures: [
      "Giao diện vuốt chạm mượt mà tối ưu 100% cho màn hình điện thoại di động",
      "Cơ chế xác thực bằng Mã nhân viên, kiểm tra trạng thái nộp phiếu tức thời",
      "Bảo mật thông tin phản hồi và hỗ trợ khảo sát ẩn danh khi cần thiết",
      "Báo cáo thống kê tiến độ hoàn thành theo từng khoa/phòng/trung tâm",
    ],
    metrics: [
      { label: "Tỷ lệ tham gia trên di động", value: "> 90%" },
      { label: "Kiểm soát trùng lặp", value: "Tuyệt đối 100%" },
      { label: "Framework", value: "Next.js 16 + React 19" },
    ],
    stack: ["Next.js 16", "React 19", "Tailwind CSS 4", "PostgreSQL 17", "Prisma 7", "Railway"],
    isPrivate: true,
  },
  {
    slug: "van-an-telehealth",
    title: "Vạn An Healthcare — Telehealth & Cấp cứu Kiều bào",
    subtitle: "Hệ thống quản lý y tế đa nền tảng kết nối kiều bào và người thân tại Việt Nam",
    year: "2025",
    category: "Full-stack System",
    org: "Bệnh viện Đa khoa Vạn An",
    role: "Full-stack Developer (Web & Mobile Integration)",
    highlight: true,
    summary:
      "Nền tảng y tế gồm 3 ứng dụng: Backend API, Merchant Portal và Mobile App; hỗ trợ đặt lịch khám bệnh, gọi cấp cứu khẩn cấp và thanh toán trực tuyến.",
    challenge:
      "Người Việt Nam sinh sống tại nước ngoài có nhu cầu theo dõi sức khỏe và mua gói khám định kỳ cho cha mẹ ở quê nhà, nhưng thiếu một kênh thanh toán quốc tế và hệ thống cập nhật tình trạng khám chữa bệnh minh bạch.",
    solution:
      "Xây dựng hệ thống gồm 3 ứng dụng liên thông: Mobile App cho người dùng đặt lịch và theo dõi hồ sơ; Merchant Portal cho ban giám đốc và bộ phận điều hành; Backend API tích hợp cổng thanh toán trực tuyến (VNPay, MoMo, ZaloPay) và module điều phối xe cấp cứu khẩn cấp.",
    architecture: {
      frontend: "React 18, Redux Toolkit, Material-UI (Portal) + React Native / Expo (Mobile App)",
      backend: "Node.js, Express REST API, MongoDB Mongoose",
      database: "MongoDB Atlas",
      deployment: "AWS / Cloud Server",
    },
    keyFeatures: [
      "Mobile App hỗ trợ đặt lịch khám cho người thân, lưu trữ hồ sơ bệnh án số hóa",
      "Tính năng kích hoạt cuộc gọi xe cấp cứu khẩn cấp với định vị vị trí thời gian thực",
      "Danh mục 13+ gói khám sức khỏe tổng quát và chuyên sâu đa dạng",
      "Cổng thanh toán đa phương thức hỗ trợ thẻ nội địa và thẻ quốc tế",
      "Merchant Portal quản trị lịch hẹn, danh sách bác sĩ, chuyên khoa và doanh thu",
    ],
    metrics: [
      { label: "Kiến trúc", value: "3 Ứng dụng" },
      { label: "Gói khám chuyên sâu", value: "13+ Gói khám" },
      { label: "Cổng thanh toán", value: "VNPay, MoMo, ZaloPay" },
    ],
    stack: ["Node.js", "Express", "MongoDB", "React", "React Native", "Expo", "Redux"],
    isPrivate: true,
  },
  {
    slug: "crm-umc",
    title: "Hospital CRM — Quản lý Nhà Tài trợ & Công tác Xã hội",
    subtitle: "Hệ thống CRM chuyên biệt quản lý nguồn tài trợ cho bệnh viện tuyến cuối",
    year: "2025",
    category: "Full-stack System",
    org: "Bệnh viện Đại học Y Dược TP.HCM",
    role: "Frontend & Full-stack Developer",
    highlight: false,
    summary:
      "Hệ thống quản lý mối quan hệ nhà tài trợ cá nhân, doanh nghiệp và các quỹ từ thiện; theo dõi các khoản tài trợ tiền mặt, thiết bị y tế và hoạt động thiện nguyện.",
    challenge:
      "Công tác tiếp nhận tài trợ y tế cho bệnh nhân nghèo và trang thiết bị thường xuyên diễn ra với nhiều nguồn khác nhau (tiền mặt, máy móc y tế, học bổng). Việc ghi nhận thủ công thiếu liên kết lịch sử tương tác giữa bệnh viện và các tổ chức thiện nguyện.",
    solution:
      "Xây dựng hệ thống CRM hiện đại với Next.js và Prisma; phân cấp nhà tài trợ (VIP, thường xuyên, tiềm năng), ghi nhận lịch sử tương tác đa kênh và quản trị các chiến dịch viện trợ minh bạch.",
    architecture: {
      frontend: "Next.js 14 (App Router), TypeScript, Shadcn/ui, Tailwind CSS, TanStack Query",
      backend: "Next.js API Routes, NextAuth.js Authentication",
      database: "PostgreSQL Container, Prisma ORM",
      deployment: "Docker & Railway Deployment",
    },
    keyFeatures: [
      "Quản lý hồ sơ nhà tài trợ đa phân loại (Cá nhân, Doanh nghiệp, Tổ chức, Cộng đồng)",
      "Theo dõi đa dạng hình thức: Tài trợ tài chính đa tiền tệ, hiện vật y tế, công tác xã hội",
      "Dashboard quản trị với KPI cards và biểu đồ trực quan hóa dòng tài trợ theo thời gian",
      "Bộ lọc nâng cao TanStack Table hỗ trợ xuất báo cáo kiểm toán nhanh chóng",
    ],
    metrics: [
      { label: "Phân loại đối tác", value: "4 Nhóm chính" },
      { label: "Quản lý nguồn lực", value: "Tiền mặt & Hiện vật" },
      { label: "Báo cáo dòng tiền", value: "Thời gian thực" },
    ],
    stack: ["Next.js 14", "TypeScript", "Prisma", "PostgreSQL", "Shadcn/ui", "Docker"],
    githubUrl: "https://github.com/corner-25/crm-umc",
    isPrivate: false,
  },
  {
    slug: "weekly-report-umc",
    title: "Hệ thống Quản lý Báo cáo Tuần Phòng ban",
    subtitle: "Nền tảng số hóa báo cáo công tác định kỳ cho các đơn vị trực thuộc bệnh viện",
    year: "2025",
    category: "Chuyển đổi số & Vận hành",
    org: "Bệnh viện Đại học Y Dược TP.HCM",
    role: "Full-stack Developer",
    highlight: false,
    summary:
      "Nền tảng tổng hợp báo cáo tuần của các phòng ban chức năng; tự động tính toán chu kỳ tuần làm việc, đính kèm biên bản và theo dõi tiến độ nhiệm vụ.",
    challenge:
      "Mỗi tuần, các phòng ban phải gửi file báo cáo dạng Word/Excel qua email, khiến văn phòng bệnh viện mất nhiều công sức để tổng hợp thành bản tin tuần chung trình Ban Giám đốc.",
    solution:
      "Ứng dụng web cho phép đại diện từng phòng ban nhập liệu trực tiếp các đầu việc hoàn thành, việc tồn đọng và đề xuất; tích hợp công cụ chọn tuần thông minh và tự động xuất bản báo cáo tổng hợp.",
    architecture: {
      frontend: "Next.js, TypeScript, Tailwind CSS, Lucide Icons",
      backend: "Next.js API Routes, NextAuth.js",
      database: "PostgreSQL, Prisma ORM",
      deployment: "Railway CI/CD One-click Deploy",
    },
    keyFeatures: [
      "Quản lý danh sách báo cáo tuần dạng Grid cards trực quan theo từng năm",
      "Week picker tự động tính ngày bắt đầu và kết thúc của tuần hành chính",
      "Quản lý đính kèm biên bản (PDF, Excel, Word) an toàn và tiện lợi",
      "Hỗ trợ phân quyền đại diện từng đơn vị tạo và chỉnh sửa nội dung",
    ],
    metrics: [
      { label: "Thời gian tổng hợp", value: "Tự động 100%" },
      { label: "Triển khai", value: "Railway Cloud" },
    ],
    stack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Railway"],
    githubUrl: "https://github.com/corner-25/weekly-report-umc",
    isPrivate: false,
  },
  {
    slug: "cds-clinical-ai",
    title: "Hệ Hỗ trợ Quyết định Lâm sàng — Khóa luận Tốt nghiệp 9.5/10",
    subtitle: "Tích hợp Khai phá Luật kết hợp (Apriori/FP-Growth) và Học sâu (FCNN)",
    year: "2025",
    category: "Tin học Y tế",
    org: "Trường Đại học Bách khoa ĐHQG TP.HCM & BVĐK KV Cai Lậy",
    role: "Tác giả nghiên cứu (Thủ khoa chuyên ngành)",
    highlight: true,
    summary:
      "Mô hình AI dự báo tái nhập viện trong 7 ngày và tử vong nội viện từ hơn 100.000 lượt khám, dung hòa giữa độ chính xác cao của Deep Learning và tính diễn giải của Luật lâm sàng.",
    challenge:
      "Mô hình học sâu (Deep Learning) trong y tế thường bị xem là 'hộp đen' (Black-box), khiến các bác sĩ lâm sàng e ngại áp dụng vào thực tế điều trị vì không thể giải thích được lý do đưa ra dự đoán.",
    solution:
      "Đề xuất kiến trúc lai: Khai phá 57 luật lâm sàng có độ hỗ trợ cao bằng Apriori và FP-Growth, sau đó tích hợp các luật này cùng chuỗi sinh hiệu của bệnh nhân vào mạng nơ-ron truyền thẳng (FCNN).",
    architecture: {
      frontend: "Streamlit Interactive Clinical Prototype",
      backend: "Python, PyTorch, Scikit-learn, MLflow",
      database: "Snowflake Data Warehouse, SQL ETL Pipelines",
      deployment: "Local Hospital Server Prototype",
    },
    keyFeatures: [
      "Xử lý và ẩn danh hóa hơn 100.000 hồ sơ bệnh án giai đoạn 2022–2024",
      "Đạt AUROC 0.91 khi dự đoán tái nhập viện trong 7 ngày và 0.88 khi dự đoán tử vong",
      "Khả năng diễn giải từng ca bệnh: bác sĩ biết chính xác luật lâm sàng nào kích hoạt cảnh báo",
      "Được công bố trên tạp chí khoa học chuyên ngành trong nước và quốc tế (Scopus)",
    ],
    metrics: [
      { label: "Điểm khóa luận", value: "9.5/10 (Thủ khoa chuyên ngành)" },
      { label: "AUROC tái nhập viện", value: "0.91" },
      { label: "Hồ sơ phân tích", value: "> 100.000 lượt" },
    ],
    stack: ["Python", "PyTorch", "Snowflake", "ETL", "Streamlit", "Association Rules"],
    isPrivate: false,
  },
  {
    slug: "diem-bao-tu-dong",
    title: "Hệ thống Điểm báo Y tế & Quản trị Bệnh viện 7h Sáng",
    subtitle: "Agent AI tự động tổng hợp tin tức điều hành bệnh viện và gửi email điểm báo cho Ban Giám đốc",
    year: "2026",
    category: "AI & Data Science",
    org: "Bệnh viện Đại học Y Dược TP.HCM",
    role: "AI Engineer & System Developer",
    highlight: true,
    summary:
      "Service tự động chạy vào 7h sáng hằng ngày, thu thập tin tức từ các báo chính thống dưới góc nhìn quản trị bệnh viện công lập (viện phí, BHYT, đấu thầu, chuyển đổi số y tế), dùng LLM tóm tắt chuyên sâu và gửi email điểm báo cho Ban Lãnh đạo.",
    challenge:
      "Lãnh đạo bệnh viện cần nắm bắt kịp thời các thay đổi về chính sách y tế, thông tư viện phí, biến động đấu thầu thuốc/vật tư nhưng không có thời gian duyệt qua hàng chục trang báo chí mỗi sáng. Các công cụ điểm báo đại trà thường tập trung vào tin giật gân hoặc tin sức khỏe phổ thông, không phục vụ nhu cầu điều hành.",
    solution:
      "Thiết kế AI Agent tự động thức dậy lúc 7h sáng: crawl tin tức từ các đầu báo y tế và chính thống, lọc theo 3 trụ cột (Quản trị & chính sách, Chuyển đổi số y tế, An sinh tác động người bệnh), dùng LLM tóm tắt theo câu hỏi cốt lõi 'Hôm nay có gì ảnh hưởng tới việc điều hành bệnh viện?' và gửi bản tin HTML qua email tự động.",
    architecture: {
      frontend: "HTML Email Responsive Template",
      backend: "Node.js, TypeScript, Cron Scheduler",
      aiEngine: "LLM Policy Summarizer & Relevance Classifier",
      deployment: "Docker / Cloud Server",
    },
    keyFeatures: [
      "Thu thập tự động đa nguồn báo chí chính thống mỗi sáng",
      "Phân loại thông tin theo 3 trụ cột quản trị bệnh viện công lập",
      "Tóm tắt ngắn gọn có dẫn nguồn bài viết gốc và tác động điều hành",
      "Hệ thống gửi email tự động đúng 7h00 sáng cho Ban Giám đốc",
    ],
    metrics: [
      { label: "Thời gian gửi", value: "7h00 Sáng" },
      { label: "Bộ lọc tin tức", value: "3 Trụ cột" },
      { label: "Tự động hóa", value: "100% Cron" },
    ],
    stack: ["TypeScript", "Node.js", "LLM", "Web Scraping", "Email Engine", "Docker"],
    isPrivate: true,
  },
  {
    slug: "disease-model-syt",
    title: "Mô hình Bệnh tật & Giám sát Dịch tễ Toàn dân (Sở Y tế TP.HCM)",
    subtitle: "Kiến trúc hệ thống phân tích dữ liệu lâm sàng quy mô lớn ~4 triệu dân/năm",
    year: "2026",
    category: "Tin học Y tế",
    org: "Sở Y tế TP. Hồ Chí Minh",
    role: "System Architect & Lead Data Modeler",
    highlight: true,
    summary:
      "Thiết kế kiến trúc nền tảng giám sát dịch tễ, phân tầng nguy cơ cá nhân và hỗ trợ hoạch định chính sách y tế công cộng cho ~4 triệu dân/năm dựa trên dữ liệu khám sức khỏe lao động và người cao tuổi.",
    challenge:
      "Mở rộng quy mô từ cấp bệnh viện (bài học từ Disease Model UMC) lên cấp toàn thành phố với hàng chục triệu bản ghi khám và hàng trăm triệu dòng xét nghiệm đòi hỏi kiến trúc hybrid (PII on-prem, analytics cloud), chuẩn hóa ICD-10 và giải quyết lỗ hổng dữ liệu địa lý.",
    solution:
      "Xây dựng kiến trúc phân tích 4 tầng: Tầng mô tả (tỷ lệ hiện mắc/đồng mắc) -> Tầng kiểu hình/nguy cơ (SCORE2, phân cụm) -> Quỹ đạo thời gian (Markov) -> Tầng dự báo & can thiệp (Care gap). Tích hợp kiểm toán bảo mật k-anonymity và khoảng tin cậy Wilson CI cho mọi chỉ số dịch tễ.",
    architecture: {
      frontend: "Next.js, TypeScript, Tailored Epidemiological Dashboards",
      backend: "Python FastAPI, ETL Microservices, Polars/DuckDB",
      database: "Hybrid Architecture (PostgreSQL / CSDL Sở Y tế)",
      deployment: "Hybrid Cloud & On-premise Secure Infrastructure",
    },
    keyFeatures: [
      "Quy mô thiết kế phục vụ giám sát ~4 triệu người dân/năm",
      "Xử lý dữ liệu đa nguồn: khám sức khỏe lao động (M3) và người cao tuổi (M4)",
      "Mô hình dự báo nguy cơ tim mạch SCORE2 và phân tích quỹ đạo Markov",
      "Bảo mật thống kê: che số liệu ô nhỏ (n<5) và kiểm tra k-anonymity",
      "Chuẩn hóa danh mục theo ICD-10 BYT 2021 có phân nhóm tiếng Việt",
    ],
    metrics: [
      { label: "Quy mô mục tiêu", value: "~4 Triệu dân" },
      { label: "Hạ tầng", value: "Hybrid Secure" },
      { label: "Phân loại chuẩn", value: "ICD-10 BYT" },
    ],
    stack: ["Python", "Polars", "TypeScript", "PostgreSQL", "Epidemiology", "System Architecture"],
    isPrivate: true,
  },
  {
    slug: "handbook-bvdhyd",
    title: "Sổ tay Viên chức & Trợ lý AI Pháp quy Bệnh viện",
    subtitle: "Mobile App + Web Admin + Trợ lý AI RAG cho nhân viên BV ĐHYD TP.HCM",
    year: "2026",
    category: "AI & Data Science",
    org: "Bệnh viện Đại học Y Dược TP.HCM",
    role: "Full-stack Developer & AI Engineer",
    highlight: false,
    summary:
      "Ứng dụng di động kết hợp trợ lý AI RAG giúp nhân viên y tế tra cứu quy chế, quy trình hành chính, chế độ đãi ngộ và văn bản nội bộ tức thì bằng ngôn ngữ tự nhiên.",
    challenge:
      "Bệnh viện có hàng trăm quy chế, thông tư, quy trình nghiệp vụ dài hàng nghìn trang. Nhân viên mới và thư ký mất nhiều thời gian tra cứu thủ công, dễ hiểu sai quy định hoặc tốn công hỏi đi hỏi lại bộ phận hành chính - nhân sự.",
    solution:
      "Xây dựng hệ thống monorepo gồm Mobile App, Web Admin và API Server; tích hợp Vector Search (PostgreSQL pgvector / HNSW index) và Full-Text Search (FTS) với Redis cache; trợ lý AI trích dẫn chính xác điều khoản quy chế để giải đáp thắc mắc.",
    architecture: {
      frontend: "React Native / Expo (Mobile App) + Next.js (Admin Portal)",
      backend: "Node.js, TypeScript, Hono / Express, Redis Cache",
      database: "PostgreSQL with pgvector (HNSW index) + Prisma ORM",
      aiEngine: "RAG Pipeline with Semantic Chunking & Re-ranking",
      deployment: "Docker Compose, On-premise Hospital Server",
    },
    keyFeatures: [
      "Mobile App tiện lợi cho viên chức tra cứu mọi lúc mọi nơi",
      "Trợ lý AI hỏi đáp quy chế tự động có trích dẫn nguồn văn bản cụ thể",
      "Tìm kiếm lai (Hybrid Search) kết hợp ngữ nghĩa và từ khóa tiếng Việt",
      "Web Admin cho Phòng Hành chính cập nhật văn bản và quản lý người dùng",
      "Thử nghiệm thành công giai đoạn Pilot cho ~50 thư ký hành chính",
    ],
    metrics: [
      { label: "Mô hình tìm kiếm", value: "Hybrid RAG" },
      { label: "Độ trễ phản hồi", value: "< 1.5 giây" },
      { label: "Người dùng pilot", value: "~50 Thư ký" },
    ],
    stack: ["TypeScript", "Next.js", "React Native", "PostgreSQL", "pgvector", "Redis", "Docker"],
    isPrivate: true,
  },
  {
    slug: "dashboard-to-xe",
    title: "Hệ thống Quản lý & Điều phối Đội xe Bệnh viện (Fleet Management)",
    subtitle: "Tự động tính quãng đường đồng hồ, phân tích hiệu suất xe và tối ưu chi phí công tác",
    year: "2025",
    category: "Chuyển đổi số & Vận hành",
    org: "Bệnh viện Đại học Y Dược TP.HCM",
    role: "Product Developer & Data Analyst",
    highlight: false,
    summary:
      "Dashboard phân tích và quản lý vận hành đội xe công tác bệnh viện; tự động tính toán quãng đường dựa trên chỉ số công-tơ-mét, giám sát giờ chạy và đo lường hiệu suất tài xế.",
    challenge:
      "Quy trình theo dõi đội xe công tác phục vụ chuyên gia, đưa đón bệnh nhân và vận chuyển thuốc/mẫu xét nghiệm trước đây ghi nhận thủ công trên sổ tay; việc tính toán số km xe chạy, hao hụt nhiên liệu và đối soát tiền vé cầu đường thường xuyên phát sinh sai số.",
    solution:
      "Xây dựng hệ thống bảng điều hành tự động hóa: tài xế cập nhật chỉ số đồng hồ khởi hành và kết thúc; thuật toán tự động tính toán quãng đường, thời gian di chuyển, suất tiêu hao nhiên liệu và đối chiếu với lộ trình điều xe của Phòng Hành chính.",
    architecture: {
      frontend: "Python Streamlit, Data Visualization Components",
      backend: "Python Data Processing Engine",
      database: "GitHub Storage / SQLite / PostgreSQL",
      deployment: "Cloud & Internal Web Server",
    },
    keyFeatures: [
      "Tự động tính số km di chuyển dựa trên chênh lệch chỉ số công-tơ-mét",
      "Báo cáo hiệu suất theo từng đầu xe, biển số và tài xế",
      "Theo dõi chi phí vận hành: xăng dầu, bảo dưỡng định kỳ, phí cầu đường",
      "Bộ lọc động theo khoảng thời gian, phòng ban yêu cầu xe và mục đích chuyến đi",
    ],
    metrics: [
      { label: "Quãng đường", value: "Tự động 100%" },
      { label: "Thời gian đối soát", value: "Giảm 80%" },
      { label: "Hiệu suất tài xế", value: "Theo dõi 24/7" },
    ],
    stack: ["Python", "Streamlit", "Pandas", "Fleet Management", "Data Analytics"],
    githubUrl: "https://github.com/corner-25/dashboard-to-xe",
    isPrivate: false,
  },
  {
    slug: "bo-chi-so-benh-vien",
    title: "Bộ Chỉ số Hoạt động Bệnh viện — Nền tảng Quản trị & Nộp lưu Dữ liệu Toàn viện",
    subtitle: "Ban hành danh mục chỉ số thống nhất toàn viện, nộp lưu dữ liệu hàng tháng và trực quan hóa tức thời",
    year: "2025 — Hiện tại",
    category: "Chuyển đổi số & Vận hành",
    org: "Bệnh viện Đại học Y Dược TP.HCM",
    role: "Lead Product Developer & Data Analyst",
    highlight: true,
    summary:
      "Hệ thống chuẩn hóa và ban hành danh mục bộ chỉ số hoạt động thống nhất toàn viện; cung cấp phân hệ cho các khoa, phòng, trung tâm nộp lưu dữ liệu định kỳ hằng tháng và trực quan hóa xu hướng tức thời trên nền tảng web-app (triển khai từ 2025 và liên tục phát triển mở rộng).",
    challenge:
      "Tại bệnh viện tuyến cuối quy mô lớn, mỗi khoa/phòng/trung tâm trước đây tự theo dõi chỉ số với định nghĩa và biểu mẫu rời rạc. Việc thu thập số liệu thủ công qua văn bản hoặc bảng tính Excel gây độ trễ lớn, thiếu cơ chế xác thực dữ liệu và Ban Giám đốc không có bức tranh toàn cảnh, nhất quán về hiệu quả hoạt động toàn viện.",
    solution:
      "Xây dựng hệ thống số hóa bộ chỉ số hoạt động thống nhất toàn viện: ban hành danh mục chuẩn các nhóm chỉ số chuyên môn, hành chính và vận hành; xây dựng phân hệ nộp lưu trực tuyến định kỳ hằng tháng với cơ chế xác thực dữ liệu chặt chẽ; tự động tổng hợp và trực quan hóa biểu đồ diễn tiến chỉ số ngay trên nền tảng web-app, tạo cơ sở dữ liệu số liên tục từ năm 2025.",
    architecture: {
      frontend: "Next.js, React, Tailwind CSS, Interactive Charts",
      backend: "Python Data Engine, Next.js Server Actions, Data Validation Pipeline",
      database: "PostgreSQL Data Store, Monthly Submission Ledger",
      deployment: "Máy chủ nội bộ bệnh viện / Docker",
    },
    keyFeatures: [
      "Ban hành danh mục bộ chỉ số hoạt động chuẩn hóa, thống nhất cho tất cả khoa/phòng/trung tâm",
      "Phân hệ nộp lưu dữ liệu trực tuyến định kỳ hằng tháng với phân quyền theo từng đơn vị",
      "Kiểm soát tiến độ nộp số liệu và thuật toán kiểm tra tính hợp lệ dữ liệu tự động",
      "Trực quan hóa diễn tiến và so sánh chỉ số đa chiều ngay trên giao diện web-app",
      "Lưu trữ lịch sử dữ liệu liên tục từ năm 2025 và sẵn sàng mở rộng các nhóm chỉ số mới",
    ],
    metrics: [
      { label: "Phạm vi áp dụng", value: "Thống nhất toàn viện" },
      { label: "Chu kỳ nộp lưu", value: "Định kỳ hằng tháng" },
      { label: "Lộ trình phát triển", value: "Từ 2025 — Tiếp tục" },
    ],
    stack: ["Next.js", "Python", "PostgreSQL", "Data Analytics", "Hospital KPIs", "Tailwind CSS"],
    isPrivate: true,
  },
  {
    slug: "dashboard-phong-hanh-chinh",
    title: "Dashboard Báo cáo Điều hành Ban Giám đốc",
    subtitle: "Theo dõi hằng ngày chỉ số khám chữa bệnh, khía cạnh khẩn cấp và tổng hợp đa chu kỳ tuần/tháng/quý/năm",
    year: "2025 — Hiện tại",
    category: "Chuyển đổi số & Vận hành",
    org: "Bệnh viện Đại học Y Dược TP.HCM",
    role: "Lead Dashboard Engineer & Business Analyst",
    highlight: true,
    summary:
      "Bảng điều hành số liệu phục vụ trực tiếp Ban Giám đốc bệnh viện: cập nhật hằng ngày các chỉ số khám chữa bệnh, tình trạng quá tải, các khía cạnh khẩn cấp trong vận hành; tự động tổng hợp số liệu theo ngày, tuần, tháng, quý, năm và tối ưu xem nhanh trên điện thoại di động.",
    challenge:
      "Ban Giám đốc cần nắm bắt tức thời các biến động nóng trong ngày về lưu lượng người bệnh khám chữa bệnh, ca cấp cứu, phẫu thuật, các tình huống khẩn cấp cũng như tiến độ giải quyết công việc trọng yếu, nhưng các báo cáo văn bản truyền thống thường bị chậm trễ và khó đối chiếu so sánh đa chu kỳ.",
    solution:
      "Phát triển phân hệ dashboard điều hành chuyên biệt: tiếp nhận dữ liệu hằng ngày từ các hoạt động khám chữa bệnh và vận hành bệnh viện; cơ chế tự động tổng hợp số liệu linh hoạt theo các chu kỳ ngày -> tuần -> tháng -> quý -> năm; hiển thị trực quan dạng Pivot table với sparkline biến động và tối ưu giao diện hoàn hảo trên thiết bị di động của lãnh đạo.",
    architecture: {
      frontend: "Streamlit Custom UI, Mobile-responsive Charting, Plotly",
      backend: "Python Data Engine, Multi-cycle Aggregation Pipeline",
      database: "GitHub Storage / Secure Automated Data Store, Excel Integration",
      deployment: "Streamlit Cloud / Railway / Internal Hospital Server",
    },
    keyFeatures: [
      "Cập nhật và theo dõi hằng ngày các chỉ số khám chữa bệnh và khía cạnh vận hành khẩn cấp",
      "Cơ chế tự động tổng hợp số liệu đa chu kỳ: theo ngày, tuần, tháng, quý và năm",
      "Bảng Pivot table thông minh phân tích tỷ lệ biến động kèm biểu đồ xu hướng sparkline",
      "Thiết kế Mobile-first tối ưu trải nghiệm xem báo cáo nhanh của Ban Giám đốc trên smartphone",
      "Hỗ trợ xuất báo cáo định dạng chuẩn Excel/CSV phục vụ giao ban điều hành",
    ],
    metrics: [
      { label: "Tần suất cập nhật", value: "Hằng ngày" },
      { label: "Tổng hợp chu kỳ", value: "Ngày/Tuần/Tháng/Quý/Năm" },
      { label: "Trải nghiệm lãnh đạo", value: "Mobile-first" },
    ],
    stack: ["Python", "Streamlit", "Pandas", "Plotly", "Mobile UI", "Data Visualization"],
    githubUrl: "https://github.com/corner-25/dashboard-phong-hanh-chinh",
    isPrivate: false,
  },
  {
    slug: "secrectary-umc-exam",
    title: "Hệ thống Thi Nghiệp vụ & Bình chọn Ảnh Ngày Thư ký BV ĐHYD",
    subtitle: "Cổng thi trắc nghiệm trực tuyến chấm điểm tự động và bình chọn ảnh phong trào",
    year: "2026",
    category: "Full-stack System",
    org: "Bệnh viện Đại học Y Dược TP.HCM",
    role: "Lead Full-stack Developer (Solo Project)",
    highlight: false,
    summary:
      "Nền tảng phục vụ chuỗi hoạt động chào mừng Ngày Thư ký Thế giới tại BV ĐHYD TP.HCM: thi trắc nghiệm nghiệp vụ hành chính có tính giờ, chấm điểm tự động, bảng xếp hạng và triển lãm bình chọn ảnh trực tuyến.",
    challenge:
      "Tổ chức hội thi nghiệp vụ cho hàng trăm thư ký các khoa/phòng trong điều kiện lịch trực bệnh viện phân tán; nếu thi giấy sẽ tốn kém in ấn, mất thời gian chấm thi và khó bảo đảm tính minh bạch, tức thời của kết quả.",
    solution:
      "Phát triển nền tảng web tích hợp: ngân hàng câu hỏi phân quyền theo ca thi; cơ chế đếm ngược thời gian làm bài chống gian lận; tự động chấm điểm và hiển thị bảng xếp hạng Leaderboard ngay khi kết thúc; kèm khu vực triển lãm ảnh và cổng bình chọn có cơ chế chống spam vote.",
    architecture: {
      frontend: "React, Vite, Tailwind CSS, Mobile-responsive UI",
      backend: "Node.js, Express REST API",
      database: "MongoDB / PostgreSQL",
      deployment: "Internal Web Server",
    },
    keyFeatures: [
      "Ngân hàng câu hỏi trắc nghiệm nghiệp vụ hành chính y tế đa dạng",
      "Đồng hồ đếm ngược thời gian thực, tự động thu bài khi hết giờ",
      "Bảng xếp hạng (Leaderboard) vinh danh kết quả thi minh bạch, chính xác",
      "Cổng triển lãm và bình chọn ảnh online với thuật toán kiểm soát lượt bình chọn",
    ],
    metrics: [
      { label: "Chấm thi", value: "Tự động 100%" },
      { label: "Kết quả bảng vàng", value: "Tức thời" },
      { label: "Hội đồng tổ chức", value: "Tiết kiệm 90% công" },
    ],
    stack: ["Node.js", "Express", "React", "Vite", "Tailwind CSS", "MongoDB"],
    isPrivate: true,
  },
  {
    slug: "mindcare-app",
    title: "MindCare — Ứng dụng Chăm sóc Sức khỏe Tinh thần & Hơi thở",
    subtitle: "Nền tảng hỗ trợ giảm căng thẳng, theo dõi cảm xúc và bài tập thở thư giãn hàng ngày",
    year: "2025",
    category: "Full-stack System",
    org: "Dự án Sức khỏe Cộng đồng",
    role: "Frontend Developer & UI/UX Designer",
    highlight: false,
    summary:
      "Ứng dụng chăm sóc sức khỏe tinh thần hỗ trợ người dùng theo dõi cảm xúc hàng ngày, thực hành bài tập thở thư giãn 4-4-4 với hiệu ứng thị giác và các hoạt động phục hồi năng lượng trong 5 phút.",
    challenge:
      "Nhân viên y tế và người làm việc áp lực cao thường xuyên đối mặt với stress và burnout nhưng ít có thời gian tiếp cận các liệu pháp tâm lý dài hạn.",
    solution:
      "Thiết kế ứng dụng tinh gọn, tập trung vào micro-habits: check-in cảm xúc tức thì bằng emoji, vòng lặp bài tập thở hình học dẫn dắt nhịp thở trực quan và các bài tập thư giãn ngắn 5 phút.",
    architecture: {
      frontend: "HTML5, Modern JavaScript, CSS Animations, Canvas Visuals",
      backend: "Local Storage & Micro API",
      deployment: "GitHub Pages / Web Deployment",
    },
    keyFeatures: [
      "Hệ thống Check-in cảm xúc 1–5 kèm emoji trực quan và lời khuyên phù hợp",
      "Bài tập thở 4-4-4 (Hít vào - Giữ hơi - Thở ra) với hiệu ứng vòng tròn nở theo nhịp",
      "Thư viện hoạt động nhanh 5 phút giúp tái tạo năng lượng và giải tỏa âu lo",
      "Giao diện êm dịu, tông màu thư giãn hỗ trợ thiền định",
    ],
    metrics: [
      { label: "Kỹ thuật thở", value: "Chuẩn 4-4-4" },
      { label: "Micro-habits", value: "5 Phút/ngày" },
      { label: "Hiệu ứng nhịp thở", value: "Trực quan Canvas" },
    ],
    stack: ["JavaScript", "HTML5", "CSS3", "Mental Health", "UI/UX"],
    githubUrl: "https://github.com/corner-25/mindcare-app",
    isPrivate: false,
  },
];

export function getProjectBySlug(slug: string): ProjectDetail | undefined {
  return projectsData.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projectsData.map((p) => p.slug);
}

export function getProjectsByCategory(category?: string): ProjectDetail[] {
  if (!category || category === "Tất cả") return projectsData;
  return projectsData.filter((p) => p.category === category);
}

