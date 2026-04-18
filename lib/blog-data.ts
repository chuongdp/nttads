import type { Locale } from "@/lib/i18n";

export type BlogBlock =
  | { type: "h2"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] };

export type BlogPostLocalized = {
  slug: string;
  date: string;
  readMinutes: number;
  title: string;
  excerpt: string;
  blocks: BlogBlock[];
};

type Localized = { title: string; excerpt: string; blocks: BlogBlock[] };

type RawPost = {
  slug: string;
  date: string;
  readMinutes: number;
  vi: Localized;
  en: Localized;
  zh: Localized;
};

const RAW_POSTS: RawPost[] = [
  {
    slug: "google-pmax-vs-search",
    date: "2026-02-10",
    readMinutes: 6,
    vi: {
      title: "Google Ads: khi nào ưu tiên Search, khi nào mở Performance Max?",
      excerpt:
        "Gợi ý phân vai cho Search và PMax theo intent, dữ liệu conversion và mức độ kiểm soát creative — tránh chọn nhầm từ đầu.",
      blocks: [
        {
          type: "p",
          text: "Search và Performance Max (PMax) không thay thế nhau hoàn toàn. Bài viết này tóm tắt cách team NTT Ads thường phân vai trong buổi discovery — phù hợp site demo, không phải hiến pháp cho mọi ngành.",
        },
        {
          type: "h2",
          text: "Search: bắt nhu cầu đang diễn ra",
        },
        {
          type: "p",
          text: "Khi người dùng gõ từ khóa có ý định rõ (mua, đặt lịch, so sánh), Search cho phép kiểm soát từng truy vấn, negative chặt và message khớp landing từng nhóm. Đây thường là nơi bạn học CPA/ROAS thật trước khi mở rộng.",
        },
        {
          type: "h2",
          text: "PMax: mở phạm vi khi đã có tín hiệu",
        },
        {
          type: "p",
          text: "PMax khai thác nhiều inventory Google với mục tiêu chuyển đổi. Nó hữu ích khi bạn đã có conversion đủ dày, asset (hình, video, text) tương đối đầy, và chấp nhận trade-off kiểm soát chi tiết từng placement thấp hơn Search thuần.",
        },
        {
          type: "h2",
          text: "Checklist nhanh trước khi bật PMax",
        },
        {
          type: "ul",
          items: [
            "Conversion primary đã đo đúng hành vi (không double-count).",
            "Brand search đã có lớp bảo vệ (chiến dịch riêng hoặc negative phù hợp).",
            "Merchant Center / feed ổn nếu bán hàng qua Shopping trong PMax.",
          ],
        },
      ],
    },
    en: {
      title: "Google Ads: when to lean on Search vs Performance Max",
      excerpt:
        "A practical split of roles between Search and PMax based on intent, conversion volume, and how much control you need.",
      blocks: [
        {
          type: "p",
          text: "Search and Performance Max are complements, not duplicates. This note summarizes how we usually split responsibilities in discovery — demo guidance, not a universal law for every account.",
        },
        {
          type: "h2",
          text: "Search: capture live intent",
        },
        {
          type: "p",
          text: "When queries show clear commercial intent, Search gives tight query control, negatives, and message-to-landing alignment. It is often where you learn true CPA/ROAS before scaling breadth.",
        },
        {
          type: "h2",
          text: "PMax: expand once signals exist",
        },
        {
          type: "p",
          text: "PMax reaches multiple Google surfaces behind one conversion goal. It works best with enough conversion events, solid creative assets, and an acceptance that granular placement control is lower than pure Search.",
        },
        {
          type: "h2",
          text: "Quick checks before scaling PMax",
        },
        {
          type: "ul",
          items: [
            "Primary conversions reflect real outcomes (no double counting).",
            "Brand queries are handled intentionally (separate Search or negatives).",
            "Merchant Center health is acceptable if Shopping inventory is in scope.",
          ],
        },
      ],
    },
    zh: {
      title: "Google Ads：何时侧重搜索，何时放开效果最大化（PMax）？",
      excerpt: "按意图、转化量与可控性拆分搜索与 PMax 的角色——演示站观点，非放之四海皆准。",
      blocks: [
        {
          type: "p",
          text: "搜索与效果最大化更像互补而非替代。本文概括我们在需求沟通中的常见分工——供演示站点参考。",
        },
        { type: "h2", text: "搜索：抓住当下需求" },
        {
          type: "p",
          text: "当查询呈现明确商业意图时，搜索便于精细到词、否定词与落地页一致性，通常也是先验证真实 CPA/ROAS 的地方。",
        },
        { type: "h2", text: "PMax：有信号后再扩面" },
        {
          type: "p",
          text: "PMax 在单一转化目标下覆盖多触点，更适合转化事件充足、素材齐备，并接受比纯搜索更低的版位细粒度控制。",
        },
        { type: "h2", text: "放大 PMax 前的快速检查" },
        {
          type: "ul",
          items: [
            "主要转化定义准确且不重复计数。",
            "品牌词有专门策略（独立搜索或合理否定）。",
            "若包含购物，Merchant Center / Feed 健康可用。",
          ],
        },
      ],
    },
  },
  {
    slug: "meta-pixel-capi-basics",
    date: "2026-02-01",
    readMinutes: 7,
    vi: {
      title: "Meta: Pixel và Conversions API (CAPI) — nền tảng đo lường không nên bỏ qua",
      excerpt:
        "Vì sao nên coi Pixel + CAPI là một cặp; làm gì trước khi tin vào số trong Ads Manager.",
      blocks: [
        {
          type: "p",
          text: "Sau các thay đổi privacy trên thiết bị, chỉ dựa vào Pixel trình duyệt thường thiếu event. Meta khuyến khích bổ sung Conversions API để server gửi event đã hash — bài viết tóm lược mức strategy, không phải hướng dẫn triển khai từng dòng code.",
        },
        {
          type: "h2",
          text: "Pixel: nhanh, nhưng dễ “mất mảnh”",
        },
        {
          type: "p",
          text: "Pixel bắt pageview, add-to-cart, purchase trên browser. Khi cookie/ITP chặn hoặc user đóng tab sớm, bạn mất tín hiệu dù đơn vẫn thành công.",
        },
        {
          type: "h2",
          text: "CAPI: bù cho phần thiếu",
        },
        {
          type: "p",
          text: "Server-side event (purchase, lead qualified…) giúp Ads Manager nhận đủ tín hiệu để học và phân phối. Quan trọng là dedupe với Pixel bằng event_id để không đếm đôi.",
        },
        {
          type: "h2",
          text: "Trước khi tối ưu CPA, hãy QA 3 điểm",
        },
        {
          type: "ul",
          items: [
            "Test Events / preview cho thấy event đúng tên và thời điểm.",
            "Domain verification và pixel đúng container.",
            "Không dùng custom event lung tung làm primary nếu team chưa thống nhất định nghĩa.",
          ],
        },
      ],
    },
    en: {
      title: "Meta: Pixel and Conversions API basics for trustworthy metrics",
      excerpt: "Why Pixel plus CAPI is a pair, and what to validate before trusting Ads Manager numbers.",
      blocks: [
        {
          type: "p",
          text: "Browser-only tracking often misses events after mobile privacy shifts. Meta recommends Conversions API so your server can send hashed events — this article stays strategic, not a full implementation guide.",
        },
        { type: "h2", text: "Pixel: fast but fragile" },
        {
          type: "p",
          text: "Pixel captures browser-side actions. Cookie limits, ITP-style behavior, or early tab closes can drop signals even when the business outcome happened.",
        },
        { type: "h2", text: "CAPI: fill the gaps" },
        {
          type: "p",
          text: "Server-side events (purchases, qualified leads) improve signal for learning and delivery. Deduplicate with Pixel using event_id to avoid double counting.",
        },
        { type: "h2", text: "QA before chasing CPA" },
        {
          type: "ul",
          items: [
            "Test Events / previews show the right names and timing.",
            "Domain verification and the correct pixel placement.",
            "Avoid random custom events as primary until the team agrees definitions.",
          ],
        },
      ],
    },
    zh: {
      title: "Meta：Pixel 与转化 API（CAPI）——可靠测量的底座",
      excerpt: "为何把 Pixel + CAPI 视作组合；在相信广告后台数字前先验收什么。",
      blocks: [
        {
          type: "p",
          text: "仅靠浏览器像素常因隐私与拦截丢事件。CAPI 让服务器回传哈希事件——本文为策略级概述，非逐步开发教程。",
        },
        { type: "h2", text: "Pixel：快但易缺口" },
        {
          type: "p",
          text: "像素抓取页面行为；在限制 cookie 或用户早关标签时，仍可能丢信号。",
        },
        { type: "h2", text: "CAPI：补齐信号" },
        {
          type: "p",
          text: "服务端事件（购买、合格线索）帮助模型学习；用 event_id 与 Pixel 去重，避免双计。",
        },
        { type: "h2", text: "追 CPA 前的三项验收" },
        {
          type: "ul",
          items: [
            "测试工具能看到事件名与时间合理。",
            "域名验证与像素容器正确。",
            "主要转化定义团队一致，避免随意自定义。",
          ],
        },
      ],
    },
  },
  {
    slug: "tiktok-first-3-seconds",
    date: "2026-01-18",
    readMinutes: 5,
    vi: {
      title: "TikTok Ads: 3 giây đầu quyết định — cách brief hook cho team creative",
      excerpt:
        "Không cần budget lớn nếu hook sai. Một khung brief ngắn để mở video giữ người xem.",
      blocks: [
        {
          type: "p",
          text: "For You Page cuộn rất nhanh. Nếu ba giây đầu không trả lời “đây là gì, vì sao tôi quan tâm”, viewer skip trước khi tới CTA.",
        },
        {
          type: "h2",
          text: "Một ý tưởng — một twist",
        },
        {
          type: "p",
          text: "Tránh nhồi logo + slogan + giá trong 1s. Chọn một tension duy nhất: nỗi đau, mẹo nhanh, hoặc kết quả before/after rõ ràng.",
        },
        {
          type: "h2",
          text: "Brief nên có shot list 3 beat",
        },
        {
          type: "ul",
          items: [
            "Beat 1 (0–1s): nhận diện ngữ cảnh — sản phẩm/đối tượng trong khung.",
            "Beat 2 (1–2s): twist hoặc lợi ích cụ thể.",
            "Beat 3 (2–3s): proof nhỏ (UGC, số liệu minh họa, demo).",
          ],
        },
        {
          type: "h2",
          text: "Safe zone và caption",
        },
        {
          type: "p",
          text: "Giữ sản phẩm tránh vùng UI TikTok (like, caption). Test 2–3 mở đầu với cùng body; đừng đo CPA khi hook chưa ổn định.",
        },
      ],
    },
    en: {
      title: "TikTok Ads: why the first three seconds matter — a hook brief for creatives",
      excerpt: "Great budgets cannot save a weak open. A compact brief pattern for the opening beat.",
      blocks: [
        {
          type: "p",
          text: "For You scrolls fast. If the first three seconds do not answer “what is this and why care,” viewers skip before your CTA appears.",
        },
        { type: "h2", text: "One idea, one twist" },
        {
          type: "p",
          text: "Avoid stacking logo, slogan, and price in second one. Pick a single tension: pain, quick hack, or obvious before/after.",
        },
        { type: "h2", text: "Brief with a three-beat shot list" },
        {
          type: "ul",
          items: [
            "Beat 1 (0–1s): context — product or audience in frame.",
            "Beat 2 (1–2s): twist or concrete benefit.",
            "Beat 3 (2–3s): small proof (UGC, illustrative stat, demo).",
          ],
        },
        { type: "h2", text: "Safe zones and captions" },
        {
          type: "p",
          text: "Keep the hero SKU away from TikTok UI overlays. Test multiple opens with the same body; do not chase CPA while hooks are unstable.",
        },
      ],
    },
    zh: {
      title: "TikTok 广告：前三秒定生死——给创意团队的钩子 brief",
      excerpt: "钩子不对，预算难救。用三段节拍拆解开场。",
      blocks: [
        {
          type: "p",
          text: "For You 刷得极快。前三秒说不清“是什么、为何在意”，用户会在 CTA 前划走。",
        },
        { type: "h2", text: "一个创意，一个转折" },
        {
          type: "p",
          text: "避免一秒内堆满 logo、口号、价格。选一个张力：痛点、快技巧或清晰前后对比。",
        },
        { type: "h2", text: "用三拍镜头清单写 brief" },
        {
          type: "ul",
          items: [
            "0–1 秒：交代场景与主体。",
            "1–2 秒：转折或具体收益。",
            "2–3 秒：轻量证明（UGC、演示、示例数据）。",
          ],
        },
        { type: "h2", text: "安全区与字幕" },
        {
          type: "p",
          text: "避开点赞、文案等 UI 遮挡。主体相同、多测开场；钩子不稳时别急着盯 CPA。",
        },
      ],
    },
  },
  {
    slug: "seo-eeat-starter",
    date: "2026-01-12",
    readMinutes: 6,
    vi: {
      title: "SEO: E-E-A-T không phải buzzword — checklist ngắn cho site vừa audit xong",
      excerpt:
        "Sau kỹ thuật index/ổn định, Google vẫn hỏi “ai viết, vì sao tin”. Vài mục làm ngay được.",
      blocks: [
        {
          type: "p",
          text: "E-E-A-T (Experience, Expertise, Authoritativeness, Trust) là khung chất lượng. Không có nút “bật E-E-A-T”, nhưng có những việc nhỏ làm tăng độ tin trên site.",
        },
        {
          type: "h2",
          text: "Trust surfaces",
        },
        {
          type: "ul",
          items: [
            "Trang Giới thiệu rõ người đứng sau, địa chỉ liên hệ thật.",
            "Chính sách đổi trả / bảo mật / điều khoản với ngày cập nhật.",
            "Case study có ngữ cảnh (ngành, timeline, vai trò bạn).",
          ],
        },
        {
          type: "h2",
          text: "Expertise trong nội dung",
        },
        {
          type: "p",
          text: "Bài pillar nên dẫn chứng từ nguồn chính thống (tài liệu nền tảng, chuẩn ngành). Tránh viết lan man chỉ để dài trang.",
        },
        {
          type: "h2",
          text: "Experience thể hiện thế nào?",
        },
        {
          type: "p",
          text: "Ảnh thực tế quy trình, quote từ khách (có xin phép), hoặc mô tả tình huống triển khai cụ thể — tất cả giúp người đọc (và Google) cảm nhận bạn đã làm việc này ngoài đời thật.",
        },
      ],
    },
    en: {
      title: "SEO: E-E-A-T is not a buzzword — a short checklist after your technical audit",
      excerpt: "Once crawl basics are healthy, Google still asks who wrote this and why trust it. Quick wins you can ship.",
      blocks: [
        {
          type: "p",
          text: "E-E-A-T frames quality: experience, expertise, authority, trust. There is no magic toggle, but there are concrete trust surfaces to improve.",
        },
        { type: "h2", text: "Trust surfaces" },
        {
          type: "ul",
          items: [
            "About page with real people and contact paths.",
            "Refund / privacy / terms pages with update dates.",
            "Case studies with context (industry, timeline, your role).",
          ],
        },
        { type: "h2", text: "Expertise in the copy" },
        {
          type: "p",
          text: "Pillar pages should cite first-party platform docs or industry standards. Avoid fluff written only to lengthen the page.",
        },
        { type: "h2", text: "Show experience, not adjectives" },
        {
          type: "p",
          text: "Process photos, permitted client quotes, or concrete implementation stories signal that you have done the work in the real world.",
        },
      ],
    },
    zh: {
      title: "SEO：E-E-A-T 不是空话——技术审计后的短清单",
      excerpt: "抓取与性能稳定后，仍需回答“谁写、为何可信”。可立刻落地的几项。",
      blocks: [
        {
          type: "p",
          text: "E-E-A-T 概括体验、专业、权威与信任。没有一键开关，但有可交付的信任页面与内容做法。",
        },
        { type: "h2", text: "信任页面" },
        {
          type: "ul",
          items: [
            "关于我们与真实联系方式。",
            "退换、隐私、条款并标注更新日期。",
            "案例写清行业、时间线与团队角色。",
          ],
        },
        { type: "h2", text: "内容里的专业度" },
        {
          type: "p",
          text: "支柱页引用官方文档或行业标准，避免为长度堆砌空洞段落。",
        },
        { type: "h2", text: "用事实证明经验" },
        {
          type: "p",
          text: "流程图片、经许可的客户引述或具体实施故事，让读者与搜索引擎感知真实经历。",
        },
      ],
    },
  },
  {
    slug: "weekly-paid-report-read",
    date: "2026-01-05",
    readMinutes: 5,
    vi: {
      title: "Báo cáo paid media hàng tuần: tối thiểu nên nhìn những chỉ số nào?",
      excerpt:
        "Tránh dashboard 20 cột không ra quyết định. Gợi ý khung 1 trang cho account vừa và nhỏ.",
      blocks: [
        {
          type: "p",
          text: "Mục tiêu của báo cáo là quyết định việc tuần tới: tắt gì, thử gì, scale hay thu. Chọn ít chỉ số nhưng gắn với conversion đã định nghĩa.",
        },
        {
          type: "h2",
          text: "Chi phí & phạm vi",
        },
        {
          type: "ul",
          items: [
            "Spend theo chiến dịch / nhóm quảng cáo so với kế hoạch.",
            "Impression share lost (budget vs rank) nếu là Search — hiểu nghẽn ở tiền hay ở đấu giá/chất lượng.",
          ],
        },
        {
          type: "h2",
          text: "Hiệu quả trung gian",
        },
        {
          type: "p",
          text: "CTR, CPC/CPM chỉ hữu ích khi đặt cạnh CVR và CPA/ROAS. Nếu CTR cao mà CVR thấp, ưu tiên landing và message match trước khi đụng bid.",
        },
        {
          type: "h2",
          text: "Hành động cuối báo cáo",
        },
        {
          type: "p",
          text: "Mỗi tuần kết thúc bằng 3 bullet: một thử nghiệm creative, một thử nghiệm đối tượng/keyword, một việc kỹ thuật (tag, feed, policy).",
        },
      ],
    },
    en: {
      title: "Weekly paid media reports: the minimum metrics that should drive decisions",
      excerpt: "Skip twenty-column dashboards. A one-page frame for SMB accounts.",
      blocks: [
        {
          type: "p",
          text: "Reports exist to decide what to stop, test, scale, or trim next week. Pick fewer metrics, each tied to agreed conversions.",
        },
        { type: "h2", text: "Spend and scope" },
        {
          type: "ul",
          items: [
            "Spend by campaign or ad set versus plan.",
            "Search impression share lost (budget vs rank) to see if the cap is money or auction quality.",
          ],
        },
        { type: "h2", text: "Intermediate health" },
        {
          type: "p",
          text: "CTR and CPC/CPM matter alongside CVR and CPA/ROAS. High CTR with poor CVR usually means landing or message mismatch before bidding changes.",
        },
        { type: "h2", text: "End every weekly note with three actions" },
        {
          type: "p",
          text: "One creative test, one audience or keyword test, and one technical task (tagging, feed, policy). Ship the list, not just the numbers.",
        },
      ],
    },
    zh: {
      title: "周报里该看哪些付费指标？——给小账户的一页框架",
      excerpt: "避免二十列表格却做不出决策；与已定义转化强绑定的少量指标。",
      blocks: [
        {
          type: "p",
          text: "周报目的是决定下周停什么、试什么、加预算还是收。指标要少，且与约定转化一致。",
        },
        { type: "h2", text: "花费与范围" },
        {
          type: "ul",
          items: [
            "按战役/广告组对比计划花费。",
            "搜索广告可看展示份额丢失（预算 vs 排名）判断瓶颈在钱还是质量。",
          ],
        },
        { type: "h2", text: "中间健康度" },
        {
          type: "p",
          text: "CTR、CPC/CPM 要与 CVR、CPA/ROAS 同看。CTR 高但转化差，先查落地页与信息一致性再动出价。",
        },
        { type: "h2", text: "每周结尾三件事" },
        {
          type: "p",
          text: "一条创意测试、一条受众或关键词测试、一项技术事项（标签、Feed、政策）。交付清单，而非只堆数字。",
        },
      ],
    },
  },
];

export const blogSlugs = RAW_POSTS.map((p) => p.slug) as readonly string[];

export const blogIndexCopy: Record<
  Locale,
  { title: string; intro: string; readMore: string; minRead: string; published: string }
> = {
  vi: {
    title: "Blog",
    intro: "Bài viết ngắn về Google Ads, Meta, TikTok và SEO — mang tính giáo dục cho website demo, không thay cho tư vấn riêng.",
    readMore: "Đọc tiếp",
    minRead: "phút đọc",
    published: "Đăng",
  },
  en: {
    title: "Blog",
    intro: "Short reads on Google Ads, Meta, TikTok, and SEO — educational notes for this demo site, not bespoke advice.",
    readMore: "Read more",
    minRead: "min read",
    published: "Published",
  },
  zh: {
    title: "博客",
    intro: "关于 Google、Meta、TikTok 与 SEO 的短文——本站演示用途，不能替代个案咨询。",
    readMore: "阅读全文",
    minRead: "分钟",
    published: "发布",
  },
};

export function getBlogPosts(locale: Locale): BlogPostLocalized[] {
  return RAW_POSTS.map((p) => ({
    slug: p.slug,
    date: p.date,
    readMinutes: p.readMinutes,
    ...p[locale],
  })).sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getBlogPost(locale: Locale, slug: string): BlogPostLocalized | null {
  const raw = RAW_POSTS.find((p) => p.slug === slug);
  if (!raw) return null;
  return {
    slug: raw.slug,
    date: raw.date,
    readMinutes: raw.readMinutes,
    ...raw[locale],
  };
}

export function formatBlogDate(iso: string, locale: Locale): string {
  const tag = locale === "vi" ? "vi-VN" : locale === "zh" ? "zh-CN" : "en-US";
  return new Intl.DateTimeFormat(tag, { dateStyle: "medium" }).format(new Date(`${iso}T12:00:00`));
}
