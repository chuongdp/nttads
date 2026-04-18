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
      titleLine1: "Gia tăng doanh số",
      titleLine2: "và phát triển thương hiệu",
      subtitle:
        "Triển khai bài bản, báo cáo minh bạch, đồng hành tối ưu ngân sách — phong cách hiệu quả như đối tác agency hàng đầu.",
      cta: "Đăng ký tư vấn",
      secondaryCta: "Xem case study",
      bullets: [
        "Triển khai chuyên nghiệp, có quy trình rõ ràng",
        "Báo cáo minh bạch — số liệu theo tuần / tháng",
        "Đồng hành tối ưu chiến dịch theo mục tiêu kinh doanh",
      ],
      statsTitle: "Hiệu suất chiến dịch (minh họa)",
      statsFootnote: "Tối ưu dựa trên dữ liệu — minh bạch theo từng giai đoạn.",
    },
    problems: {
      kicker: "Giải pháp nào cho bạn?",
      title: "Bạn đang gặp phải vấn đề",
      items: [
        "Chưa biết bắt đầu chạy quảng cáo từ đâu, cần lộ trình rõ ràng.",
        "Đang tự chạy nhưng chưa hiệu quả — muốn tăng tiếp cận, tăng chuyển đổi, giảm CPA.",
        "Có team inhouse nhưng cần cập nhật nhanh format ads & best practice mới.",
        "Muốn đa kênh (Google + Meta + TikTok) để tăng nhận diện và chuyển đổi.",
      ],
    },
    home: {
      contactBlurb:
        "Để lại thông tin — team sẽ liên hệ gợi ý lộ trình tăng trưởng phù hợp ngân sách và mục tiêu.",
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
      titleLine1: "Grow revenue",
      titleLine2: "and strengthen your brand",
      subtitle:
        "Structured delivery, transparent reporting, and continuous budget optimization — premium agency execution.",
      cta: "Book a consultation",
      secondaryCta: "View case studies",
      bullets: [
        "Professional playbooks with clear milestones",
        "Transparent reporting — weekly / monthly metrics",
        "Hands-on optimization aligned to business goals",
      ],
      statsTitle: "Campaign performance (sample)",
      statsFootnote: "Data-led optimization with stage-by-stage transparency.",
    },
    problems: {
      kicker: "Which solution fits you?",
      title: "Common challenges we solve",
      items: [
        "You need a clear roadmap to start paid ads confidently.",
        "In-house efforts are not scaling — improve reach, CVR, and CPA.",
        "Your team needs faster adoption of new ad formats and policies.",
        "You want multi-channel growth across Google, Meta, and TikTok.",
      ],
    },
    home: {
      contactBlurb:
        "Share your details — we will follow up with a growth roadmap aligned to your goals and budget.",
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
      titleLine1: "提升销量",
      titleLine2: "并强化品牌认知",
      subtitle:
        "流程清晰、报表透明、持续优化预算 — 对标一线代理商的落地方式。",
      cta: "预约咨询",
      secondaryCta: "查看案例",
      bullets: [
        "专业交付与里程碑管理",
        "透明报表 — 按周/按月复盘",
        "围绕业务目标持续优化投放",
      ],
      statsTitle: "投放表现（示例）",
      statsFootnote: "以数据驱动优化，分阶段透明对齐。",
    },
    problems: {
      kicker: "你更适合哪种方案？",
      title: "我们帮你解决的典型问题",
      items: [
        "不知道如何起步投放，需要清晰路线图。",
        "自投效果不佳，希望提升触达、转化并降低 CPA。",
        "有 inhouse 团队，但需要快速跟上新格式与政策。",
        "希望多渠道（Google + Meta + TikTok）协同增长。",
      ],
    },
    home: {
      contactBlurb: "留下信息——我们将结合预算与目标，提供可执行的增长路径建议。",
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
