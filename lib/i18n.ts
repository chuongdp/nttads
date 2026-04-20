export const locales = ["vi", "en", "zh"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "vi";

export type Dictionary = {
  brand: string;
  nav: {
    home: string;
    services: string;
    portfolio: string;
    about: string;
    blog: string;
    admin: string;
    contact: string;
  };
  topBar: {
    tagline: string;
  };
  hero: {
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
    cta: string;
    secondaryCta: string;
    bullets: [string, string, string];
    statsTitle: string;
    statsFootnote: string;
  };
  problems: {
    kicker: string;
    title: string;
    items: [string, string, string, string];
  };
  home: {
    contactBlurb: string;
    responseTimeLabel: string;
    responseTimeValue: string;
    strategySessionLabel: string;
    strategySessionValue: string;
    counters: {
      clients: string;
      projects: string;
      roas: string;
    };
  };
  servicesIndex: {
    title: string;
    intro: string;
    viewDetail: string;
  };
  footer: {
    title: string;
    subtitle: string;
    labelCeo: string;
    ceo: string;
    labelPhone: string;
    phone: string;
    email: string;
    labelEmail: string;
    labelAddress: string;
    labelHours: string;
    address: string;
    hours: string;
    quickLinksTitle: string;
    legal: string;
    contactCta: string;
  };
};

export const dictionaries: Record<Locale, Dictionary> = {
  vi: {
    brand: "NTT Ads",
    nav: {
      home: "Trang chủ",
      services: "Dịch vụ",
      portfolio: "Dự án",
      about: "Giới thiệu",
      blog: "Blog",
      admin: "Quản trị",
      contact: "Liên hệ",
    },
    topBar: {
      tagline: "Giải pháp Google & Meta — tối ưu chuyển đổi",
    },
    hero: {
      eyebrow: "Quảng cáo Google & Facebook / Meta",
      titleLine1: "Tăng trưởng doanh thu",
      titleLine2: "bằng hệ thống quảng cáo đa kênh",
      subtitle:
        "Lập kế hoạch, triển khai, đo lường và tối ưu Google Ads, Meta, TikTok theo quy trình rõ ràng để tăng lead chất lượng và doanh số bền vững.",
      cta: "Đăng ký tư vấn",
      secondaryCta: "Xem case study",
      bullets: [
        "Kế hoạch media theo mục tiêu và ngân sách thực tế",
        "Theo dõi chỉ số rõ ràng theo tuần, theo tháng",
        "Tối ưu liên tục để giảm CPA và tăng ROAS",
      ],
      statsTitle: "Hiệu suất chiến dịch (minh họa)",
      statsFootnote: "Tối ưu dựa trên dữ liệu — minh bạch theo từng giai đoạn.",
    },
    problems: {
      kicker: "NTT Ads đồng hành cùng doanh nghiệp",
      title: "Những bài toán thường gặp khi chạy quảng cáo",
      items: [
        "Ngân sách chạy ads tăng nhưng số lead/chốt đơn chưa tương xứng.",
        "Chưa có cấu trúc chiến dịch và kế hoạch test nội dung bài bản.",
        "Đội ngũ in-house thiếu thời gian theo dõi policy và cập nhật nền tảng.",
        "Muốn kết hợp Google + Meta + TikTok để phủ toàn bộ phễu chuyển đổi.",
      ],
    },
    home: {
      contactBlurb:
        "Để lại thông tin, đội ngũ NTT Ads sẽ liên hệ tư vấn chiến lược phù hợp mô hình kinh doanh, mục tiêu tăng trưởng và mức ngân sách của bạn.",
      responseTimeLabel: "Thời gian phản hồi",
      responseTimeValue: "Khoảng 15 phút",
      strategySessionLabel: "Phiên tư vấn chiến lược",
      strategySessionValue: "Miễn phí",
      counters: {
        clients: "Khách hàng",
        projects: "Chiến dịch",
        roas: "ROAS trung bình",
      },
    },
    servicesIndex: {
      title: "Dịch vụ Growth & Paid Media",
      intro:
        "Nội dung minh họa cho website demo — mô tả theo thực hành phổ biến trên Google Ads Help, Meta Business Help Center, TikTok for Business và Google Search Central. Không phải cam kết số liệu cụ thể.",
      viewDetail: "Xem chi tiết",
    },
    footer: {
      title: "Liên hệ",
      subtitle: "Tư vấn Google Ads, Meta & TikTok — phản hồi trong giờ làm việc.",
      labelCeo: "CEO",
      ceo: "Nguyen Tien Thanh",
      labelPhone: "Điện thoại",
      phone: "0366040396",
      email: "nguyentienthanh13496@gmail.com",
      labelEmail: "Email",
      labelAddress: "Địa chỉ",
      labelHours: "Giờ làm việc",
      address: "Tổ 4 Yên Nghĩa, Hà Đông, Hà Nội",
      hours: "Thứ Hai – Thứ Sáu: 9:00 – 18:00 (GMT+7)",
      quickLinksTitle: "Liên kết nhanh",
      legal: "© 2026 NTT Ads. Bảo lưu mọi quyền.",
      contactCta: "Form liên hệ",
    },
  },
  en: {
    brand: "NTT Ads",
    nav: {
      home: "Home",
      services: "Services",
      portfolio: "Portfolio",
      about: "About",
      blog: "Blog",
      admin: "Admin",
      contact: "Contact",
    },
    topBar: {
      tagline: "Google & Meta ads — conversion-first",
    },
    hero: {
      eyebrow: "Google & Facebook / Meta Ads",
      titleLine1: "Scale revenue",
      titleLine2: "with a full-funnel ad system",
      subtitle:
        "Plan, execute, measure, and optimize Google Ads, Meta, and TikTok campaigns with clear operating frameworks focused on qualified leads and sustainable growth.",
      cta: "Book a consultation",
      secondaryCta: "View case studies",
      bullets: [
        "Channel strategy mapped to your goals and budget",
        "Transparent weekly and monthly performance reporting",
        "Continuous optimization to lower CPA and improve ROAS",
      ],
      statsTitle: "Campaign performance (sample)",
      statsFootnote: "Data-led optimization with stage-by-stage transparency.",
    },
    problems: {
      kicker: "Partnering with growth-focused teams",
      title: "Common paid media challenges we solve",
      items: [
        "Ad spend is rising but lead quality and revenue are not improving enough.",
        "Campaign structure and creative testing are not yet systematic.",
        "Your in-house team has limited bandwidth for policies and platform updates.",
        "You need coordinated growth across Google, Meta, and TikTok funnels.",
      ],
    },
    home: {
      contactBlurb:
        "Share your details and our team will follow up with a practical growth roadmap aligned with your goals, market, and budget.",
      responseTimeLabel: "Average response time",
      responseTimeValue: "~15 minutes",
      strategySessionLabel: "Strategy session",
      strategySessionValue: "Free",
      counters: {
        clients: "Clients",
        projects: "Campaigns",
        roas: "Avg ROAS",
      },
    },
    servicesIndex: {
      title: "Growth & paid media services",
      intro:
        "Demo website copy informed by common guidance from Google Ads Help, Meta Business Help Center, TikTok for Business, and Google Search Central — not a guarantee of specific metrics.",
      viewDetail: "View details",
    },
    footer: {
      title: "Contact",
      subtitle: "Google Ads, Meta & TikTok consulting — we reply during business hours.",
      labelCeo: "CEO",
      ceo: "Nguyen Tien Thanh",
      labelPhone: "Phone",
      phone: "0366040396",
      email: "nguyentienthanh13496@gmail.com",
      labelEmail: "Email",
      labelAddress: "Address",
      labelHours: "Hours",
      address: "To 4 Yen Nghia, Ha Dong, Ha Noi",
      hours: "Mon – Fri: 9:00 – 18:00 (GMT+7)",
      quickLinksTitle: "Quick links",
      legal: "© 2026 NTT Ads. All rights reserved.",
      contactCta: "Contact form",
    },
  },
  zh: {
    brand: "NTT Ads",
    nav: {
      home: "首页",
      services: "服务",
      portfolio: "案例",
      about: "关于",
      blog: "博客",
      admin: "后台",
      contact: "联系",
    },
    topBar: {
      tagline: "Google 与 Meta 广告 — 以转化为先",
    },
    hero: {
      eyebrow: "Google 与 Facebook / Meta 广告",
      titleLine1: "提升营收增长",
      titleLine2: "打造全漏斗广告体系",
      subtitle:
        "围绕 Google Ads、Meta、TikTok 制定可执行投放方案，持续监测与优化，帮助你获得更高质量线索与稳定增长。",
      cta: "预约咨询",
      secondaryCta: "查看案例",
      bullets: [
        "按业务目标与预算制定渠道组合",
        "按周与按月透明复盘关键指标",
        "持续优化 CPA 与 ROAS 表现",
      ],
      statsTitle: "投放表现（示例）",
      statsFootnote: "以数据驱动优化，分阶段透明对齐。",
    },
    problems: {
      kicker: "与增长型团队并肩作战",
      title: "我们常解决的投放难题",
      items: [
        "广告预算在涨，但线索质量和成交提升有限。",
        "缺少稳定的投放结构与创意测试机制。",
        "团队人手有限，难以及时跟进平台政策与变化。",
        "希望 Google、Meta、TikTok 打通并覆盖全漏斗。",
      ],
    },
    home: {
      contactBlurb: "留下信息，我们将根据你的目标、行业与预算，提供可执行的增长投放建议。",
      responseTimeLabel: "平均响应时间",
      responseTimeValue: "约 15 分钟",
      strategySessionLabel: "策略咨询",
      strategySessionValue: "免费",
      counters: {
        clients: "客户数",
        projects: "投放项目",
        roas: "平均 ROAS",
      },
    },
    servicesIndex: {
      title: "增长与付费媒体服务",
      intro:
        "本站为演示用途的文案，概念参考 Google Ads 帮助、Meta 业务帮助中心、TikTok for Business 与 Google 搜索中心常见说法——不构成具体效果承诺。",
      viewDetail: "查看详情",
    },
    footer: {
      title: "联系方式",
      subtitle: "Google Ads、Meta 与 TikTok 咨询 — 工作时间回复。",
      labelCeo: "首席执行官",
      ceo: "Nguyen Tien Thanh",
      labelPhone: "电话",
      phone: "0366040396",
      email: "nguyentienthanh13496@gmail.com",
      labelEmail: "邮箱",
      labelAddress: "地址",
      labelHours: "营业时间",
      address: "越南河内市河东郡燕义坊4组",
      hours: "周一至周五 9:00 – 18:00（GMT+7）",
      quickLinksTitle: "快速链接",
      legal: "© 2026 NTT Ads。保留所有权利。",
      contactCta: "联系表单",
    },
  },
};

export function isSupportedLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}
