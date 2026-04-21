import type { Locale } from "@/lib/i18n";

export type CmsDictionary = {
  layout: { backToSite: string; cmsBadge: string; localeVi: string; localeEn: string; localeZh: string };
  dashboard: { title: string; subtitle: string };
  auth: {
    checkingSession: string;
    adminLogin: string;
    signInHint: string;
    emailPlaceholder: string;
    passwordPlaceholder: string;
    signingIn: string;
    signIn: string;
    forgotPassword: string;
    loginFailedPrefix: string;
    loginSuccess: string;
    loggedInAs: string;
    signOut: string;
    logoutFailedPrefix: string;
  };
  roi: {
    title: string;
    subtitle: string;
    allLocales: string;
    last7d: string;
    last30d: string;
    refresh: string;
    records: string;
    avgBudget: string;
    avgLeads: string;
    loadingRecords: string;
    noRecords: string;
    loadFailedPrefix: string;
    thCreatedAt: string;
    thLocale: string;
    thBudget: string;
    thCpc: string;
    thCr: string;
    thClicks: string;
    thLeads: string;
    thCpl: string;
  };
  forgot: {
    title: string;
    introBefore: string;
    introStrong: string;
    introAfter: string;
    loadingUrl: string;
    emailLabel: string;
    sending: string;
    sendReset: string;
    sentHint: string;
    backToLogin: string;
  };
  reset: {
    validating: string;
    invalidTitle: string;
    invalidHint: string;
    requestNew: string;
    adminLogin: string;
    setTitle: string;
    setHint: string;
    newPassword: string;
    confirmPassword: string;
    saving: string;
    updatePassword: string;
    minPassword: string;
    passwordMismatch: string;
  };
  settings: {
    title: string;
    intro: string;
    loading: string;
    loadFailedPrefix: string;
    globalTitle: string;
    brandName: string;
    brandLogoUrl: string;
    brandFaviconUrl: string;
    email: string;
    phone: string;
    addressVi: string;
    addressEn: string;
    addressZh: string;
    facebookUrl: string;
    tiktokUrl: string;
    linkedinUrl: string;
    delete: string;
    addImage: string;
    landingTitle: string;
    landingHint: string;
    landingHero: string;
    landingProblems: string;
    landingContact: string;
    landingImages: string;
    serviceTitle: string;
    serviceHint: string;
    serviceGoogleAds: string;
    serviceFacebookAds: string;
    serviceTiktokAds: string;
    serviceSeo: string;
    nodeBase: string;
    nodeSectionTitles: string;
    nodeFormats: string;
    nodeBenefits: string;
    nodeProcess: string;
    nodeDeliverables: string;
    nodeImages: string;
    labelTitle: string;
    labelSummary: string;
    labelSolutionHeadline: string;
    labelLead: string;
    labelCta: string;
    labelFormatsSectionTitle: string;
    labelGallerySectionTitle: string;
    labelBenefitsSectionTitle: string;
    labelProcessSectionTitle: string;
    labelDescription: string;
    removeItem: string;
    addFormat: string;
    addBenefit: string;
    removeStep: string;
    addStep: string;
    remove: string;
    addDeliverable: string;
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    heroSubtitle: string;
    bulletN: (n: number) => string;
    kicker: string;
    itemN: (n: number) => string;
    contactBlurb: string;
    responseTimeLabel: string;
    responseTimeValue: string;
    strategySessionLabel: string;
    strategySessionValue: string;
    counterN: (n: number) => string;
    save: string;
    saving: string;
    saved: string;
    saveFailedPrefix: string;
  };
};

const vi: CmsDictionary = {
  layout: {
    backToSite: "← Về website",
    cmsBadge: "CMS",
    localeVi: "Tiếng Việt",
    localeEn: "English",
    localeZh: "中文",
  },
  dashboard: {
    title: "CMS — Giao diện & nội dung",
    subtitle: "Liên hệ, mạng xã hội, URL ảnh (landing + dịch vụ) và thống kê ROI.",
  },
  auth: {
    checkingSession: "Đang kiểm tra phiên đăng nhập…",
    adminLogin: "Đăng nhập quản trị",
    signInHint: "Đăng nhập bằng tài khoản Supabase để chỉnh cấu hình CMS.",
    emailPlaceholder: "admin@company.com",
    passwordPlaceholder: "Mật khẩu",
    signingIn: "Đang đăng nhập…",
    signIn: "Đăng nhập",
    forgotPassword: "Quên mật khẩu?",
    loginFailedPrefix: "Đăng nhập thất bại:",
    loginSuccess: "Đăng nhập thành công.",
    loggedInAs: "Đã đăng nhập:",
    signOut: "Đăng xuất",
    logoutFailedPrefix: "Đăng xuất thất bại:",
  },
  roi: {
    title: "ROI Analytics (10 bản ghi mới nhất)",
    subtitle: "Tóm tắt nhanh từ công cụ ROI công khai trên website.",
    allLocales: "Mọi ngôn ngữ",
    last7d: "7 ngày qua",
    last30d: "30 ngày qua",
    refresh: "Làm mới",
    records: "Bản ghi",
    avgBudget: "Ngân sách trung bình",
    avgLeads: "Lead trung bình",
    loadingRecords: "Đang tải dữ liệu ROI…",
    noRecords: "Chưa có bản ghi ROI.",
    loadFailedPrefix: "Tải thất bại:",
    thCreatedAt: "Thời điểm",
    thLocale: "Locale",
    thBudget: "Ngân sách",
    thCpc: "CPC",
    thCr: "CR (%)",
    thClicks: "Click",
    thLeads: "Lead",
    thCpl: "CPL",
  },
  forgot: {
    title: "Quên mật khẩu",
    introBefore: "Nhập email quản trị. Trong Supabase",
    introStrong: "Authentication → URL Configuration → Redirect URLs",
    introAfter: "thêm đúng URL sau (cùng scheme + host với CMS này):",
    loadingUrl: "Đang tải URL…",
    emailLabel: "Email",
    sending: "Đang gửi…",
    sendReset: "Gửi liên kết đặt lại",
    sentHint:
      "Nếu tồn tại tài khoản với email này, bạn sẽ nhận liên kết đặt lại mật khẩu trong ít phút. Kiểm tra cả thư mục spam.",
    backToLogin: "← Quay lại đăng nhập",
  },
  reset: {
    validating: "Đang xác thực liên kết khôi phục…",
    invalidTitle: "Liên kết không hợp lệ hoặc đã hết hạn",
    invalidHint: "Mở liên kết mới nhất trong email, hoặc yêu cầu liên kết mới từ trang quên mật khẩu.",
    requestNew: "Yêu cầu liên kết mới",
    adminLogin: "Đăng nhập quản trị",
    setTitle: "Đặt mật khẩu mới",
    setHint: "Chọn mật khẩu mạnh cho tài khoản quản trị.",
    newPassword: "Mật khẩu mới",
    confirmPassword: "Xác nhận mật khẩu",
    saving: "Đang lưu…",
    updatePassword: "Cập nhật mật khẩu",
    minPassword: "Mật khẩu phải có ít nhất 8 ký tự.",
    passwordMismatch: "Hai lần nhập mật khẩu không khớp.",
  },
  settings: {
    title: "Cài đặt website",
    intro: "Cấu hình chung + nội dung từng trang dịch vụ theo từng node.",
    loading: "Đang tải cài đặt…",
    loadFailedPrefix: "Tải thất bại:",
    globalTitle: "Cài đặt chung",
    brandName: "Tên thương hiệu",
    brandLogoUrl: "URL logo",
    brandFaviconUrl: "URL favicon",
    email: "Email",
    phone: "Điện thoại",
    addressVi: "Địa chỉ (VI)",
    addressEn: "Địa chỉ (EN)",
    addressZh: "Địa chỉ (ZH)",
    facebookUrl: "URL Facebook",
    tiktokUrl: "URL TikTok",
    linkedinUrl: "URL LinkedIn",
    delete: "Xóa",
    addImage: "Thêm ảnh",
    landingTitle: "Quản lý landing page",
    landingHint: "Chỉnh nội dung trang chủ theo từng ngôn ngữ (không đổi color scheme).",
    landingHero: "Hero",
    landingProblems: "Pain points",
    landingContact: "Liên hệ + thống kê",
    landingImages: "Ảnh",
    serviceTitle: "Quản lý nội dung dịch vụ",
    serviceHint: "Chọn dịch vụ và node để sửa text/ảnh. Mỗi locale độc lập.",
    serviceGoogleAds: "Google Ads",
    serviceFacebookAds: "Facebook Ads",
    serviceTiktokAds: "TikTok Ads",
    serviceSeo: "SEO",
    nodeBase: "Thông tin chính",
    nodeSectionTitles: "Tiêu đề section",
    nodeFormats: "Định dạng",
    nodeBenefits: "Lợi thế",
    nodeProcess: "Quy trình",
    nodeDeliverables: "Phạm vi giao hàng",
    nodeImages: "Ảnh hiển thị",
    labelTitle: "Tiêu đề",
    labelSummary: "Tóm tắt",
    labelSolutionHeadline: "Dòng headline giải pháp",
    labelLead: "Đoạn dẫn",
    labelCta: "Nhãn CTA",
    labelFormatsSectionTitle: "Tiêu đề section định dạng",
    labelGallerySectionTitle: "Tiêu đề gallery",
    labelBenefitsSectionTitle: "Tiêu đề section lợi thế",
    labelProcessSectionTitle: "Tiêu đề section quy trình",
    labelDescription: "Mô tả",
    removeItem: "Xóa mục",
    addFormat: "Thêm định dạng",
    addBenefit: "Thêm lợi thế",
    removeStep: "Xóa bước",
    addStep: "Thêm bước",
    remove: "Xóa",
    addDeliverable: "Thêm dòng deliverable",
    eyebrow: "Dòng phụ (eyebrow)",
    titleLine1: "Tiêu đề dòng 1",
    titleLine2: "Tiêu đề dòng 2",
    heroSubtitle: "Phụ đề",
    bulletN: (n) => `Gạch đầu dòng ${n}`,
    kicker: "Dòng kicker",
    itemN: (n) => `Mục ${n}`,
    contactBlurb: "Đoạn mô tả liên hệ",
    responseTimeLabel: "Nhãn thời gian phản hồi",
    responseTimeValue: "Giá trị thời gian phản hồi",
    strategySessionLabel: "Nhãn phiên tư vấn",
    strategySessionValue: "Giá trị phiên tư vấn",
    counterN: (n) => `Nhãn counter ${n}`,
    save: "Lưu cài đặt",
    saving: "Đang lưu…",
    saved: "Đã lưu thành công.",
    saveFailedPrefix: "Lưu thất bại:",
  },
};

const en: CmsDictionary = {
  layout: {
    backToSite: "← Back to website",
    cmsBadge: "CMS",
    localeVi: "Vietnamese",
    localeEn: "English",
    localeZh: "Chinese",
  },
  dashboard: {
    title: "CMS — UI & content",
    subtitle: "Contact, social links, image URLs (landing + services), and ROI analytics.",
  },
  auth: {
    checkingSession: "Checking admin session…",
    adminLogin: "Admin login",
    signInHint: "Sign in with your Supabase account to access CMS settings.",
    emailPlaceholder: "admin@company.com",
    passwordPlaceholder: "Password",
    signingIn: "Signing in…",
    signIn: "Sign in",
    forgotPassword: "Forgot password?",
    loginFailedPrefix: "Login failed:",
    loginSuccess: "Login successful.",
    loggedInAs: "Logged in as",
    signOut: "Sign out",
    logoutFailedPrefix: "Logout failed:",
  },
  roi: {
    title: "ROI analytics (latest 10)",
    subtitle: "Quick snapshot from public ROI calculator submissions.",
    allLocales: "All locales",
    last7d: "Last 7 days",
    last30d: "Last 30 days",
    refresh: "Refresh",
    records: "Records",
    avgBudget: "Average budget",
    avgLeads: "Average leads",
    loadingRecords: "Loading latest ROI records…",
    noRecords: "No ROI records yet.",
    loadFailedPrefix: "Load failed:",
    thCreatedAt: "Created at",
    thLocale: "Locale",
    thBudget: "Budget",
    thCpc: "CPC",
    thCr: "CR (%)",
    thClicks: "Clicks",
    thLeads: "Leads",
    thCpl: "CPL",
  },
  forgot: {
    title: "Forgot password",
    introBefore: "Enter your admin email. In Supabase",
    introStrong: "Authentication → URL Configuration → Redirect URLs",
    introAfter: "add exactly this URL (same scheme + host as this CMS):",
    loadingUrl: "Loading URL…",
    emailLabel: "Email",
    sending: "Sending…",
    sendReset: "Send reset link",
    sentHint:
      "If an account exists for this email, you will receive a reset link shortly. Check your spam folder.",
    backToLogin: "← Back to admin login",
  },
  reset: {
    validating: "Validating recovery link…",
    invalidTitle: "Invalid or expired link",
    invalidHint: "Open the latest link from your email, or request a new reset from the forgot password page.",
    requestNew: "Request new link",
    adminLogin: "Admin login",
    setTitle: "Set new password",
    setHint: "Choose a strong password for your admin account.",
    newPassword: "New password",
    confirmPassword: "Confirm password",
    saving: "Saving…",
    updatePassword: "Update password",
    minPassword: "Password must be at least 8 characters.",
    passwordMismatch: "Passwords do not match.",
  },
  settings: {
    title: "Site settings",
    intro: "Global settings + per-service content by node.",
    loading: "Loading settings…",
    loadFailedPrefix: "Load failed:",
    globalTitle: "Global settings",
    brandName: "Brand name",
    brandLogoUrl: "Brand logo URL",
    brandFaviconUrl: "Favicon URL",
    email: "Email",
    phone: "Phone",
    addressVi: "Address (VI)",
    addressEn: "Address (EN)",
    addressZh: "Address (ZH)",
    facebookUrl: "Facebook URL",
    tiktokUrl: "TikTok URL",
    linkedinUrl: "LinkedIn URL",
    delete: "Remove",
    addImage: "Add image",
    landingTitle: "Landing page manager",
    landingHint: "Edit homepage copy per language (color scheme unchanged).",
    landingHero: "Hero",
    landingProblems: "Pain points",
    landingContact: "Contact + stats",
    landingImages: "Images",
    serviceTitle: "Service content manager",
    serviceHint: "Pick a service and node to edit text/images. Each locale is independent.",
    serviceGoogleAds: "Google Ads",
    serviceFacebookAds: "Facebook Ads",
    serviceTiktokAds: "TikTok Ads",
    serviceSeo: "SEO",
    nodeBase: "Main info",
    nodeSectionTitles: "Section titles",
    nodeFormats: "Formats",
    nodeBenefits: "Benefits",
    nodeProcess: "Process steps",
    nodeDeliverables: "Deliverables",
    nodeImages: "Images",
    labelTitle: "Title",
    labelSummary: "Summary",
    labelSolutionHeadline: "Solution headline",
    labelLead: "Lead paragraph",
    labelCta: "CTA label",
    labelFormatsSectionTitle: "Formats section title",
    labelGallerySectionTitle: "Gallery section title",
    labelBenefitsSectionTitle: "Benefits section title",
    labelProcessSectionTitle: "Process section title",
    labelDescription: "Description",
    removeItem: "Remove item",
    addFormat: "Add format",
    addBenefit: "Add benefit",
    removeStep: "Remove step",
    addStep: "Add step",
    remove: "Remove",
    addDeliverable: "Add deliverable line",
    eyebrow: "Eyebrow",
    titleLine1: "Title line 1",
    titleLine2: "Title line 2",
    heroSubtitle: "Subtitle",
    bulletN: (n) => `Bullet ${n}`,
    kicker: "Kicker",
    itemN: (n) => `Item ${n}`,
    contactBlurb: "Contact blurb",
    responseTimeLabel: "Response time label",
    responseTimeValue: "Response time value",
    strategySessionLabel: "Strategy session label",
    strategySessionValue: "Strategy session value",
    counterN: (n) => `Counter ${n} label`,
    save: "Save settings",
    saving: "Saving…",
    saved: "Saved successfully.",
    saveFailedPrefix: "Save failed:",
  },
};

const zh: CmsDictionary = {
  layout: {
    backToSite: "← 返回网站",
    cmsBadge: "CMS",
    localeVi: "越南语",
    localeEn: "英语",
    localeZh: "中文",
  },
  dashboard: {
    title: "CMS — 界面与内容",
    subtitle: "联系方式、社交链接、图片 URL（落地页 + 服务页）及 ROI 统计。",
  },
  auth: {
    checkingSession: "正在检查登录状态…",
    adminLogin: "管理员登录",
    signInHint: "使用 Supabase 账号登录以访问 CMS 设置。",
    emailPlaceholder: "admin@company.com",
    passwordPlaceholder: "密码",
    signingIn: "正在登录…",
    signIn: "登录",
    forgotPassword: "忘记密码？",
    loginFailedPrefix: "登录失败：",
    loginSuccess: "登录成功。",
    loggedInAs: "已登录：",
    signOut: "退出",
    logoutFailedPrefix: "退出失败：",
  },
  roi: {
    title: "ROI 分析（最近 10 条）",
    subtitle: "来自网站公开 ROI 计算器的快照。",
    allLocales: "全部语言",
    last7d: "最近 7 天",
    last30d: "最近 30 天",
    refresh: "刷新",
    records: "记录数",
    avgBudget: "平均预算",
    avgLeads: "平均线索",
    loadingRecords: "正在加载 ROI 数据…",
    noRecords: "暂无 ROI 记录。",
    loadFailedPrefix: "加载失败：",
    thCreatedAt: "时间",
    thLocale: "语言",
    thBudget: "预算",
    thCpc: "CPC",
    thCr: "转化率 (%)",
    thClicks: "点击",
    thLeads: "线索",
    thCpl: "CPL",
  },
  forgot: {
    title: "忘记密码",
    introBefore: "输入管理员邮箱。在 Supabase",
    introStrong: "Authentication → URL Configuration → Redirect URLs",
    introAfter: "中添加以下完整 URL（与本 CMS 的协议与域名一致）：",
    loadingUrl: "正在加载 URL…",
    emailLabel: "邮箱",
    sending: "发送中…",
    sendReset: "发送重置链接",
    sentHint: "若该邮箱存在账户，您将很快收到重置邮件，请检查垃圾邮件文件夹。",
    backToLogin: "← 返回管理员登录",
  },
  reset: {
    validating: "正在验证恢复链接…",
    invalidTitle: "链接无效或已过期",
    invalidHint: "请打开邮件中的最新链接，或从忘记密码页面重新申请。",
    requestNew: "申请新链接",
    adminLogin: "管理员登录",
    setTitle: "设置新密码",
    setHint: "为管理员账户设置强密码。",
    newPassword: "新密码",
    confirmPassword: "确认密码",
    saving: "保存中…",
    updatePassword: "更新密码",
    minPassword: "密码至少需要 8 个字符。",
    passwordMismatch: "两次输入的密码不一致。",
  },
  settings: {
    title: "网站设置",
    intro: "全局设置 + 按节点编辑各服务页内容。",
    loading: "正在加载设置…",
    loadFailedPrefix: "加载失败：",
    globalTitle: "全局设置",
    brandName: "品牌名称",
    brandLogoUrl: "Logo URL",
    brandFaviconUrl: "网站图标 URL",
    email: "邮箱",
    phone: "电话",
    addressVi: "地址（越南语）",
    addressEn: "地址（英语）",
    addressZh: "地址（中文）",
    facebookUrl: "Facebook URL",
    tiktokUrl: "TikTok URL",
    linkedinUrl: "LinkedIn URL",
    delete: "删除",
    addImage: "添加图片",
    landingTitle: "落地页管理",
    landingHint: "按语言编辑首页文案（配色不变）。",
    landingHero: "首屏",
    landingProblems: "痛点",
    landingContact: "联系 + 数据",
    landingImages: "图片",
    serviceTitle: "服务内容管理",
    serviceHint: "选择服务与节点编辑文案/图片。各语言独立。",
    serviceGoogleAds: "Google Ads",
    serviceFacebookAds: "Facebook Ads",
    serviceTiktokAds: "TikTok Ads",
    serviceSeo: "SEO",
    nodeBase: "主要信息",
    nodeSectionTitles: "区块标题",
    nodeFormats: "形式",
    nodeBenefits: "优势",
    nodeProcess: "流程步骤",
    nodeDeliverables: "交付范围",
    nodeImages: "展示图片",
    labelTitle: "标题",
    labelSummary: "摘要",
    labelSolutionHeadline: "方案主标题",
    labelLead: "导语",
    labelCta: "CTA 文案",
    labelFormatsSectionTitle: "形式区块标题",
    labelGallerySectionTitle: "图集区块标题",
    labelBenefitsSectionTitle: "优势区块标题",
    labelProcessSectionTitle: "流程区块标题",
    labelDescription: "描述",
    removeItem: "删除此项",
    addFormat: "添加形式",
    addBenefit: "添加优势",
    removeStep: "删除步骤",
    addStep: "添加步骤",
    remove: "删除",
    addDeliverable: "添加交付项",
    eyebrow: "眉题",
    titleLine1: "标题第 1 行",
    titleLine2: "标题第 2 行",
    heroSubtitle: "副标题",
    bulletN: (n) => `要点 ${n}`,
    kicker: "引导语",
    itemN: (n) => `条目 ${n}`,
    contactBlurb: "联系区说明",
    responseTimeLabel: "响应时间标签",
    responseTimeValue: "响应时间值",
    strategySessionLabel: "策略咨询标签",
    strategySessionValue: "策略咨询值",
    counterN: (n) => `统计 ${n} 标签`,
    save: "保存设置",
    saving: "保存中…",
    saved: "保存成功。",
    saveFailedPrefix: "保存失败：",
  },
};

const byLocale: Record<Locale, CmsDictionary> = { vi, en, zh };

export function getCmsDictionary(locale: string): CmsDictionary {
  if (locale === "en" || locale === "zh") return byLocale[locale];
  return byLocale.vi;
}
