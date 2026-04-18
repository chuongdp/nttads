import type { Locale } from "@/lib/i18n";

export type AboutStat = { value: string; label: string };
export type AboutPillar = { title: string; description: string };
export type AboutMilestone = { year: string; title: string; description: string };
export type AboutMissionBlock = { title: string; text: string };
export type AboutPlatformCard = { name: string; text: string; serviceSlug: "google-ads" | "facebook-ads" | "tiktok-ads" };

export type AboutPageCopy = {
  metaTitle: string;
  heroEyebrow: string;
  heroTitle: string;
  heroLead: string;
  statsNote: string;
  stats: AboutStat[];
  whoTitle: string;
  whoParagraphs: string[];
  pillarsTitle: string;
  pillarsKicker: string;
  pillars: AboutPillar[];
  missionTitle: string;
  missionLead: string;
  missionBlocks: AboutMissionBlock[];
  visionTitle: string;
  visionText: string;
  timelineTitle: string;
  milestones: AboutMilestone[];
  platformsTitle: string;
  platformsLead: string;
  platforms: AboutPlatformCard[];
  ctaTitle: string;
  ctaLead: string;
  ctaButton: string;
  servicesLinkLabel: string;
  platformCta: string;
};

const vi: AboutPageCopy = {
  metaTitle: "Giới thiệu",
  heroEyebrow: "Về NTT Ads",
  heroTitle: "Đồng hành tăng trưởng bằng paid media có kiểm soát",
  heroLead:
    "Chúng tôi tập trung Google, Meta và TikTok — đặt đo lường và mục tiêu kinh doanh làm trọng tâm, tránh chạy theo vanity metric.",
  statsNote:
    "Các con số dưới đây mang tính định hướng cho website demo — không phải thống kê hợp đồng thực tế.",
  stats: [
    { value: "3+", label: "Trụ cột nền tảng chính (Google · Meta · TikTok)" },
    { value: "Tuần / Sprint", label: "Nhịp báo cáo & tối ưu có milestone rõ" },
    { value: "Conversion-first", label: "Ưu tiên chuẩn hoá conversion trước khi scale ngân sách" },
  ],
  whoTitle: "Chúng tôi là ai",
  whoParagraphs: [
    "NTT Ads là đội ngũ triển khai performance marketing cho doanh nghiệp vừa và nhỏ, startup cần lộ trình rõ và team marketing cần bổ sung chuyên môn nền tảng.",
    "Thay vì hứa KPI cố định, chúng tôi bám theo dữ liệu thật của tài khoản: chi phí, chất lượng traffic, CPA/ROAS, và chất lượng lead — rồi đề xuất bước tiếp theo phù hợp ngành và giai đoạn.",
    "Website này mang mục đích demo quy trình làm việc minh bạch, gần với cách các agency hệ thống triển khai — nhưng quy mô và cam kết thương mại luôn được thống nhất riêng trong hợp đồng.",
  ],
  pillarsTitle: "Điểm khác biệt trong cách làm việc",
  pillarsKicker: "Ba trụ cột vận hành — lấy cảm hứng từ mô hình agency chuyên nghiệp, viết lại cho NTT Ads.",
  pillars: [
    {
      title: "Chi phí & báo cáo minh bạch",
      description:
        "Tách bạch phí nền tảng (tiền chạy ads) và phí dịch vụ khi có; báo cáo theo chiến dịch/ad set để bạn đối soát được tiền đi đâu, hiệu quả ở đâu.",
    },
    {
      title: "Playbook bám tài liệu nền tảng",
      description:
        "Cấu trúc chiến dịch, naming, conversion tracking và policy được tham chiếu từ Google Ads Help, Meta Business Help Center, TikTok for Business — tránh mẹo vặt ngắn hạn.",
    },
    {
      title: "Tối ưu theo giai đoạn, không all-in một lần",
      description:
        "Học từ dữ liệu rồi mới mở rộng: kiểm soát phạm vi khi dữ liệu còn mỏng; mở smart bidding / Advantage+ khi tín hiệu đủ và bạn đồng ý.",
    },
  ],
  missionTitle: "Sứ mệnh",
  missionLead: "Giúp doanh nghiệp ra quyết định marketing trả phí dựa trên số liệu thật — không che giấu rủi ro hay gài KPI ảo.",
  missionBlocks: [
    {
      title: "Phân tích có căn cứ",
      text: "Mỗi đề xuất gắn với event đo được: form, gọi, mua, cài app — tránh tối ưu chỉ nhìn click.",
    },
    {
      title: "Chiến lược phễu rõ",
      text: "Awareness, cân nhắc, chuyển đổi được tách bạch khi cần; tránh nhồi mục tiêu không tương thích trong cùng một nhóm quảng cáo.",
    },
    {
      title: "Sáng tạo phục vụ chuyển đổi",
      text: "Creative phải kể đúng insight và CTA; test hook/angle có ma trận, có giới hạn để không loãng brand.",
    },
  ],
  visionTitle: "Định hướng",
  visionText:
    "Trở thành đối tác triển khai paid media đáng tin khi bạn cần người nắm tài khoản thay vì slide dài — ưu tiên chất lượng đồng hành hơn số lượng khách tối đa.",
  timelineTitle: "Mốc phát triển (minh họa)",
  milestones: [
    { year: "2022", title: "Khởi động team", description: "Tập trung Google Search & Meta lead cho khách B2C thử nghiệm." },
    { year: "2023", title: "Mở rộnh Shopping & TikTok", description: "Bổ sung feed-based ads và video ngắn 9:16 theo brief rõ ràng." },
    { year: "2024", title: "Chuẩn hoá conversion QA", description: "Checklist tag/pixel/CAPI trước khi tăng budget cho mọi account mới." },
    { year: "2025–2026", title: "Demo website & quy trình", description: "Công khai playbook và template báo cáo cho khách xem trước khi ký." },
  ],
  platformsTitle: "Nền tảng chúng tôi triển khai sâu",
  platformsLead: "Mỗi kênh một page dịch vụ riêng — xem chi tiết cách chúng tôi nói về phạm vi và quy trình.",
  platforms: [
    {
      name: "Google Ads",
      text: "Search, Performance Max, Shopping, Display/YouTube — bám intent và conversion.",
      serviceSlug: "google-ads",
    },
    {
      name: "Meta (Facebook & Instagram)",
      text: "Feed, Reels, Story — creative matrix và policy-safe rollout.",
      serviceSlug: "facebook-ads",
    },
    {
      name: "TikTok Ads",
      text: "Spark & In-Feed — hook đầu video, safe zone, đo CPA thực.",
      serviceSlug: "tiktok-ads",
    },
  ],
  ctaTitle: "Bắt đầu trao đổi ngắn",
  ctaLead: "Cho chúng tôi biết mục tiêu, ngân sách dự kiến và ràng buộc — team sẽ phản hồi với hướng đi sơ bộ.",
  ctaButton: "Đi tới form liên hệ",
  servicesLinkLabel: "Xem tất cả dịch vụ",
  platformCta: "Xem chi tiết",
};

const en: AboutPageCopy = {
  metaTitle: "About us",
  heroEyebrow: "About NTT Ads",
  heroTitle: "Growth with disciplined paid media",
  heroLead:
    "We focus on Google, Meta, and TikTok — anchored on measurement and business outcomes, not vanity metrics.",
  statsNote:
    "Figures below are directional for this demo site — not contractual performance stats.",
  stats: [
    { value: "3+", label: "Core platforms (Google · Meta · TikTok)" },
    { value: "Weekly / sprint", label: "Reporting and optimization with clear milestones" },
    { value: "Conversion-first", label: "Validate conversions before scaling spend" },
  ],
  whoTitle: "Who we are",
  whoParagraphs: [
    "NTT Ads is a performance marketing execution team for SMBs, startups that need a clear roadmap, and marketing teams that need platform depth.",
    "Instead of fixed KPI promises, we work from your account reality: cost, traffic quality, CPA/ROAS, and lead quality — then recommend next steps that fit your industry and stage.",
    "This site demonstrates how we communicate scope and cadence transparently — commercial commitments are always defined separately in agreements.",
  ],
  pillarsTitle: "How we work differently",
  pillarsKicker: "Three operating pillars — inspired by professional agency models, rewritten for NTT Ads.",
  pillars: [
    {
      title: "Transparent fees and reporting",
      description:
        "We separate platform spend from service fees when applicable; reports are broken down by campaign/ad set so you can reconcile spend and outcomes.",
    },
    {
      title: "Playbooks grounded in platform guidance",
      description:
        "Structures, naming, conversion tracking, and policy checks reference Google Ads Help, Meta Business Help Center, and TikTok for Business — avoiding short-lived hacks.",
    },
    {
      title: "Phased optimization, not one-shot bets",
      description:
        "Tight scope while data is thin; expand Smart Bidding / Advantage+ when signals and approvals align.",
    },
  ],
  missionTitle: "Mission",
  missionLead: "Help brands make paid marketing decisions from real signals — without hiding risk or inflating KPIs.",
  missionBlocks: [
    {
      title: "Evidence-led analysis",
      text: "Recommendations map to measurable events: forms, calls, purchases, installs — not clicks alone.",
    },
    {
      title: "Clear funnel thinking",
      text: "We separate awareness, consideration, and conversion when needed; avoid incompatible objectives in one ad set.",
    },
    {
      title: "Creative that serves conversion",
      text: "Hooks and CTAs tied to insights; disciplined hook/angle testing with brand guardrails.",
    },
  ],
  visionTitle: "Direction",
  visionText:
    "Be the paid media partner you trust to run accounts — prioritizing quality of partnership over maximizing client count.",
  timelineTitle: "Milestones (illustrative)",
  milestones: [
    { year: "2022", title: "Team kickoff", description: "Google Search and Meta lead gen for early B2C pilots." },
    { year: "2023", title: "Shopping & TikTok", description: "Feed-based ads and 9:16 video with tight creative briefs." },
    { year: "2024", title: "Conversion QA standard", description: "Tag/Pixel/CAPI checklist before budget increases on new accounts." },
    { year: "2025–2026", title: "Demo site & playbooks", description: "Public templates so prospects see cadence before signing." },
  ],
  platformsTitle: "Platforms we go deep on",
  platformsLead: "Each channel has its own service page — read how we describe scope and process.",
  platforms: [
    {
      name: "Google Ads",
      text: "Search, Performance Max, Shopping, Display/YouTube — intent and conversions.",
      serviceSlug: "google-ads",
    },
    {
      name: "Meta (Facebook & Instagram)",
      text: "Feed, Reels, Story — creative matrix and policy-safe rollout.",
      serviceSlug: "facebook-ads",
    },
    {
      name: "TikTok Ads",
      text: "Spark & In-Feed — opening hooks, safe zones, real CPA measurement.",
      serviceSlug: "tiktok-ads",
    },
  ],
  ctaTitle: "Start a short conversation",
  ctaLead: "Share goals, budget guardrails, and constraints — we will respond with a lightweight next-step outline.",
  ctaButton: "Go to contact form",
  servicesLinkLabel: "View all services",
  platformCta: "View details",
};

const zh: AboutPageCopy = {
  metaTitle: "关于我们",
  heroEyebrow: "关于 NTT Ads",
  heroTitle: "以纪律性付费媒体推动增长",
  heroLead:
    "我们聚焦 Google、Meta 与 TikTok — 以可衡量结果与业务目标为中心，而非虚荣指标。",
  statsNote:
    "以下数字为演示站点的方向性描述 — 不构成合同层面的业绩承诺。",
  stats: [
    { value: "3+", label: "核心平台（Google · Meta · TikTok）" },
    { value: "周 / 迭代", label: "有里程碑的报告与优化节奏" },
    { value: "转化优先", label: "放量前先完成转化与追踪验收" },
  ],
  whoTitle: "我们是谁",
  whoParagraphs: [
    "NTT Ads 面向中小企业、需要清晰路径的创业团队，以及需要平台深度支持的内部市场团队。",
    "我们不承诺固定 KPI，而是基于账户真实数据：成本、流量质量、CPA/ROAS 与线索质量 — 再给出符合行业与阶段的下一步建议。",
    "本站用于展示我们如何透明沟通范围与节奏 — 商务承诺以合同单独约定为准。",
  ],
  pillarsTitle: "工作方式的差异点",
  pillarsKicker: "三根支柱 — 借鉴专业代理商方法，为 NTT Ads 重写。",
  pillars: [
    {
      title: "费用与报表透明",
      description:
        "在适用情况下区分平台花费与服务费；报表按战役/广告组拆解，便于核对投入与结果。",
    },
    {
      title: "贴合官方指南的打法",
      description:
        "结构、命名、转化与政策检查参考 Google Ads 帮助中心、Meta 业务帮助中心与 TikTok for Business — 避免短期投机技巧。",
    },
    {
      title: "分阶段优化",
      description:
        "数据稀薄时收紧范围；信号与审批到位后再逐步启用智能出价 / Advantage+。",
    },
  ],
  missionTitle: "使命",
  missionLead: "帮助品牌基于真实信号做付费决策 — 不隐瞒风险，不夸大 KPI。",
  missionBlocks: [
    {
      title: "有据分析",
      text: "建议对应可测事件：表单、电话、购买、安装 — 不仅看点击。",
    },
    {
      title: "漏斗清晰",
      text: "在需要时拆分认知、考虑与转化；避免同一广告组塞入不兼容目标。",
    },
    {
      title: "服务转化的创意",
      text: "钩子与 CTA 贴合洞察；有矩阵、有边界的 hook/angle 测试，守住品牌。",
    },
  ],
  visionTitle: "方向",
  visionText:
    "成为你愿意托付账户的付费媒体伙伴 — 重视陪伴质量，而非无限扩张客户数量。",
  timelineTitle: "发展节点（示例）",
  milestones: [
    { year: "2022", title: "团队起步", description: "早期以 Google 搜索与 Meta 线索为主服务 B2C 试点。" },
    { year: "2023", title: "扩展购物与 TikTok", description: "增加 Feed 类广告与 9:16 短视频，brief 明确。" },
    { year: "2024", title: "转化验收标准化", description: "新账户放量前完成标签/Pixel/CAPI 检查清单。" },
    { year: "2025–2026", title: "演示站与流程", description: "公开模板，让潜在客户在签约前看到节奏。" },
  ],
  platformsTitle: "深耕的平台",
  platformsLead: "每个渠道有独立服务页 — 了解我们如何描述范围与流程。",
  platforms: [
    {
      name: "Google Ads",
      text: "搜索、效果最大化、购物、展示/YouTube — 意图与转化。",
      serviceSlug: "google-ads",
    },
    {
      name: "Meta（Facebook 与 Instagram）",
      text: "信息流、Reels、Story — 创意矩阵与合规上线。",
      serviceSlug: "facebook-ads",
    },
    {
      name: "TikTok Ads",
      text: "Spark 与信息流 — 开场钩子、安全区、真实 CPA 衡量。",
      serviceSlug: "tiktok-ads",
    },
  ],
  ctaTitle: "先做一次简短沟通",
  ctaLead: "告知目标、预算边界与约束 — 我们会给出轻量的下一步建议。",
  ctaButton: "前往联系表单",
  servicesLinkLabel: "查看全部服务",
  platformCta: "查看详情",
};

export const aboutPageCopy: Record<Locale, AboutPageCopy> = {
  vi,
  en,
  zh,
};
