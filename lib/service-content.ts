import type { Locale } from "@/lib/i18n";

/** Slug URL — khớp navbar & contact form. */
export const serviceSlugs = ["google-ads", "facebook-ads", "tiktok-ads", "seo"] as const;
export type ServiceSlug = (typeof serviceSlugs)[number];

/** Thẻ lưới (định dạng / trụ cột) — layout kiểu landing agency. */
export type ServiceShowcaseCard = { title: string; description: string };
export type ServiceProcessStep = { title: string; description: string };

export type ServicePageCopy = {
  title: string;
  /** Một dòng cho thẻ trên /services */
  summary: string;
  /** H1 hero kiểu “Giải pháp …” (breadcrumb/meta vẫn dùng `title`). */
  solutionHeadline?: string;
  lead: string;
  sections: { heading: string; paragraphs: string[] }[];
  deliverables: string[];
  formatsSectionTitle?: string;
  formats?: ServiceShowcaseCard[];
  benefitsSectionTitle?: string;
  benefits?: ServiceShowcaseCard[];
  processSectionTitle?: string;
  processSteps?: ServiceProcessStep[];
  ctaLabel?: string;
};

export function serviceHasShowcaseLayout(copy: ServicePageCopy): boolean {
  return Array.isArray(copy.formats) && copy.formats.length > 0;
}

const vi: Record<ServiceSlug, ServicePageCopy> = {
  "google-ads": {
    title: "Quảng cáo Google (Google Ads)",
    summary: "Đúng người, đúng lúc có nhu cầu — Search, PMax, Shopping, video.",
    solutionHeadline: "Giải pháp Google Ads",
    lead:
      "Ai đang tìm mua thì Google là cầu nối. NTT Ads dựng account gọn theo mục tiêu, bám conversion thật, tối ưu từng tuần — không hứa KPI cố định vì mỗi ngành một vốn liếng.",
    sections: [],
    formatsSectionTitle: "Các dạng chiến dịch thường triển khai",
    formats: [
      {
        title: "Google Search",
        description: "Xuất hiện khi người dùng đang tìm — bắt ý định cao, phù hợp lead & bán hàng.",
      },
      {
        title: "Performance Max & Shopping",
        description: "Một mục tiêu, nhiều kênh Google + catalog sản phẩm — khi feed & tài sản đã rõ.",
      },
      {
        title: "Google Display",
        description: "Mạng hiển thị & app đối tác — nuôi nhận diện, remarketing, hỗ trợ phễu.",
      },
      {
        title: "YouTube",
        description: "In-stream, Shorts — kết hợp câu chuyện thương hiệu với đo lường chuyển đổi.",
      },
      {
        title: "App campaigns",
        description: "Kích hoạt cài đặt & sự kiện in-app trên inventory Google.",
      },
    ],
    benefitsSectionTitle: "Lợi thế khi chạy đúng cách",
    benefits: [
      {
        title: "Tiếp cận đúng thời điểm",
        description: "Hiện diện khi nhu cầu vừa hình thành — tăng xác suất chốt đơn / form.",
      },
      {
        title: "Ngân sách theo kết quả",
        description: "Tối ưu theo CPA/ROAS thực tế; scale khi tín hiệu đủ, không đoán mò.",
      },
      {
        title: "Đổi thông điệp nhanh",
        description: "RSA, asset, extension — chỉnh copy & creative trong vài thao tác.",
      },
      {
        title: "Đo lường minh bạch",
        description: "Click, CTR, conversion — báo cáo gọn theo chiến dịch để ra quyết định.",
      },
    ],
    processSectionTitle: "Quy trình triển khai",
    processSteps: [
      { title: "Tiếp nhận & mục tiêu", description: "Trao đổi sản phẩm, phễu, KPI và ràng buộc ngân sách." },
      { title: "Đề xuất cấu trúc", description: "Loại chiến dịch, nhóm quảng cáo, dự kiến tracking." },
      { title: "Kế hoạch chi tiết", description: "Timeline, từ khóa/asset, checklist conversion." },
      { title: "Triển khai & go-live", description: "Dựng account, publish, kiểm tra policy & tag." },
      { title: "Đo lường & tối ưu", description: "Báo cáo định kỳ, thử nghiệm có kiểm soát, đề xuất bước tiếp." },
    ],
    ctaLabel: "Liên hệ tư vấn",
    deliverables: [
      "Cấu trúc tài khoản / chiến dịch theo goal",
      "Conversion tracking — setup & QA",
      "Từ khóa, nhóm quảng cáo, RSA + extension",
      "Báo cáo & đề xuất tối ưu theo giai đoạn",
    ],
  },
  "facebook-ads": {
    title: "Quảng cáo Facebook / Instagram (Meta Ads)",
    summary: "Feed, Reels, Story — nhiều hook, test có khung, brand vẫn an toàn.",
    solutionHeadline: "Giải pháp Facebook & Instagram",
    lead:
      "Meta = hình ảnh + cảm xúc. Chúng tôi brief rõ, matrix thử hook/angle, giữ tay trên policy; Advantage+ chỉ bật khi data đủ và bạn ok.",
    sections: [],
    formatsSectionTitle: "Định dạng creative phổ biến",
    formats: [
      {
        title: "Ảnh tĩnh",
        description: "Single image — nhanh, rõ offer; tối ưu tỷ lệ khung cho Feed.",
      },
      {
        title: "Video",
        description: "Feed & Story — mở đầu mạnh, giữ brand an toàn trước khi bật auto-enhance.",
      },
      {
        title: "Carousel",
        description: "Nhiều frame / sản phẩm trong một quảng cáo — kể chuyện tuần tự.",
      },
      {
        title: "Slideshow & Collection",
        description: "Ghép ảnh–âm thanh nhẹ hoặc catalog — phù hợp ecommerce.",
      },
      {
        title: "Instant Experience",
        description: "Landing tức thì trong app — giảm ma sát khi cần tốc độ tải.",
      },
      {
        title: "Reels & Story (9:16)",
        description: "Định dạng dọc đang ăn reach — brief hook riêng cho từng placement.",
      },
    ],
    benefitsSectionTitle: "Vì sao Meta phù hợp growth",
    benefits: [
      {
        title: "Nhắm đối tượng linh hoạt",
        description: "Tuổi, vùng, sở thích, hành vi — gói gọn theo giai đoạn phễu.",
      },
      {
        title: "Lan toả nhanh",
        description: "Một creative đúng insight có thể kéo share, save, comment organic.",
      },
      {
        title: "Đa dạng nội dung",
        description: "Matrix hook/angle — test có kỷ luật, tránh một mẫu chạy đến kiệt.",
      },
      {
        title: "Kiểm soát chi phí",
        description: "Ngân sách theo nhóm/chiến dịch; đọc CPA/ROAS để điều chỉnh hằng tuần.",
      },
    ],
    processSectionTitle: "Quy trình triển khai",
    processSteps: [
      { title: "Tiếp nhận brief", description: "Mục tiêu, offer, đối thủ, tài sản creative hiện có." },
      { title: "Đề xuất phễu", description: "Awareness / traffic / conversion — cấu trúc ad set phù hợp." },
      { title: "Kế hoạch & Pixel/CAPI", description: "Event chuẩn, checklist policy, lịch đăng." },
      { title: "Chạy & theo dõi", description: "Publish, xử lý cảnh báo, tối ưu placement & creative." },
      { title: "Báo cáo & học", description: "Insight tuần/tháng, backlog creative mới." },
    ],
    ctaLabel: "Liên hệ tư vấn",
    deliverables: [
      "Khung chiến dịch + phễu",
      "Brief + matrix hook/angle",
      "Pixel / CAPI (nếu có)",
      "Publish, policy, báo cáo & refresh creative",
    ],
  },
  "tiktok-ads": {
    title: "Quảng cáo TikTok (TikTok Ads)",
    summary: "3 giây đầu = cả thế giới. Spark native hoặc In-Feed kiểm soát CTA.",
    solutionHeadline: "Giải pháp TikTok Ads",
    lead:
      "Trend đổi nhanh — video phải “như user”, không như TVC. Spark kế thừa bài viral; In-Feed giữ message & landing trong tay bạn. Hook, safe zone, CTA: gói gọn trước khi burn budget.",
    sections: [],
    formatsSectionTitle: "Định dạng quảng cáo TikTok",
    formats: [
      {
        title: "In-Feed",
        description: "Video dọc trên For You — có thể skip; kiểm soát CTA tới web/app.",
      },
      {
        title: "Spark Ads",
        description: "Boost bài organic / KOL — giữ tương tác & vibe native.",
      },
      {
        title: "TopView & Brand Takeover",
        description: "Mở app là thấy brand — dành cho burst campaign, cần booking.",
      },
      {
        title: "Hashtag Challenge",
        description: "Kích hoạt UGC theo chủ đề — phù hợp trend & community.",
      },
      {
        title: "Branded Effect",
        description: "Filter / sticker mang logo — tăng mức độ chơi với brand.",
      },
    ],
    benefitsSectionTitle: "Điểm mạnh của nền tảng",
    benefits: [
      {
        title: "Creative “đúng vibe” FYP",
        description: "Video ngắn, âm thanh, trend — không copy TVC lên TikTok.",
      },
      {
        title: "Nhiều vertical phù hợp",
        description: "Làm đẹp, thời trang, giáo dục, game… miễn insight trúng audience.",
      },
      {
        title: "Cơ hội breakout",
        description: "Một clip đúng hook có thể kéo reach lớn với cost hợp lý.",
      },
      {
        title: "Triển khai gọn",
        description: "Rõ bước: format → shot list → pixel/SDK → publish → rotate.",
      },
    ],
    processSectionTitle: "Quy trình triển khai",
    processSteps: [
      { title: "Brief & insight", description: "Audience, trend, tone-of-voice, ràng buộc thương hiệu." },
      { title: "Chọn format", description: "Spark vs In-Feed vs premium — theo mục tiêu & budget." },
      { title: "Sản xuất & checklist", description: "9:16, safe zone, hook đầu 3s, CTA rõ." },
      { title: "Setup & chạy", description: "Ad group, pixel/app events, kiểm tra policy." },
      { title: "Tối ưu & báo cáo", description: "Theo dõi fatigue, đổi video, báo cáo insight." },
    ],
    ctaLabel: "Liên hệ tư vấn",
    deliverables: [
      "Chiến lược Spark / In-Feed (TopView tuỳ budget)",
      "Shot list + safe zone checklist",
      "Ad group, pixel / app events",
      "Rotate creative, báo cáo + trend (trong khung brand)",
    ],
  },
  seo: {
    title: "Dịch vụ SEO (tối ưu công cụ tìm kiếm)",
    summary: "Nền kỹ thuật + cụm nội dung + uy tín — traffic organic bền, không hứa #1.",
    solutionHeadline: "Giải pháp SEO",
    lead:
      "SEO là marathon, không sprint. Tech sạch, nội dung trúng ý định, link tự nhiên — roadmap theo quý, minh bạch chỉ số. Không cam kết thứ hạng vì thuật toán và đối thủ luôn đổi.",
    sections: [],
    formatsSectionTitle: "Ba trụ cột triển khai",
    formats: [
      {
        title: "SEO kỹ thuật",
        description: "Index, tốc độ, schema, mobile — nền để Google đọc site đúng.",
      },
      {
        title: "On-page & cụm chủ đề",
        description: "Intent, title, heading, internal link; cluster quanh pillar.",
      },
      {
        title: "Off-page & uy tín",
        description: "Link tự nhiên, PR, đối tác; trang About/case/policy củng cố E-E-A-T.",
      },
    ],
    benefitsSectionTitle: "Giá trị mang lại",
    benefits: [
      {
        title: "Traffic bền",
        description: "Giảm phụ thuộc hoàn toàn vào paid khi nội dung được index tốt.",
      },
      {
        title: "Đúng người đang tìm",
        description: "Bám informational / transactional — không viết cho máy.",
      },
      {
        title: "Tích luỹ theo thời gian",
        description: "Mỗi quý một lớp: tech fix, bài mới, link chất.",
      },
      {
        title: "Báo cáo thực tế",
        description: "GSC, position, traffic — không hứa #1 nhưng nhìn được tiến bộ.",
      },
    ],
    processSectionTitle: "Quy trình triển khai",
    processSteps: [
      { title: "Audit & ưu tiên", description: "Rà soát tech + nội dung, backlog theo impact." },
      { title: "Keyword & cluster", description: "Bản đồ từ khóa, outline trụ cột / vệ tinh." },
      { title: "Triển khai on-page", description: "Checklist theo template, internal link." },
      { title: "Nội dung & link", description: "Xuất bản bài, outreach an toàn." },
      { title: "Theo dõi & lặp", description: "GSC, điều chỉnh theo data hằng tháng." },
    ],
    ctaLabel: "Liên hệ tư vấn",
    deliverables: [
      "Audit tech + backlog ưu tiên",
      "Keyword map + outline cluster",
      "On-page checklist theo template",
      "GSC + traffic/visibility",
      "Link plan an toàn theo tháng",
    ],
  },
};

const en: Record<ServiceSlug, ServicePageCopy> = {
  "google-ads": {
    title: "Google Ads",
    summary: "Catch people when intent is hot — Search, PMax, Shopping, video.",
    solutionHeadline: "Google Ads solutions",
    lead:
      "High intent = high leverage. NTT Ads builds lean account structures, ties conversions to real actions, and optimizes weekly — no fixed KPI promises; every vertical is different.",
    sections: [],
    formatsSectionTitle: "Campaign types we run",
    formats: [
      {
        title: "Google Search",
        description: "Show up while people are actively searching — strong intent for leads and sales.",
      },
      {
        title: "Performance Max & Shopping",
        description: "One goal across Google surfaces plus product feeds — when assets and Merchant Center are ready.",
      },
      {
        title: "Google Display",
        description: "Display Network and partner apps — awareness, remarketing, mid-funnel support.",
      },
      {
        title: "YouTube",
        description: "In-stream, Shorts — brand story plus measurable conversion actions.",
      },
      {
        title: "App campaigns",
        description: "Installs and in-app events across Google inventory.",
      },
    ],
    benefitsSectionTitle: "Why it works when done right",
    benefits: [
      {
        title: "Right-time reach",
        description: "Appear as demand forms — better odds on forms and checkout.",
      },
      {
        title: "Budget tied to outcomes",
        description: "Optimize to real CPA/ROAS; scale when signal is there.",
      },
      {
        title: "Fast message iteration",
        description: "RSAs, assets, extensions — swap copy and creative quickly.",
      },
      {
        title: "Clear reporting",
        description: "Clicks, CTR, conversions — weekly views by campaign.",
      },
    ],
    processSectionTitle: "How we work",
    processSteps: [
      { title: "Intake & goals", description: "Product, funnel, KPIs, budget guardrails." },
      { title: "Structure proposal", description: "Campaign types, ad groups, tracking plan." },
      { title: "Detailed plan", description: "Timeline, keywords/assets, conversion checklist." },
      { title: "Launch", description: "Build, publish, policy and tag QA." },
      { title: "Measure & optimize", description: "Cadence reporting, controlled tests, next steps." },
    ],
    ctaLabel: "Get in touch",
    deliverables: [
      "Account / campaign structure by goal",
      "Conversion tracking — setup & QA",
      "Keywords, ad groups, RSA + extensions",
      "Reporting + staged optimization notes",
    ],
  },
  "facebook-ads": {
    title: "Facebook / Instagram Ads (Meta)",
    summary: "Feed, Reels, Story — fast hooks, structured tests, brand-safe defaults.",
    solutionHeadline: "Facebook & Instagram solutions",
    lead:
      "Meta wins on motion and emotion. We brief clearly, test hooks/angles on a matrix, watch policy; Advantage+ turns on when signal and approvals align.",
    sections: [],
    formatsSectionTitle: "Common creative formats",
    formats: [
      {
        title: "Single image",
        description: "Fast to ship, clear offer; aspect ratios tuned for Feed.",
      },
      {
        title: "Video",
        description: "Feed and Stories — strong open; brand-safe before auto-enhance.",
      },
      {
        title: "Carousel",
        description: "Multiple frames or products in one ad — sequential storytelling.",
      },
      {
        title: "Slideshow & Collection",
        description: "Light motion or catalog grids — ecommerce-friendly.",
      },
      {
        title: "Instant Experience",
        description: "Fast, full-screen in-app landing — less friction on mobile.",
      },
      {
        title: "Reels & Story (9:16)",
        description: "Vertical-first placements — separate hooks per placement.",
      },
    ],
    benefitsSectionTitle: "Why Meta fits growth",
    benefits: [
      {
        title: "Precise audiences",
        description: "Age, geo, interests, behaviors — mapped to funnel stages.",
      },
      {
        title: "High velocity reach",
        description: "One strong creative can unlock shares, saves, and comments.",
      },
      {
        title: "Creative variety",
        description: "Hook/angle matrix — disciplined testing, not one fatigued ad.",
      },
      {
        title: "Spend control",
        description: "Budget at ad set or campaign level; read CPA/ROAS weekly.",
      },
    ],
    processSectionTitle: "How we work",
    processSteps: [
      { title: "Brief", description: "Goals, offer, competitors, existing assets." },
      { title: "Funnel proposal", description: "Awareness / traffic / conversion — ad set architecture." },
      { title: "Plan & Pixel/CAPI", description: "Events, policy checklist, go-live calendar." },
      { title: "Run & monitor", description: "Publish, alerts, placement and creative tuning." },
      { title: "Report & learn", description: "Weekly/monthly insights, creative backlog." },
    ],
    ctaLabel: "Get in touch",
    deliverables: [
      "Campaign map + funnel stages",
      "Brief + hook/angle matrix",
      "Pixel / CAPI (where applicable)",
      "Publish, policy triage, reporting + refresh queue",
    ],
  },
  "tiktok-ads": {
    title: "TikTok Ads",
    summary: "First 3 seconds own the scroll. Spark for native; In-Feed for control.",
    solutionHeadline: "TikTok Ads solutions",
    lead:
      "Trends move fast — ads should feel like For You, not like TV. Spark boosts organic/KOL wins; In-Feed locks message + landing. Hooks, safe zones, CTA: locked before spend.",
    sections: [],
    formatsSectionTitle: "TikTok ad formats",
    formats: [
      {
        title: "In-Feed",
        description: "Vertical video on For You — skippable; full control of CTA to site or app.",
      },
      {
        title: "Spark Ads",
        description: "Boost organic or creator posts — keep engagement and native feel.",
      },
      {
        title: "TopView & Brand Takeover",
        description: "First screen on app open — burst campaigns, booked inventory.",
      },
      {
        title: "Hashtag Challenge",
        description: "UGC around a theme — trends and community plays.",
      },
      {
        title: "Branded Effect",
        description: "Branded filters or stickers — playful brand participation.",
      },
    ],
    benefitsSectionTitle: "Platform strengths",
    benefits: [
      {
        title: "Native FYP energy",
        description: "Short video, sound, trends — not a TV spot pasted into TikTok.",
      },
      {
        title: "Many verticals fit",
        description: "Beauty, fashion, education, games — if the insight matches the audience.",
      },
      {
        title: "Breakout potential",
        description: "One strong hook can unlock outsized reach at efficient costs.",
      },
      {
        title: "Clear execution path",
        description: "Format → shot list → pixel/SDK → publish → rotate.",
      },
    ],
    processSectionTitle: "How we work",
    processSteps: [
      { title: "Brief & insight", description: "Audience, trends, tone, brand guardrails." },
      { title: "Pick formats", description: "Spark vs In-Feed vs premium — goals and budget." },
      { title: "Production checklist", description: "9:16, safe zones, 3s hook, sharp CTA." },
      { title: "Setup & launch", description: "Ad groups, pixel/app events, policy checks." },
      { title: "Optimize & report", description: "Fatigue watch, swaps, insight readouts." },
    ],
    ctaLabel: "Get in touch",
    deliverables: [
      "Format plan: Spark / In-Feed (+ premium if budget allows)",
      "Shot list + safe-zone checklist",
      "Ad groups, pixel / app events QA",
      "Creative rotation + reporting (brand-safe trends)",
    ],
  },
  seo: {
    title: "SEO Services",
    summary: "Tech + topical content + trust — durable organic demand, no #1 guarantees.",
    solutionHeadline: "SEO solutions",
    lead:
      "SEO is a marathon: clean technicals, intent-led content, natural links — quarterly roadmaps, honest metrics. Rankings aren’t promised; algorithms and competitors shift.",
    sections: [],
    formatsSectionTitle: "Three pillars",
    formats: [
      {
        title: "Technical SEO",
        description: "Indexation, speed, schema, mobile — foundation for Google to read the site.",
      },
      {
        title: "On-page & topical clusters",
        description: "Intent, titles, headings, internal links; pillar plus supporting pages.",
      },
      {
        title: "Off-page & trust",
        description: "Natural links, PR, partners; About/case/policy pages reinforce E-E-A-T.",
      },
    ],
    benefitsSectionTitle: "What you gain",
    benefits: [
      {
        title: "Durable traffic",
        description: "Reduce sole reliance on paid when content indexes well.",
      },
      {
        title: "Intent-aligned",
        description: "Informational vs transactional — written for searchers, not bots.",
      },
      {
        title: "Compounds over time",
        description: "Each quarter: tech fixes, new pages, quality links.",
      },
      {
        title: "Honest reporting",
        description: "GSC, positions, traffic — progress without fake #1 promises.",
      },
    ],
    processSectionTitle: "How we work",
    processSteps: [
      { title: "Audit & priorities", description: "Technical and content review, impact-ordered backlog." },
      { title: "Keyword map & clusters", description: "Pillar/satellite outlines." },
      { title: "On-page rollout", description: "Template checklist, internal linking." },
      { title: "Content & links", description: "Publishing, safe outreach." },
      { title: "Track & iterate", description: "GSC-led monthly adjustments." },
    ],
    ctaLabel: "Get in touch",
    deliverables: [
      "Technical audit + prioritized backlog",
      "Keyword map + cluster outlines",
      "On-page checklist by template",
      "GSC + traffic/visibility tracking",
      "Monthly, policy-safe link plan",
    ],
  },
};

const zh: Record<ServiceSlug, ServicePageCopy> = {
  "google-ads": {
    title: "Google 广告（Google Ads）",
    summary: "在需求最强时出现——搜索、效果最大化、购物、视频。",
    solutionHeadline: "Google 广告方案",
    lead:
      "高意图 = 高杠杆。NTT Ads 搭建精简账户结构，把转化对齐真实行为，按周迭代——不承诺固定 KPI，行业与供给各不相同。",
    sections: [],
    formatsSectionTitle: "常见投放类型",
    formats: [
      {
        title: "Google 搜索",
        description: "用户正在搜索时出现——意向强，适合线索与成交。",
      },
      {
        title: "效果最大化与购物",
        description: "跨 Google 触点 + 商品目录——Feed 与素材就绪后扩量。",
      },
      {
        title: "Google 展示",
        description: "展示网络与合作应用——认知、再营销、中段辅助。",
      },
      {
        title: "YouTube",
        description: "贴片、Shorts——品牌叙事 + 可衡量转化。",
      },
      {
        title: "应用广告",
        description: "安装与应用内事件，覆盖 Google 流量。",
      },
    ],
    benefitsSectionTitle: "做对时的优势",
    benefits: [
      {
        title: "时机精准",
        description: "需求刚形成时出现——提高表单与下单概率。",
      },
      {
        title: "预算跟结果走",
        description: "按真实 CPA/ROAS 优化；有信号再放量。",
      },
      {
        title: "信息迭代快",
        description: "RSA、素材、扩展——快速替换文案与创意。",
      },
      {
        title: "报表清晰",
        description: "点击、CTR、转化——按战役周度复盘。",
      },
    ],
    processSectionTitle: "合作流程",
    processSteps: [
      { title: "需求与目标", description: "产品、漏斗、KPI、预算边界。" },
      { title: "结构建议", description: "战役类型、广告组、追踪方案。" },
      { title: "详细计划", description: "排期、词/素材、转化验收清单。" },
      { title: "上线", description: "搭建、发布、政策与埋点验收。" },
      { title: "衡量与优化", description: "定期复盘、受控测试、下一步建议。" },
    ],
    ctaLabel: "预约咨询",
    deliverables: [
      "按目标的账户/战役结构",
      "转化追踪——配置与验收",
      "关键词、广告组、RSA + 扩展",
      "报表与分阶段优化建议",
    ],
  },
  "facebook-ads": {
    title: "Facebook / Instagram 广告（Meta）",
    summary: "信息流、Reels、Story——多钩子、有纪律的测试，品牌安全打底。",
    solutionHeadline: "Facebook 与 Instagram 方案",
    lead:
      "Meta 靠画面与情绪取胜。我们写清 brief，用矩阵测 hook/angle，盯政策；数据与审批到位再开 Advantage+。",
    sections: [],
    formatsSectionTitle: "常见创意形式",
    formats: [
      {
        title: "单图",
        description: "上线快、卖点清晰；为信息流优化比例。",
      },
      {
        title: "视频",
        description: "信息流与故事位——强开头，再考虑自动增强。",
      },
      {
        title: "轮播",
        description: "多帧或多品——顺序讲故事。",
      },
      {
        title: "幻灯片与精品栏",
        description: "轻动效或目录网格——适合电商。",
      },
      {
        title: "即时体验",
        description: "应用内全屏落地——移动端减少跳出。",
      },
      {
        title: "Reels 与 Story（9:16）",
        description: "竖版优先——不同版位单独写钩子。",
      },
    ],
    benefitsSectionTitle: "为什么适合增长",
    benefits: [
      {
        title: "定向灵活",
        description: "年龄、地域、兴趣、行为——对齐漏斗阶段。",
      },
      {
        title: "传播速度快",
        description: "好素材可带动分享、收藏与评论。",
      },
      {
        title: "内容多样",
        description: "钩子/角度矩阵——有纪律地测试，避免单素材疲劳。",
      },
      {
        title: "花费可控",
        description: "广告组或系列预算；按周看 CPA/ROAS 调整。",
      },
    ],
    processSectionTitle: "合作流程",
    processSteps: [
      { title: "Brief", description: "目标、卖点、竞品、现有素材。" },
      { title: "漏斗方案", description: "认知/流量/转化——广告组结构。" },
      { title: "计划与 Pixel/CAPI", description: "事件、政策清单、上线日历。" },
      { title: "投放与监控", description: "发布、告警、版位与素材优化。" },
      { title: "复盘", description: "周/月洞察，素材待办。" },
    ],
    ctaLabel: "预约咨询",
    deliverables: [
      "战役地图 + 漏斗阶段",
      "Brief + hook/angle 矩阵",
      "Pixel / CAPI（如适用）",
      "发布、政策处理、报表与素材队列",
    ],
  },
  "tiktok-ads": {
    title: "TikTok 广告",
    summary: "前 3 秒定生死。Spark 原生感；信息流掌控 CTA。",
    solutionHeadline: "TikTok 广告方案",
    lead:
      "趋势快——广告要像 For You，不像电视。Spark 放大爆款/达人帖；信息流锁文案与落地。钩子、安全区、CTA：花钱前先钉死。",
    sections: [],
    formatsSectionTitle: "广告形式",
    formats: [
      {
        title: "信息流",
        description: "For You 竖版视频——可跳过；CTA 到网站或 App。",
      },
      {
        title: "Spark Ads",
        description: "加热原生或达人帖——保留互动与原生感。",
      },
      {
        title: "TopView 与开屏",
        description: "打开应用首屏——爆发期投放，需预定。",
      },
      {
        title: "话题挑战",
        description: "围绕标签激发 UGC——趋势与社群玩法。",
      },
      {
        title: "品牌特效",
        description: "贴纸或滤镜——让用户玩起来。",
      },
    ],
    benefitsSectionTitle: "平台优势",
    benefits: [
      {
        title: "FYP 原生感",
        description: "短视频、音乐、热点——不是硬广电视片。",
      },
      {
        title: "多行业可试",
        description: "美妆、服饰、教育、游戏——洞察对就有空间。",
      },
      {
        title: "爆款机会",
        description: "钩子对了，可能以合理成本拿到大曝光。",
      },
      {
        title: "流程清晰",
        description: "形式→分镜→像素/SDK→发布→轮换。",
      },
    ],
    processSectionTitle: "合作流程",
    processSteps: [
      { title: "Brief 与洞察", description: "人群、趋势、语气、品牌红线。" },
      { title: "选形式", description: "Spark / 信息流 / 品牌版位——看目标与预算。" },
      { title: "制作清单", description: "9:16、安全区、前 3 秒、CTA。" },
      { title: "配置上线", description: "广告组、像素/应用事件、政策检查。" },
      { title: "优化与报告", description: "疲劳监控、换素材、输出洞察。" },
    ],
    ctaLabel: "预约咨询",
    deliverables: [
      "形式策略：Spark / 信息流（预算允许可加品牌版位）",
      "分镜 + 安全区清单",
      "广告组、像素/应用事件验收",
      "素材轮换 + 报表（合规趋势）",
    ],
  },
  seo: {
    title: "SEO 服务（搜索引擎优化）",
    summary: "技术 + 主题内容 + 信任——可持续自然流量，不承诺排名第一。",
    solutionHeadline: "SEO 方案",
    lead:
      "SEO 是马拉松：技术干净、意图对齐的内容、自然外链——按季度路线图，指标诚实。算法与竞争会变，不保证具体名次。",
    sections: [],
    formatsSectionTitle: "三大支柱",
    formats: [
      {
        title: "技术 SEO",
        description: "索引、速度、结构化数据、移动体验——让 Google 正确理解站点。",
      },
      {
        title: "页面与主题集群",
        description: "意图、标题、层级、内链；支柱页 + 卫星页。",
      },
      {
        title: "站外与信任",
        description: "自然外链、公关与合作；关于/案例/政策强化 E-E-A-T。",
      },
    ],
    benefitsSectionTitle: "带来的价值",
    benefits: [
      {
        title: "更稳的自然流量",
        description: "内容收录好，可减轻对单一付费的依赖。",
      },
      {
        title: "对齐搜索意图",
        description: "信息型/交易型——写给搜索者。",
      },
      {
        title: "长期复利",
        description: "每季度：修技术、上新文、补优质外链。",
      },
      {
        title: "真实数据",
        description: "GSC、排名、流量——不造假第一，但看得见进步。",
      },
    ],
    processSectionTitle: "合作流程",
    processSteps: [
      { title: "审计与排序", description: "技术与内容盘点，按影响排期。" },
      { title: "词图与集群", description: "支柱/卫星提纲。" },
      { title: "On-page 落地", description: "模板清单、内链。" },
      { title: "内容与外链", description: "发布、安全外展。" },
      { title: "跟踪迭代", description: "以 GSC 为主月度调整。" },
    ],
    ctaLabel: "预约咨询",
    deliverables: [
      "技术审计 + 优先级待办",
      "关键词地图 + 集群提纲",
      "按模板的 on-page 清单",
      "GSC + 流量/可见度",
      "月度安全外链计划",
    ],
  },
};

export const servicePageCopy: Record<Locale, Record<ServiceSlug, ServicePageCopy>> = {
  vi,
  en,
  zh,
};

export function getServicePageCopy(locale: Locale, slug: string): ServicePageCopy | null {
  if (!serviceSlugs.includes(slug as ServiceSlug)) return null;
  return servicePageCopy[locale][slug as ServiceSlug];
}
