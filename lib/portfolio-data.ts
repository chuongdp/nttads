import type { Locale } from "@/lib/i18n";

export type PortfolioProject = {
  title: string;
  client: string;
  industry: string;
  channels: string[];
  summary: string;
  highlight: string;
};

export type PortfolioPageBundle = {
  title: string;
  intro: string;
  disclaimer: string;
  labels: { industry: string; channels: string; highlight: string };
  projects: PortfolioProject[];
};

const vi: PortfolioPageBundle = {
  title: "Dự án & case minh họa",
  intro:
    "Một số kịch bản triển khai điển hình (Google, Meta, TikTok, SEO) — giúp bạn hình dung phạm vi công việc và cách team tư duy theo dữ liệu.",
  disclaimer:
    "Toàn bộ tên thương hiệu, con số và mô tả bên dưới là hư cấu cho mục đích demo website; không gắn với khách hàng hay chiến dịch thật.",
  labels: {
    industry: "Ngành",
    channels: "Kênh",
    highlight: "Kết quả minh họa",
  },
  projects: [
    {
      title: "Tối ưu lead cho chuỗi nha khoa khu vực",
      client: "Nha khoa Sông Hương (giả định)",
      industry: "Y tế / phòng khám",
      channels: ["Google Search", "Performance Max", "Local campaigns"],
      summary:
        "Tái cấu trúc tài khoản theo vùng tỉnh/thành, chuẩn hoá conversion đặt lịch khám và gọi điện; tách chiến dịch brand vs generic treatment.",
      highlight: "CPA form giảm ~28% sau 8 tuần (minh họa).",
    },
    {
      title: "D2C mỹ phẩm — scale Meta + catalog",
      client: "GlowLab Skincare (giả định)",
      industry: "Làm đẹp / D2C",
      channels: ["Facebook", "Instagram", "Advantage+ shopping"],
      summary:
        "Creative matrix theo pain point; Advantage+ catalog khi đủ volume; đồng bộ pixel + server events cho checkout.",
      highlight: "ROAS ổn định quanh ngưỡng mục tiêu trong giai đoạn sale (minh họa).",
    },
    {
      title: "Launch game casual — TikTok + retarget Meta",
      client: "PixelJoy Studio (giả định)",
      industry: "Game / app",
      channels: ["TikTok In-Feed", "Spark Ads", "Meta retargeting"],
      summary:
        "Hook 3 giây theo mechanic gameplay; Spark với KOL tier micro; retarget lượt cài incomplete trên Meta.",
      highlight: "CPI trial dưới mức benchmark nội bộ đặt trước (minh họa).",
    },
    {
      title: "SEO cụm chủ đề cho nhà cung cấp B2B",
      client: "Thép Đông Á Components (giả định)",
      industry: "Công nghiệp / B2B",
      channels: ["Technical SEO", "Topic clusters", "GSC"],
      summary:
        "Audit index + Core Web Vitals; xây pillar “vật liệu & tiêu chuẩn” + bài vệ tinh long-tail; internal link theo BOM.",
      highlight: "Organic sessions +~45% YoY trên nhóm URL mục tiêu (minh họa).",
    },
    {
      title: "Google Shopping — thời trang fast fashion",
      client: "Lablee Outfit (giả định)",
      industry: "Thương mại điện tử",
      channels: ["Shopping", "PMax", "Search brand"],
      summary:
        "Feed hygiene Merchant Center, custom labels theo margin; tách collection mới vs outlet; RSA bảo vệ brand term.",
      highlight: "Doanh thu attributed tăng ~22% cùng ngân sách (minh họa).",
    },
    {
      title: "Lead BĐS cao cấp — Meta + landing tốc độ",
      client: "Khu đô thị The Horizon (giả định)",
      industry: "Bất động sản",
      channels: ["Facebook Lead Ads", "Instant Experience", "Reels"],
      summary:
        "Form ngắn + qualify câu hỏi; creative theo insight “đầu tư vs an cư”; tối ưu tốc độ trang đích mobile.",
      highlight: "Cost per qualified lead giảm ~35% (minh họa).",
    },
    {
      title: "Full-funnel F&B — Search + YouTube + Meta",
      client: "Trà sữa Bobo Chain (giả định)",
      industry: "F&B chuỗi",
      channels: ["Search near me", "YouTube", "Meta reach", "Waze-style display minh họa"],
      summary:
        "Chiến dịch khai trương cửa hàng mới: awareness geo-fence, traffic voucher, conversion đặt hàng app đối tác.",
      highlight: "3 đợt opening đạt KPI impression & CTR nội bộ (minh họa).",
    },
    {
      title: "TikTok trend — drop giày limited",
      client: "Stride Collective (giả định)",
      industry: "Streetwear / sneaker",
      channels: ["TikTok TopView minh họa", "In-Feed", "Spark creator"],
      summary:
        "Countdown + UGC challenge có kiểm duyệt; whitelist sound; đo purchase qua pixel shopify-style (giả định).",
      highlight: "Sell-through online > 70% stock 48h đầu (minh họa).",
    },
  ],
};

const en: PortfolioPageBundle = {
  title: "Sample projects & cases",
  intro:
    "Illustrative scenarios across Google, Meta, TikTok, and SEO — showing how we structure work and think in metrics.",
  disclaimer:
    "All brand names, figures, and narratives below are fictional for this demo site — not tied to any real client or campaign.",
  labels: {
    industry: "Industry",
    channels: "Channels",
    highlight: "Illustrative outcome",
  },
  projects: [
    {
      title: "Lead efficiency for a regional dental group",
      client: "Song Huong Dental (fictional)",
      industry: "Healthcare / clinics",
      channels: ["Google Search", "Performance Max", "Local campaigns"],
      summary:
        "Account rebuild by metro, standardized booking + call conversions; split brand vs generic treatment intents.",
      highlight: "Form CPA ~28% lower after 8 weeks (illustrative).",
    },
    {
      title: "D2C skincare — scaling Meta with catalog",
      client: "GlowLab Skincare (fictional)",
      industry: "Beauty / D2C",
      channels: ["Facebook", "Instagram", "Advantage+ shopping"],
      summary:
        "Creative matrix by pain point; Advantage+ catalog once volume allowed; pixel + CAPI for checkout quality.",
      highlight: "ROAS held near target during promo windows (illustrative).",
    },
    {
      title: "Casual game launch — TikTok plus Meta retargeting",
      client: "PixelJoy Studio (fictional)",
      industry: "Gaming / apps",
      channels: ["TikTok In-Feed", "Spark Ads", "Meta retargeting"],
      summary:
        "3s hooks around core mechanic; Spark with micro-KOLs; retarget incomplete installs on Meta.",
      highlight: "Trial CPI below the internal benchmark (illustrative).",
    },
    {
      title: "SEO topic cluster for a B2B supplier",
      client: "Dong A Steel Components (fictional)",
      industry: "Industrial / B2B",
      channels: ["Technical SEO", "Topic clusters", "GSC"],
      summary:
        "Index + CWV fixes; pillar on materials & standards plus long-tail satellites; internal links aligned to BOM journeys.",
      highlight: "~45% YoY organic sessions on priority URL groups (illustrative).",
    },
    {
      title: "Google Shopping — fast fashion DTC",
      client: "Lablee Outfit (fictional)",
      industry: "Ecommerce",
      channels: ["Shopping", "PMax", "Brand Search"],
      summary:
        "Merchant Center feed hygiene, margin-based custom labels; split new collection vs outlet; RSA on brand terms.",
      highlight: "~22% higher attributed revenue at similar spend (illustrative).",
    },
    {
      title: "Premium real estate leads — Meta + fast landings",
      client: "The Horizon township (fictional)",
      industry: "Real estate",
      channels: ["Facebook Lead Ads", "Instant Experience", "Reels"],
      summary:
        "Short forms + qualifying questions; creative angles for invest vs live-in; mobile landing speed focus.",
      highlight: "~35% lower cost per qualified lead (illustrative).",
    },
    {
      title: "Full-funnel F&B — Search, YouTube, Meta",
      client: "Bobo Milk Tea chain (fictional)",
      industry: "Restaurant chain",
      channels: ["Search near me", "YouTube", "Meta reach", "Display awareness"],
      summary:
        "New store openings: geo awareness, voucher traffic, in-app order conversions via partner apps (fictional).",
      highlight: "Three opening waves hit internal impression & CTR targets (illustrative).",
    },
    {
      title: "TikTok hype — limited sneaker drop",
      client: "Stride Collective (fictional)",
      industry: "Streetwear / sneakers",
      channels: ["TikTok premium placement (illustrative)", "In-Feed", "Spark creators"],
      summary:
        "Countdown + moderated UGC challenge; approved sounds only; purchase tracking via storefront pixel (fictional).",
      highlight: ">70% online stock sold in first 48h (illustrative).",
    },
  ],
};

const zh: PortfolioPageBundle = {
  title: "示例项目与案例",
  intro:
    "覆盖 Google、Meta、TikTok 与 SEO 的典型场景——展示我们如何拆解交付与用数据思考。",
  disclaimer:
    "以下品牌名、数字与故事均为本站演示虚构，不代表任何真实客户或投放。",
  labels: {
    industry: "行业",
    channels: "渠道",
    highlight: "示例结果",
  },
  projects: [
    {
      title: "区域牙科连锁 — 线索成本优化",
      client: "香江口腔（虚构）",
      industry: "医疗 / 诊所",
      channels: ["Google 搜索", "效果最大化", "本地广告"],
      summary:
        "按城市重构账户，统一预约表单与电话转化；品牌词与高意向治疗词分战役。",
      highlight: "8 周后表单 CPA 约降 28%（示例）。",
    },
    {
      title: "D2C 护肤 — Meta 目录放量",
      client: "GlowLab 护肤（虚构）",
      industry: "美妆 / D2C",
      channels: ["Facebook", "Instagram", "Advantage+ 购物"],
      summary:
        "按痛点搭建创意矩阵；数据量足够后启用 Advantage+ 目录；像素 + 转化 API 提升结账信号。",
      highlight: "大促期 ROAS 贴近目标区间（示例）。",
    },
    {
      title: "休闲手游上线 — TikTok + Meta 再营销",
      client: "PixelJoy 工作室（虚构）",
      industry: "游戏 / 应用",
      channels: ["TikTok 信息流", "Spark", "Meta 再营销"],
      summary:
        "前 3 秒展示核心玩法；与微型达人做 Spark；对未完成安装做 Meta 追投。",
      highlight: "试玩 CPI 低于内部基准（示例）。",
    },
    {
      title: "B2B 供应商 — 主题集群 SEO",
      client: "东亚钢材配件（虚构）",
      industry: "工业 / B2B",
      channels: ["技术 SEO", "主题集群", "GSC"],
      summary:
        "索引与 CWV 修复；支柱页“材料与标准”+ 长尾卫星文；按物料清单旅程做内链。",
      highlight: "目标 URL 组自然流量同比约 +45%（示例）。",
    },
    {
      title: "Google 购物 — 快时尚独立站",
      client: "Lablee 服饰（虚构）",
      industry: "电商",
      channels: ["购物广告", "效果最大化", "品牌搜索"],
      summary:
        "Merchant Center Feed 治理，按毛利自定义标签；新品与奥莱线拆分；品牌词 RSA 防守。",
      highlight: "相近预算下归因收入约 +22%（示例）。",
    },
    {
      title: "高端地产线索 — Meta + 极速落地页",
      client: "Horizon 新城（虚构）",
      industry: "房地产",
      channels: ["潜客表单", "即时体验", "Reels"],
      summary:
        "短表单 + 资格问题；投资/自住双创意角度；移动落地页速度优化。",
      highlight: "合格线索成本约降 35%（示例）。",
    },
    {
      title: "茶饮连锁全漏斗 — 搜索 + YouTube + Meta",
      client: "Bobo 奶茶连锁（虚构）",
      industry: "餐饮连锁",
      channels: ["附近搜索", "YouTube", "Meta 覆盖", "展示认知"],
      summary:
        "新店开业三波：地理围栏认知、优惠券引流、合作外卖 App 下单转化（虚构）。",
      highlight: "三轮开业达成内部曝光与 CTR 目标（示例）。",
    },
    {
      title: "TikTok 造势 — 限量球鞋发售",
      client: "Stride Collective（虚构）",
      industry: "潮流 / 球鞋",
      channels: ["TikTok 品牌首屏（示例）", "信息流", "Spark 达人"],
      summary:
        "倒计时 + 可控 UGC 挑战；白名单音乐；店铺像素追踪购买（虚构）。",
      highlight: "首发 48 小时线上售罄约 70% 库存（示例）。",
    },
  ],
};

export const portfolioPageBundles: Record<Locale, PortfolioPageBundle> = {
  vi,
  en,
  zh,
};
