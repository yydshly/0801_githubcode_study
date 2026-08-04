const featured = [
  {
    slug: "linear.app", name: "Linear", category: "SaaS 与协作", categoryKey: "saas", accent: "#5e6ad2", accentSoft: "#828fff", canvas: "#010102", surface: "#0f1011", ink: "#f7f8f8", body: "#d0d6e0", type: "Linear Display / SF Pro Display", typeDetail: "80px display · 600 weight · measured negative tracking", radius: "6px–8px / hairline", spacing: "compact 4px rhythm", eyebrow: "THE CRAFT OF SOFTWARE", headline: "Product thinking\nwith a point of view.", description: "近黑产品画布、单一 lavender-blue 强调色、细线边框和深色产品 UI 面板，形成安静但技术密度很高的“软件工艺”气质。", verdict: "一套克制、技术、带有产品工艺感的界面语言。", cardTitle: "Quiet structure, deliberate accent.", signatures: ["Near-black canvas + charcoal surface", "Lavender accent 只在焦点和关键 CTA 出现", "产品截图被当作内容，而不是装饰"], swatches: [{ name: "primary", color: "#5e6ad2" }, { name: "canvas", color: "#010102" }, { name: "surface", color: "#0f1011" }, { name: "ink", color: "#f7f8f8" }]
  },
  {
    slug: "stripe", name: "Stripe", category: "金融与支付", categoryKey: "finance", accent: "#533afd", accentSoft: "#b9b9f9", canvas: "#ffffff", surface: "#f6f9fc", ink: "#0d253d", body: "#64748d", type: "Sohne / SF Pro Display", typeDetail: "56px display · 300 weight · tnum for money", radius: "9999px / pill CTA", spacing: "8px base · 64px bands", eyebrow: "PAYMENTS INFRASTRUCTURE", headline: "Move money\nwith more clarity.", description: "深海军蓝正文、电感紫 CTA、上三分之一渐变网格和轻薄标题共同构成金融基础设施的编辑感。数字和金额被单独照顾。", verdict: "用极少的强调色，制造高信任度的金融产品节奏。", cardTitle: "A quiet system for serious numbers.", signatures: ["Hero 上三分之一的 pastel gradient mesh", "单一 indigo pill CTA 负责行动层级", "货币和数字使用 tabular figures"], swatches: [{ name: "primary", color: "#533afd" }, { name: "ink", color: "#0d253d" }, { name: "canvas", color: "#ffffff" }, { name: "cream", color: "#f5e9d4" }]
  },
  {
    slug: "vercel", name: "Vercel", category: "开发者工具", categoryKey: "dev", accent: "#0070f3", accentSoft: "#50e3c2", canvas: "#ffffff", surface: "#fafafa", ink: "#171717", body: "#4d4d4d", type: "Geist / monospace caption", typeDetail: "geometric sans · black/ink duet · technical labels", radius: "12px / soft cards", spacing: "clean container · generous hero", eyebrow: "BUILD · SHIP · SCALE", headline: "The web,\nwithout the noise.", description: "黑白精度是主体，多色 mesh gradient 只在 Hero 级别出现；技术标签、链接蓝和错误语义色负责让开发者平台保持可操作。", verdict: "把“没有多余东西”变成一套强烈的品牌性格。", cardTitle: "Precision is a feature.", signatures: ["black / white canvas with one gradient event", "Geist + monospace technical captions", "链接、状态和错误有清楚的语义颜色"], swatches: [{ name: "ink", color: "#171717" }, { name: "link", color: "#0070f3" }, { name: "canvas", color: "#ffffff" }, { name: "cyan", color: "#50e3c2" }]
  },
  {
    slug: "nvidia", name: "NVIDIA", category: "技术与基础设施", categoryKey: "infra", accent: "#76b900", accentSoft: "#bff230", canvas: "#ffffff", surface: "#000000", ink: "#000000", body: "#1a1a1a", type: "NVIDIA proprietary sans", typeDetail: "bold technical sans · tight leading · structured grid", radius: "2px / angular surfaces", spacing: "tight editorial grid", eyebrow: "ACCELERATED COMPUTING", headline: "Engineering\nwithout softness.", description: "黑、白、灰和几乎带电的 NVIDIA Green 组成硬朗工程系统。没有渐变、没有柔和阴影，2px 圆角和细线规则承担全部秩序。", verdict: "把工程感做成可识别的视觉纪律。", cardTitle: "Power needs a clear edge.", signatures: ["green 只负责 CTA、active tab 和信号角标", "2px radius 贯穿所有表面", "不用渐变和 soft shadow，依靠结构对比"], swatches: [{ name: "primary", color: "#76b900" }, { name: "dark", color: "#000000" }, { name: "canvas", color: "#ffffff" }, { name: "hairline", color: "#cccccc" }]
  },
  {
    slug: "apple", name: "Apple", category: "消费与媒体", categoryKey: "media", accent: "#0066cc", accentSoft: "#2997ff", canvas: "#ffffff", surface: "#000000", ink: "#1d1d1f", body: "#7a7a7a", type: "SF Pro Display", typeDetail: "56px hero · negative tracking · photography-first", radius: "surface-led / minimal chrome", spacing: "edge-to-edge tiles · large breathing room", eyebrow: "PRODUCT AS THE SUBJECT", headline: "Make room\nfor the object.", description: "摄影和产品本身承担叙事，界面 chrome 退到后台。浅色与黑色整屏 tile 交替，唯一稳定的交互色是 Action Blue。", verdict: "用减法让产品成为页面的主角。", cardTitle: "The interface knows when to disappear.", signatures: ["edge-to-edge product tiles", "light/dark canvas alternation", "不使用装饰性渐变和 chrome 阴影"], swatches: [{ name: "primary", color: "#0066cc" }, { name: "ink", color: "#1d1d1f" }, { name: "pearl", color: "#fafafc" }, { name: "black", color: "#000000" }]
  },
  {
    slug: "spotify", name: "Spotify", category: "消费与媒体", categoryKey: "media", accent: "#1ed760", accentSoft: "#b3b3b3", canvas: "#121212", surface: "#181818", ink: "#ffffff", body: "#b3b3b3", type: "SpotifyMixUI / Circular", typeDetail: "700 navigation · uppercase labels · global script fallback", radius: "500px–9999px / pill + circle", spacing: "compact dark theater", eyebrow: "CONTENT-FIRST DARKNESS", headline: "Let the content\nmake the color.", description: "近黑沉浸式播放器让内容和专辑图成为真正的色彩来源。绿色只负责播放、active 和 CTA；胶囊与圆形控制让界面像一台可触摸的设备。", verdict: "把 UI 退到阴影里，让内容发光。", cardTitle: "The interface is the room.", signatures: ["#121212–#1f1f1f 的多层暗面", "专一 Spotify Green，不做装饰性撒点", "pill button + circular play control"], swatches: [{ name: "green", color: "#1ed760" }, { name: "canvas", color: "#121212" }, { name: "surface", color: "#181818" }, { name: "body", color: "#b3b3b3" }]
  },
  {
    slug: "nintendo-2001", name: "Nintendo.com / 2001", category: "复古网页", categoryKey: "retro", accent: "#e60012", accentSoft: "#ecab37", canvas: "#7a8aba", surface: "#21242e", ink: "#21242e", body: "#3d4f97", type: "Arial / outlined display", typeDetail: "13px bold nav · bevel chrome · period-accurate hierarchy", radius: "beveled / chrome plates", spacing: "panel-first navigation", eyebrow: "WEB AS CONSOLE FACEPLATE", headline: "A website\nwith hardware chrome.", description: "2001 年 Nintendo.com 被分析成一台主机面板：磨砂紫灰金属、琥珀导航、半色调碳纤维、线路板 Hero 和高反差红色信号。", verdict: "复古不是滤镜，而是组件、材质和时代语法的一致。", cardTitle: "Insert coin. Read the panel.", signatures: ["beveled chrome panel + halftone carbon nav", "amber utility cues and Nintendo red signal", "outlined display type + circuit-board fields"], swatches: [{ name: "red", color: "#e60012" }, { name: "amber", color: "#ecab37" }, { name: "chrome", color: "#7a8aba" }, { name: "carbon", color: "#21242e" }]
  },
  {
    slug: "voltagent", name: "Voltagent", category: "AI 与 Agent 平台", categoryKey: "ai", accent: "#00d992", accentSoft: "#2fd6a1", canvas: "#101010", surface: "#1a1a1a", ink: "#f2f2f2", body: "#bdbdbd", type: "Inter / SF Mono", typeDetail: "60px display · code-editor mockups · terminal-native", radius: "6px buttons · 8px cards · pill status", spacing: "4px base · 48px section bands", eyebrow: "AGENT ENGINEERING PLATFORM", headline: "Build agents\nthat hold up.", description: "近黑画布、单一电光绿、代码编辑器 Mockup、细线卡片和文档式网格，把 AI Agent 平台做成终端原生的工程工作台。", verdict: "用一套极少的颜色把工程可信度固定下来。", cardTitle: "The system is the signal.", signatures: ["electric green is the only chromatic accent", "hairline borders instead of heavy shadows", "code-editor mockups as product proof"], swatches: [{ name: "primary", color: "#00d992" }, { name: "canvas", color: "#101010" }, { name: "surface", color: "#1a1a1a" }, { name: "body", color: "#bdbdbd" }]
  },
  {
    slug: "notion", name: "Notion", category: "SaaS 与协作", categoryKey: "saas", accent: "#5645d4", accentSoft: "#e6e0f5", canvas: "#ffffff", surface: "#0a1530", ink: "#0a1530", body: "#5a5a5a", type: "Notion Sans / Inter", typeDetail: "illustration-rich · pastel property tints · confident CTA", radius: "12px cards · pill CTA", spacing: "banded editorial + card grid", eyebrow: "ALL-IN-ONE WORKSPACE", headline: "Make the messy\nfeel possible.", description: "深海军蓝 Hero、紫色 pill CTA、彩色数据库属性般的卡片色和产品工作区 Mockup，共同组成温暖、丰富、可扩展的工作空间叙事。", verdict: "把复杂产品变成一套可亲近的彩色工作台。", cardTitle: "Structure with room for play.", signatures: ["navy hero + colorful sticky-note palette", "purple CTA stays recognizable", "产品工作区直接进入 Hero 叙事"], swatches: [{ name: "primary", color: "#5645d4" }, { name: "navy", color: "#0a1530" }, { name: "peach", color: "#ffe8d4" }, { name: "mint", color: "#d9f3e1" }]
  }
];

const categoryLabels = { all: "全部", ai: "AI 与平台", dev: "开发者工具", saas: "SaaS 与协作", finance: "金融与支付", infra: "技术与基础设施", media: "消费与媒体", retro: "复古网页" };
const categoryOrder = ["all", "ai", "dev", "saas", "finance", "infra", "media", "retro"];
const catalog = [
  ["airbnb", "Airbnb", "media"], ["airtable", "Airtable", "dev"], ["apple", "Apple", "media"], ["binance", "Binance", "finance"], ["bmw", "BMW", "auto"], ["bmw-m", "BMW M", "auto"], ["bugatti", "Bugatti", "auto"], ["cal", "Cal.com", "saas"], ["claude", "Claude", "ai"], ["clay", "Clay", "dev"], ["clickhouse", "ClickHouse", "infra"], ["cohere", "Cohere", "ai"], ["coinbase", "Coinbase", "finance"], ["composio", "Composio", "infra"], ["cursor", "Cursor", "dev"], ["dell-1996", "Dell 1996", "retro"], ["elevenlabs", "ElevenLabs", "ai"], ["expo", "Expo", "dev"], ["ferrari", "Ferrari", "auto"], ["figma", "Figma", "dev"], ["framer", "Framer", "dev"], ["hashicorp", "HashiCorp", "infra"], ["hp", "HP", "media"], ["ibm", "IBM", "media"], ["intercom", "Intercom", "saas"], ["kraken", "Kraken", "finance"], ["lamborghini", "Lamborghini", "auto"], ["linear.app", "Linear", "saas"], ["lovable", "Lovable", "dev"], ["mastercard", "Mastercard", "finance"], ["meta", "Meta", "media"], ["minimax", "Minimax", "ai"], ["mintlify", "Mintlify", "saas"], ["miro", "Miro", "dev"], ["mistral.ai", "Mistral AI", "ai"], ["mongodb", "MongoDB", "infra"], ["nike", "Nike", "media"], ["nintendo-2001", "Nintendo.com (2001)", "retro"], ["notion", "Notion", "saas"], ["nvidia", "NVIDIA", "infra"], ["ollama", "Ollama", "ai"], ["opencode.ai", "OpenCode AI", "ai"], ["pinterest", "Pinterest", "media"], ["playstation", "PlayStation", "media"], ["posthog", "PostHog", "infra"], ["raycast", "Raycast", "dev"], ["renault", "Renault", "auto"], ["replicate", "Replicate", "ai"], ["resend", "Resend", "saas"], ["revolut", "Revolut", "finance"], ["runwayml", "Runway", "ai"], ["sanity", "Sanity", "infra"], ["sentry", "Sentry", "infra"], ["shopify", "Shopify", "media"], ["slack", "Slack", "saas"], ["spacex", "SpaceX", "media"], ["spotify", "Spotify", "media"], ["starbucks", "Starbucks", "media"], ["stripe", "Stripe", "finance"], ["supabase", "Supabase", "infra"], ["superhuman", "Superhuman", "dev"], ["tesla", "Tesla", "auto"], ["theverge", "The Verge", "media"], ["together.ai", "Together AI", "ai"], ["uber", "Uber", "media"], ["vercel", "Vercel", "dev"], ["vodafone", "Vodafone", "media"], ["voltagent", "Voltagent", "ai"], ["warp", "Warp", "dev"], ["webflow", "Webflow", "dev"], ["wired", "WIRED", "media"], ["wise", "Wise", "finance"], ["x.ai", "xAI", "ai"], ["zapier", "Zapier", "saas"]
].map(([slug, name, categoryKey]) => ({ slug, name, categoryKey }));

const sections = [
  ["Visual Theme & Atmosphere", "视觉主题与氛围", "先定义页面的情绪、密度和设计哲学，决定它是安静、技术、温暖还是戏剧化。"],
  ["Color Palette & Roles", "颜色与语义角色", "不是只抄 Hex，而是说明颜色用于 CTA、正文、表面、状态还是装饰。"],
  ["Typography Rules", "字体与层级", "把字体、字号、字重、行高、字距和数字排版放进一套可执行层级。"],
  ["Component Stylings", "组件样式", "描述按钮、卡片、输入框、导航和状态，让 Agent 知道每个组件应该如何表现。"],
  ["Layout Principles", "布局原则", "记录容器、栅格、间距、留白和内容节奏，避免生成“组件堆在一起”的页面。"],
  ["Depth & Elevation", "深度与层级", "说明阴影、边框、表面反差和叠层如何建立空间，而不是盲目加阴影。"],
  ["Do's and Don'ts", "应该与禁止", "把设计意图变成护栏：哪些颜色应该克制，哪些形状和装饰不能出现。"],
  ["Responsive Behavior", "响应式行为", "定义断点、触控尺寸、折叠策略和移动端信息优先级。"],
  ["Agent Prompt Guide", "Agent 使用指南", "提供快速 Token 参考和可直接粘贴的 Agent 指令，连接设计文档与实际生成。"]
];

const $ = (selector) => document.querySelector(selector);
const featuredBySlug = new Map(featured.map((item) => [item.slug, item]));
let currentCategory = "all";
let currentBrand = "voltagent";
let currentSection = 0;

function escapeHtml(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
}

function createFilters() {
  $("#category-filters").innerHTML = categoryOrder.map((key) => `<button class="filter-button${key === currentCategory ? " is-active" : ""}" data-category="${key}" role="tab" aria-selected="${key === currentCategory}">${categoryLabels[key]}</button>`).join("");
  document.querySelectorAll(".filter-button").forEach((button) => button.addEventListener("click", () => {
    currentCategory = button.dataset.category;
    createFilters();
    renderCatalogList();
  }));
}

function renderCatalogList() {
  const filtered = currentCategory === "all" ? featured : featured.filter((item) => item.categoryKey === currentCategory);
  const visible = filtered.length ? filtered : featured;
  $("#visible-count").textContent = visible.length;
  $("#list-category").textContent = currentCategory === "all" ? "FEATURED" : categoryLabels[currentCategory].toUpperCase();
  $("#catalog-list-items").innerHTML = visible.map((item, index) => `<button class="catalog-item${item.slug === currentBrand ? " is-selected" : ""}" data-brand="${item.slug}"><span class="catalog-item-dot" style="--item-accent:${item.accent}"></span><span class="catalog-item-copy"><strong>${escapeHtml(item.name)}</strong><small>${escapeHtml(item.category)}</small></span><span class="catalog-item-arrow">${item.slug === currentBrand ? "●" : "↗"}</span></button>`).join("");
  document.querySelectorAll(".catalog-item").forEach((button) => button.addEventListener("click", () => {
    currentBrand = button.dataset.brand;
    renderCatalogList();
    renderInspector();
  }));
}

function renderInspector() {
  const brand = featuredBySlug.get(currentBrand) || featured[0];
  const index = String(featured.findIndex((item) => item.slug === brand.slug) + 1).padStart(2, "0");
  const inspector = $("#brand-inspector");
  inspector.style.setProperty("--brand-accent", brand.accent);
  inspector.style.setProperty("--brand-accent-soft", brand.accentSoft);
  inspector.style.setProperty("--brand-canvas", brand.canvas);
  inspector.style.setProperty("--brand-surface", brand.surface);
  inspector.style.setProperty("--brand-ink", brand.ink);
  inspector.style.setProperty("--brand-body", brand.body);
  $("#brand-index").textContent = index;
  $("#brand-name").textContent = brand.name;
  $("#brand-category").textContent = brand.category;
  $("#brand-description").textContent = brand.description;
  $("#brand-eyebrow").textContent = brand.eyebrow;
  $("#brand-headline").innerHTML = escapeHtml(brand.headline).replaceAll("\n", "<br />");
  $("#brand-body").textContent = brand.verdict;
  $("#brand-card-title").textContent = brand.cardTitle;
  $("#brand-radius").textContent = `radius / ${brand.radius}`;
  $("#brand-spacing").textContent = `spacing / ${brand.spacing}`;
  $("#brand-type").textContent = brand.type;
  $("#brand-type-detail").textContent = brand.typeDetail;
  $("#brand-verdict").textContent = brand.verdict;
  $("#brand-source").href = `https://github.com/VoltAgent/awesome-design-md/blob/main/design-md/${brand.slug}/DESIGN.md`;
  $("#brand-primary-button").textContent = brand.categoryKey === "retro" ? "PLAY IT ON" : "Primary action";
  $("#brand-swatches").innerHTML = brand.swatches.map((swatch) => `<span class="swatch-row"><i style="--swatch:${swatch.color}"></i><span>${swatch.name}</span><code>${swatch.color}</code></span>`).join("");
  $("#brand-signatures").innerHTML = brand.signatures.map((signature) => `<li>${escapeHtml(signature)}</li>`).join("");
}

function renderAtlas() {
  const groups = {};
  catalog.forEach((item) => { (groups[item.categoryKey] ||= []).push(item); });
  const groupOrder = ["ai", "dev", "saas", "finance", "infra", "media", "auto", "retro"];
  const labels = { ...categoryLabels, auto: "汽车", infra: "技术与基础设施" };
  $("#catalog-atlas-list").innerHTML = groupOrder.map((key) => `<div class="atlas-group"><span class="atlas-group-label">${labels[key]}</span><div class="atlas-names">${(groups[key] || []).map((item) => `<a href="https://github.com/VoltAgent/awesome-design-md/tree/main/design-md/${item.slug}" target="_blank" rel="noreferrer">${escapeHtml(item.name)} <sup>↗</sup></a>`).join("")}</div></div>`).join("");
}

function renderSections() {
  $("#section-list").innerHTML = sections.map(([english, chinese], index) => `<button class="section-row${index === currentSection ? " is-active" : ""}" data-section="${index}" role="listitem"><span class="section-number">0${index + 1}</span><span class="section-name"><strong>${chinese}</strong><small>${english}</small></span><span class="section-state">${index === currentSection ? "OPEN" : "↗"}</span></button>`).join("");
  $("#section-explainer").textContent = sections[currentSection][2];
  document.querySelectorAll(".section-row").forEach((button) => button.addEventListener("click", () => {
    currentSection = Number(button.dataset.section);
    renderSections();
  }));
}

async function copyPrompt() {
  const prompt = $("#prompt-text").textContent;
  try {
    await navigator.clipboard.writeText(prompt);
    $("#copy-status").textContent = "已复制到剪贴板 · 可粘贴给 Agent";
    $("#copy-prompt").classList.add("is-copied");
    setTimeout(() => $("#copy-prompt").classList.remove("is-copied"), 1600);
  } catch {
    $("#copy-status").textContent = "当前浏览器未授权剪贴板，请手动选择文字复制";
  }
}

function setupReveal() {
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add("is-visible"); }), { threshold: 0.12 });
  document.querySelectorAll("section, .anatomy-card, .flow-step, .boundary-card").forEach((element) => { element.classList.add("reveal"); observer.observe(element); });
}

createFilters();
renderCatalogList();
renderInspector();
renderAtlas();
renderSections();
$("#copy-prompt").addEventListener("click", copyPrompt);
setupReveal();
