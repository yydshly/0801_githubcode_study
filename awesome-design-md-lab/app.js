const researchCases = [
  {
    id: "linear",
    name: "Linear",
    domain: "linear.app",
    industry: "开发者工具",
    category: "dev",
    theme: "dark",
    accent: "#e4f222",
    onAccent: "#08090a",
    originalUrl: "https://linear.app",
    referoUrl: "https://styles.refero.design/style/90ce5883-bb24-4466-93f7-801cd617b0d1",
    image: "./assets/references/linear-refero.jpg",
    sourceImage: "https://images.refero.design/styles/refero.design/image/17d8b2ae-d82e-461d-a94b-bc5054836305.jpg",
    elementCount: "2,469",
    northStar: "midnight precision instrument",
    thesis: "它不是靠“黑色 + 发光”获得高级感，而是用低亮度表面阶梯、紧凑字体和产品截图建立精密工具的可信度。",
    palette: [
      ["Void", "#08090a"], ["Carbon", "#0f1011"], ["Graphite", "#23252a"], ["Fog", "#8a8f98"], ["Paper", "#f7f8f8"], ["Acid", "#e4f222"]
    ],
    fonts: "Inter Variable / Berkeley Mono",
    observations: [
      "页面以 #08090a 附近的近黑色为底，卡片和边界只做小幅明度抬升。",
      "主要视觉资产是 Linear 自己的产品界面，而不是摄影或抽象插画。",
      "高饱和酸柠檬色集中在少量主操作，正文和多数控件保持灰阶。"
    ],
    uncertainties: [
      "单次桌面截图不能证明所有断点、悬停和焦点状态都遵循同一规则。",
      "Refero 给出的具体字重与组件数值是反向观察，不等于 Linear 内部官方 Token。"
    ],
    lenses: [
      ["COMPOSITION / 构图", "左侧大标题与大幅产品证据形成低密度、单焦点区块。", "每个视口只安排一个产品证明，不要用三列功能卡抢走主视觉。"],
      ["HIERARCHY / 层级", "亮色 CTA 面积很小，但与暗色环境形成最强对比。", "主操作可使用唯一高彩度；次级操作只用文字或发丝边框。"],
      ["TYPE / 字体", "大字号仍保持中等字重与负字距，元数据切换到等宽字体。", "标题不要默认 700+；将编号、快捷键、Issue ID 放进 mono 角色。"],
      ["COLOR / 颜色", "深色表面通过 3–4 个相邻明度建立空间，而不是不同色相。", "先定义 canvas/surface/elevated/border，再决定唯一强调色。"],
      ["MATERIAL / 材质", "0.5–1px 边界和轻微表面差替代大阴影与厚玻璃。", "避免全页 glassmorphism；只有需要交互边界的位置才出现线。"],
      ["INTERACTION / 交互", "紧凑按钮、状态 pill 和产品 UI 让页面保持工具感。", "反馈要短、直接、可键盘操作，不用长距离动效制造“未来感”。"]
    ],
    tokens: { canvas: "#08090a", surface: "#0f1011", text: "#f7f8f8", muted: "#8a8f98", accent: "#e4f222", radius: "6px controls / 12px cards", spacing: "8px base / 96px section", maxWidth: "1200px" },
    components: [
      ["Primary action", "酸柠檬色填充、6px 圆角、中等字重；同一视口只出现一个。"],
      ["Product proof", "真实产品截图置于发丝边框容器，产品界面本身承担视觉纹理。"],
      ["Metadata", "12–14px 等宽字体、低对比灰色，用于编号、快捷键和状态。"]
    ],
    dos: ["让产品截图成为主要视觉证据", "用表面明度差建立层级", "控制强调色出现频率"],
    donts: ["不要把每张卡都做成发光玻璃", "不要使用多个霓虹色", "不要用超粗标题替代层级设计"]
  },
  {
    id: "stripe",
    name: "Stripe",
    domain: "stripe.com",
    industry: "金融基础设施",
    category: "finance",
    theme: "light",
    accent: "#533afd",
    onAccent: "#ffffff",
    originalUrl: "https://stripe.com",
    referoUrl: "https://styles.refero.design/style/48e5de76-05d5-4c4e-a269-c7c245b291ec",
    image: "./assets/references/stripe-refero.jpg",
    sourceImage: "https://images.refero.design/styles/refero.design/image/554c3193-2b35-4f64-968e-d18f6520f442.jpg",
    elementCount: "1,599",
    northStar: "indigo-ink ledger on frosted glass",
    thesis: "Stripe 的可信度来自轻字重、长呼吸节奏和单一靛蓝语义，而不是把金融界面做得沉重。",
    palette: [
      ["Midnight", "#061b31"], ["Indigo", "#533afd"], ["Hover", "#7389ff"], ["Slate", "#64748d"], ["Mist", "#f8fafd"], ["White", "#ffffff"]
    ],
    fonts: "Söhne Variable（替代建议：Inter Tight）",
    observations: [
      "浅色画布占据大部分面积，靛蓝主要用于按钮、链接与线性图标。",
      "大标题保持 300–400 的轻字重，并随着字号增大逐步收紧字距。",
      "卡片和按钮几乎不依赖阴影，区域差异来自淡色表面与留白。"
    ],
    uncertainties: [
      "公开截图中出现的地区化文案和组件不一定代表 Stripe 全部产品页面。",
      "具体字体文件与内部排版变量属于品牌资产，研究实现应使用可授权替代字体。"
    ],
    lenses: [
      ["COMPOSITION / 构图", "文字主导，首屏不依赖巨大产品图；长页面用稳定区块节奏推进。", "让标题和说明承担首屏任务，把产品证据放到下一层，而不是塞进 Hero。"],
      ["HIERARCHY / 层级", "标题、正文、链接通过字重和颜色克制区分。", "优先调整字号、行长和留白，最后才添加容器或装饰。"],
      ["TYPE / 字体", "轻字重的大标题通过紧字距获得张力。", "选择高 x-height 的人文无衬线；标题不使用粗黑，正文行宽控制在 60–65 字符。"],
      ["COLOR / 颜色", "一个靛蓝承担操作语义，其余是冷白、深蓝与雾灰。", "把强调色限制在 action/link/icon 三种角色，正文不用品牌紫。"],
      ["MATERIAL / 材质", "4px 圆角、1px 淡边界和轻微底色形成“金融工具”精度。", "不使用大圆角和厚阴影；表面变化应比边框更先出现。"],
      ["INTERACTION / 交互", "主次按钮只靠填充与描边区分，动作语言清楚。", "为链接保留一致方向提示和焦点状态，避免把所有链接做成按钮。"]
    ],
    tokens: { canvas: "#ffffff", surface: "#f8fafd", text: "#061b31", muted: "#64748d", accent: "#533afd", radius: "4px", spacing: "8px base / 96px section", maxWidth: "1320px" },
    components: [
      ["Primary button", "靛蓝填充、白色文字、4px 圆角；没有阴影。"],
      ["Secondary button", "透明底、淡紫边框、靛蓝文字，边框权重低于文字。"],
      ["Editorial section", "小型标签 + 32–48px 标题 + 舒适正文 + 低密度视觉证据。"]
    ],
    dos: ["使用轻字重和紧字距建立权威", "用冷白表面替代阴影", "保持单一靛蓝操作语义"],
    donts: ["不要给卡片增加漂浮阴影", "不要用 16px 以上大圆角", "不要把多个彩色渐变当作默认背景"]
  },
  {
    id: "vercel",
    name: "Vercel",
    domain: "vercel.com",
    industry: "开发者平台",
    category: "dev",
    theme: "light",
    accent: "#ffffff",
    onAccent: "#111111",
    originalUrl: "https://vercel.com",
    referoUrl: "https://styles.refero.design/style/f24daf3a-d43f-4dec-85a9-8ac1d5148a03",
    image: "./assets/references/vercel-refero.jpg",
    sourceImage: "https://images.refero.design/styles/refero.design/image/c6136f5d-0537-4be5-aea3-7a81341d41e8.jpg",
    elementCount: "519",
    northStar: "Typeset terminal on white paper",
    thesis: "Vercel 不是“没有设计”，而是把品牌识别压缩到黑白对比、Geist 字体、网格和极少数几何符号中。",
    palette: [
      ["Black", "#000000"], ["Ink", "#171717"], ["Graphite", "#535353"], ["Smoke", "#8f8f8f"], ["Hairline", "#ebebeb"], ["Paper", "#fafafa"]
    ],
    fonts: "Geist Sans / Geist Mono",
    observations: [
      "页面保持近乎完整的黑白灰系统，色彩并非主要区分手段。",
      "正文、标签、代码和元数据通过 Geist Sans 与 Geist Mono 分工。",
      "组件边界、栅格线和空白共同建立精确感，圆角控制在小尺寸。"
    ],
    uncertainties: [
      "Vercel 首页会频繁迭代，某次样例更接近营销活动快照而不是永久规范。",
      "黑白系统对内容、焦点和错误状态的要求更高，单张截图无法覆盖这些语义色。"
    ],
    lenses: [
      ["COMPOSITION / 构图", "大标题、几何标记和产品片段被放入清晰网格。", "先建立列线与内容对齐，再决定是否需要卡片。"],
      ["HIERARCHY / 层级", "主要对比来自字号、黑白反转和区域位置。", "不要依赖彩色 CTA；通过黑色填充、文字密度和空间优先级表达主次。"],
      ["TYPE / 字体", "Sans 负责叙事，Mono 负责技术事实。", "为日志、代码、状态、时间和数据定义独立 mono token。"],
      ["COLOR / 颜色", "黑白灰仍然包含多级语义：正文、弱化、边界、填充和反转。", "至少建立 5 级中性色，不要把所有灰都压成一个 #666。"],
      ["MATERIAL / 材质", "发丝网格、6px 圆角和无阴影表面保持纸面与终端感。", "用边界和反转构造组件，不用玻璃模糊。"],
      ["INTERACTION / 交互", "按钮、命令行和代码片段都强调直接结果。", "交互文案使用动词；复制、部署、打开等状态必须立即反馈。"]
    ],
    tokens: { canvas: "#fafafa", surface: "#ffffff", text: "#171717", muted: "#666666", accent: "#000000", radius: "6px", spacing: "4px base / 96–128px section", maxWidth: "1280px" },
    components: [
      ["Primary button", "纯黑填充、白色文字、6px 圆角。"],
      ["Technical panel", "1px #ebebeb 边框，Mono 标签，内容区域保持白色。"],
      ["Grid section", "明确列线与 16–24px gap，让信息对齐而不是漂浮。"]
    ],
    dos: ["让网格和排版承担品牌识别", "为技术信息保留 Mono 角色", "完整设计灰阶语义"],
    donts: ["不要为单调而随意加入彩色渐变", "不要用阴影修补不清晰的布局", "不要把黑白理解成只有两个颜色值"]
  },
  {
    id: "spotify",
    name: "Spotify",
    domain: "spotify.com",
    industry: "内容与媒体",
    category: "media",
    theme: "dark",
    accent: "#1ed760",
    onAccent: "#0a0a0a",
    originalUrl: "https://spotify.com",
    referoUrl: "https://styles.refero.design/style/1514a95f-878c-4d4d-bb14-99d1b83f6227",
    image: "./assets/references/spotify-refero.jpg",
    sourceImage: "https://images.refero.design/styles/refero.design/image/44f8eaf0-cded-4660-9d62-3c296f86a4bc.jpg",
    elementCount: "1,427",
    northStar: "Nocturnal jukebox control room",
    thesis: "Spotify 的黑色界面不是视觉主角，而是一间让封面、艺人和播放状态发光的“内容房间”。",
    palette: [
      ["Black", "#000000"], ["Carbon", "#121212"], ["Graphite", "#1f1f1f"], ["Smoke", "#292929"], ["Mist", "#b3b3b3"], ["Green", "#1ed760"]
    ],
    fonts: "SpotifyMixUI / SpotifyMixUITitle（替代建议：Inter）",
    observations: [
      "页面和内容表面使用多层近黑色，文本只分白色与灰色两级主层。",
      "Spotify Green 主要承担播放、主操作和 active 状态。",
      "内容封面和人物照片提供大多数色彩，界面本身保持低彩度。"
    ],
    uncertainties: [
      "营销首页与播放器产品界面的信息密度和组件体系并不完全相同。",
      "封面和艺人图片属于内容资产，不能被当作通用品牌色板。"
    ],
    lenses: [
      ["COMPOSITION / 构图", "内容网格与横向轨道比品牌装饰更重要。", "让封面尺寸与节奏决定布局，导航和操作退居固定轨道。"],
      ["HIERARCHY / 层级", "白色标题、灰色元数据和绿色操作形成三段优先级。", "不要给每个内容块描边；使用文字层级和 hover 表面表达可操作性。"],
      ["TYPE / 字体", "大标题大胆，但列表与元数据保持紧凑、清楚。", "内容标题 14–16px，中等字重；辅助信息使用灰色和正常字重。"],
      ["COLOR / 颜色", "黑色是背景，绿色是动作，内容图片是情绪。", "UI 不从封面动态抽取过多色彩；动作色保持一致才能建立肌肉记忆。"],
      ["MATERIAL / 材质", "6px 内容圆角与全圆操作控件建立两种形状语义。", "内容卡与操作按钮使用不同 radius family，不要混用。"],
      ["INTERACTION / 交互", "播放是绝对主动作，其他操作保持弱化。", "每个内容对象只保留一个显著动作，并让播放状态持续可见。"]
    ],
    tokens: { canvas: "#000000", surface: "#121212", text: "#ffffff", muted: "#b3b3b3", accent: "#1ed760", radius: "6px content / 9999px actions", spacing: "8px base / compact content grid", maxWidth: "fluid content stage" },
    components: [
      ["Primary action", "白色或绿色 pill，文字高对比，明确指向播放或注册。"],
      ["Content card", "6px 封面圆角；标题和作者形成两行信息层级。"],
      ["Artist card", "圆形内容图片承担识别，外围不再增加装饰容器。"]
    ],
    dos: ["让内容资产提供色彩", "保持播放动作唯一且稳定", "区分内容圆角与操作圆角"],
    donts: ["不要用厚阴影做层级", "不要把绿色撒到装饰元素", "不要让界面 chrome 抢过内容"]
  },
  {
    id: "wise",
    name: "Wise",
    domain: "wise.com",
    industry: "金融科技",
    category: "finance",
    theme: "light",
    accent: "#9fe870",
    onAccent: "#163300",
    originalUrl: "https://wise.com",
    referoUrl: "https://styles.refero.design/style/367c0c6e-73a7-441c-a8ff-91d139ac60dc",
    image: "./assets/references/wise-refero.jpg",
    sourceImage: "https://images.refero.design/styles/refero.design/image/f852eefd-bcc6-4dd4-ab31-e3170c2c98b5.jpg",
    elementCount: "2,650",
    northStar: "deep moss with lime voltage",
    thesis: "Wise 的辨识度不是单靠荧光绿，而是森林绿、超重展示字、胶囊控件和明暗区块反转共同形成的品牌语法。",
    palette: [
      ["Forest", "#163300"], ["Lime", "#9fe870"], ["Spruce", "#054d28"], ["Linen", "#e2f6d5"], ["Charcoal", "#454745"], ["White", "#ffffff"]
    ],
    fonts: "Wise Sans / Inter（展示字可用 Inter Black 替代）",
    observations: [
      "森林绿承担文本与暗色区块，荧光绿承担主操作和少量高亮。",
      "展示标题使用极重字重和紧字距，与普通正文形成强烈角色差。",
      "按钮、导航段和标签大量使用胶囊形状，卡片则保留较小圆角。"
    ],
    uncertainties: [
      "Wise Sans 与插画属于品牌资产，研究实现必须寻找可授权替代方案。",
      "不同国家站点的内容和合规模块可能改变页面节奏。"
    ],
    lenses: [
      ["COMPOSITION / 构图", "超大中心标题和大幅品牌插画先建立情绪，功能内容随后进入。", "品牌型产品可以让一个强叙事对象占据首屏，不要同时展示所有功能。"],
      ["HIERARCHY / 层级", "超重标题、森林绿正文和荧光绿动作形成清楚三角。", "将品牌强调分配给标题形态与 CTA，不要让正文也持续高声量。"],
      ["TYPE / 字体", "展示字与 UI 字是两套明确角色。", "大标题使用 900 字重与紧行高；表单、导航和正文回到 400–600。"],
      ["COLOR / 颜色", "森林绿提供重量，荧光绿提供能量，浅绿承担低频表面。", "对每种绿指定明确角色，并检查荧光绿文字的对比度。"],
      ["MATERIAL / 材质", "pill 是交互语法，10px 卡片是内容语法，大形状属于插画。", "建立 radius family，而不是全站统一一个圆角。"],
      ["INTERACTION / 交互", "分段导航、主要 CTA 与国家选择都强调触摸友好。", "保证 pill 的点击区域和 focus ring 足够明显，不依赖颜色单独表达选中。"]
    ],
    tokens: { canvas: "#ffffff", surface: "#e2f6d5", text: "#163300", muted: "#454745", accent: "#9fe870", radius: "9999px actions / 10px cards", spacing: "8–12px element / 64–80px section", maxWidth: "1200px" },
    components: [
      ["Primary CTA", "荧光绿 pill、森林绿文字、无阴影。"],
      ["Segmented nav", "胶囊容器内清晰选中态，同时保留文字与形状提示。"],
      ["Brand section", "白、浅绿、森林绿整段反转，用色块节奏替代装饰分隔。"]
    ],
    dos: ["让森林绿和荧光绿承担不同职责", "保留展示字与 UI 字角色差", "建立两套圆角语义"],
    donts: ["不要把荧光绿直接用于长文本", "不要随意加入渐变阴影", "不要把所有组件都做成胶囊"]
  },
  {
    id: "mercury",
    name: "Mercury",
    domain: "mercury.com",
    industry: "金融科技",
    category: "finance",
    theme: "dark",
    accent: "#5266eb",
    onAccent: "#ffffff",
    originalUrl: "https://mercury.com",
    referoUrl: "https://styles.refero.design/style/3172cd4d-118a-4a16-a259-6b634d32322e",
    image: "./assets/references/mercury-refero.jpg",
    sourceImage: "https://images.refero.design/styles/refero.design/image/f5e7b964-aab6-4d9c-b1f6-96565ddde880.jpg",
    elementCount: "1,120",
    northStar: "Alpine banking at blue hour",
    thesis: "Mercury 把银行产品放进电影化夜景中：氛围摄影负责愿景，石墨表面负责产品，钴蓝只负责转化。",
    palette: [
      ["Onyx", "#171721"], ["Graphite", "#1e1e2a"], ["Obsidian", "#272735"], ["Ash", "#c3c3cc"], ["Ivory", "#ededf3"], ["Cobalt", "#5266eb"]
    ],
    fonts: "Arcadia / Arcadia Display（替代建议：Inter / Söhne Breit）",
    observations: [
      "首屏使用全幅低饱和摄影与暗色遮罩，产品内容进入后仍保持暗色环境。",
      "卡片主要依靠 #171721 到 #1e1e2a 的明度抬升，而不是阴影。",
      "钴蓝集中在开户等主要转化动作，次级控件使用象牙白描边或深色填充。"
    ],
    uncertainties: [
      "摄影氛围很强，但它属于内容策略而非所有金融产品都能复用的 UI 规则。",
      "自定义中间字重是品牌字体能力，替代字体可能无法完全复现其克制感。"
    ],
    lenses: [
      ["COMPOSITION / 构图", "全幅摄影 Hero 建立愿景，1200px 内容区随后承载产品。", "将情绪资产与产品证据分层，不要把 UI 截图直接叠满 Hero。"],
      ["HIERARCHY / 层级", "居中标题与唯一钴蓝 CTA 构成首屏主线。", "每页只给一个转化动作品牌色，次级动作退到描边或文本。"],
      ["TYPE / 字体", "标题停在 480–530 的中间字重，避免传统金融的沉重感。", "替代实现中优先调字宽、字距与行高，不要直接换成 700。"],
      ["COLOR / 颜色", "近黑、石墨、象牙白和钴蓝形成低彩度夜景。", "暗色模式先设计表面阶梯，再设置主文本、弱文本与边界。"],
      ["MATERIAL / 材质", "12px 卡片、32px 控件和轻微 backdrop blur 建立柔和精度。", "只在悬浮导航使用模糊；普通卡片通过色阶分层。"],
      ["INTERACTION / 交互", "pill 控件弱化金融工具的硬度，CTA 保持清晰。", "按钮、输入框和导航共享圆润语法，但结构容器仍保留较小圆角。"]
    ],
    tokens: { canvas: "#171721", surface: "#1e1e2a", text: "#ededf3", muted: "#c3c3cc", accent: "#5266eb", radius: "12px cards / 32–40px controls", spacing: "12px element / 72px section", maxWidth: "1200px" },
    components: [
      ["Primary CTA", "钴蓝填充、白色文字、32px pill；同一页面只有一个主转化。"],
      ["Graphite card", "#1e1e2a、12px 圆角、32px 内边距，不使用阴影。"],
      ["Transparent nav", "首屏透明覆盖，滚动后用暗色和轻微 backdrop blur 建立分离。"]
    ],
    dos: ["把摄影作为愿景层而不是组件背景", "使用中间字重保持克制", "通过表面色阶建立深度"],
    donts: ["不要加入多个亮色强调", "不要给每张暗色卡片加阴影", "不要让结构容器也全部变成 pill"]
  }
];

const filters = [
  ["all", "全部"],
  ["dark", "暗色系统"],
  ["light", "浅色系统"],
  ["finance", "金融"],
  ["dev", "开发者工具"],
  ["media", "内容媒体"]
];

const state = { filter: "all", caseId: "linear", view: "evidence" };
const $ = (selector) => document.querySelector(selector);

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function visibleCases() {
  if (state.filter === "all") return researchCases;
  if (state.filter === "dark" || state.filter === "light") return researchCases.filter((item) => item.theme === state.filter);
  return researchCases.filter((item) => item.category === state.filter);
}

function currentCase() {
  return researchCases.find((item) => item.id === state.caseId) || researchCases[0];
}

function renderFilters() {
  $("#case-filters").innerHTML = filters.map(([key, label]) => `
    <button type="button" role="tab" data-filter="${key}" aria-selected="${state.filter === key}">${label}</button>
  `).join("");

  document.querySelectorAll("[data-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      state.filter = button.dataset.filter;
      const list = visibleCases();
      if (!list.some((item) => item.id === state.caseId)) state.caseId = list[0].id;
      renderFilters();
      renderCaseList();
      renderCase();
    });
  });
}

function renderCaseList() {
  const list = visibleCases();
  const label = filters.find(([key]) => key === state.filter)?.[1] || "全部";
  $("#rail-category").textContent = label;
  $("#visible-case-count").textContent = list.length;
  $("#case-list").innerHTML = list.map((item) => `
    <button type="button" data-case="${item.id}" aria-current="${item.id === state.caseId}" style="--case-accent:${item.accent}">
      <span class="case-dot" aria-hidden="true"></span>
      <span><strong>${escapeHtml(item.name)}</strong><small>${escapeHtml(item.industry)}</small></span>
      <span class="case-theme">${item.theme.toUpperCase()}</span>
    </button>
  `).join("");

  document.querySelectorAll("[data-case]").forEach((button) => {
    button.addEventListener("click", () => {
      state.caseId = button.dataset.case;
      state.view = "evidence";
      renderCaseList();
      renderCase();
      if (window.matchMedia("(max-width: 820px)").matches) $("#case-detail").scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function renderCase() {
  const item = currentCase();
  const index = String(researchCases.findIndex((entry) => entry.id === item.id) + 1).padStart(2, "0");
  const detail = $("#case-detail");
  detail.style.setProperty("--case-accent", item.accent);
  detail.style.setProperty("--case-on-accent", item.onAccent);

  $("#case-index").textContent = `CASE ${index} · ${item.industry.toUpperCase()}`;
  $("#case-name").textContent = item.name;
  $("#case-thesis").textContent = item.thesis;
  $("#evidence-domain").textContent = item.domain;
  $("#capture-meta").textContent = `${item.elementCount} elements · researched 2026-08-05`;
  $("#original-link").href = item.originalUrl;
  $("#refero-link").href = item.referoUrl;

  const image = $("#case-image");
  const fallback = $("#image-fallback");
  image.hidden = false;
  fallback.hidden = true;
  image.alt = `${item.name} 原始网页的 Refero 研究截图`;
  image.onload = () => { image.hidden = false; fallback.hidden = true; };
  image.onerror = () => { image.hidden = true; fallback.hidden = false; };
  image.src = item.image;

  document.querySelectorAll("[data-view]").forEach((button) => {
    button.setAttribute("aria-selected", String(button.dataset.view === state.view));
    button.onclick = () => {
      state.view = button.dataset.view;
      renderCaseView();
      document.querySelectorAll("[data-view]").forEach((tab) => tab.setAttribute("aria-selected", String(tab.dataset.view === state.view)));
    };
  });
  renderCaseView();
}

function swatches(item) {
  return item.palette.map(([name, color]) => `
    <div class="swatch" style="--swatch:${color}"><i></i><span>${escapeHtml(name)}</span><code>${color}</code></div>
  `).join("");
}

function list(items) {
  return `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
}

function renderEvidenceView(item) {
  return `
    <div class="view-heading"><h4>先保存事实，再开始解释</h4><span>EVIDENCE · SOURCE · LIMITS</span></div>
    <div class="evidence-grid">
      <section class="research-panel">
        <h5>OBSERVED / 可观察证据</h5>
        ${list(item.observations)}
      </section>
      <section class="research-panel">
        <h5>SOURCE CHAIN / 来源关系</h5>
        <div class="source-list">
          <a href="${item.originalUrl}" target="_blank" rel="noreferrer"><span>ORIGINAL</span><strong>${escapeHtml(item.originalUrl)}</strong></a>
          <a href="${item.referoUrl}" target="_blank" rel="noreferrer"><span>REFERO</span><strong>${escapeHtml(item.referoUrl)}</strong></a>
          <a href="${item.sourceImage}" target="_blank" rel="noreferrer"><span>CAPTURE SOURCE</span><strong>Refero public screenshot asset</strong></a>
          <a href="${item.image}" target="_blank" rel="noreferrer"><span>LOCAL COPY</span><strong>${escapeHtml(item.image.replace("./", ""))}</strong></a>
        </div>
      </section>
      <section class="research-panel">
        <h5>RAW PROFILE / 样例档案</h5>
        <dl class="meta-list">
          <div class="meta-row"><dt>viewport</dt><dd>1440 × 900</dd></div>
          <div class="meta-row"><dt>element count</dt><dd>${item.elementCount}</dd></div>
          <div class="meta-row"><dt>theme</dt><dd>${item.theme}</dd></div>
          <div class="meta-row"><dt>font roles</dt><dd>${escapeHtml(item.fonts)}</dd></div>
          <div class="meta-row"><dt>Refero phrase</dt><dd>${escapeHtml(item.northStar)}</dd></div>
        </dl>
      </section>
      <section class="research-panel">
        <h5>PALETTE / 公开样例色板</h5>
        <div class="swatch-strip">${swatches(item)}</div>
      </section>
      <section class="research-panel">
        <h5>UNCERTAIN / 仍然不能确定</h5>
        ${list(item.uncertainties)}
      </section>
      <section class="research-panel">
        <h5>EVIDENCE RULE / 证据规则</h5>
        <p>截图能证明“这一次页面如何呈现”，不能自动证明品牌永久规范。需要将可见事实、第三方解释和我们的实现建议分别保存。</p>
      </section>
    </div>
  `;
}

function renderAnalysisView(item) {
  return `
    <div class="view-heading"><h4>用六个维度复核第三方判断</h4><span>REFERENCE VS. OUR REVIEW</span></div>
    <div class="analysis-summary">
      <div><span>REFERO NORTH STAR</span><blockquote>“${escapeHtml(item.northStar)}”</blockquote></div>
      <div><span>OUR THESIS</span><p>${escapeHtml(item.thesis)}</p></div>
    </div>
    <div class="lens-list">
      ${item.lenses.map(([label, evidence, translation]) => `
        <div class="lens-row">
          <h5>${escapeHtml(label)}</h5>
          <div><strong>我们看到什么</strong><p>${escapeHtml(evidence)}</p></div>
          <div><strong>如何转译</strong><p>${escapeHtml(translation)}</p></div>
        </div>
      `).join("")}
    </div>
  `;
}

function implementationBrief(item) {
  return `请基于以下设计方法实现一个全新的产品界面，不复制 ${item.name} 的品牌名称、Logo、图片或商业字体。

设计方向：${item.thesis}

基础 Token：
- canvas: ${item.tokens.canvas}
- surface: ${item.tokens.surface}
- text: ${item.tokens.text}
- muted: ${item.tokens.muted}
- accent: ${item.tokens.accent}
- radius: ${item.tokens.radius}
- spacing: ${item.tokens.spacing}
- max-width: ${item.tokens.maxWidth}

组件规则：
${item.components.map(([name, rule]) => `- ${name}: ${rule}`).join("\n")}

必须做到：
${item.dos.map((rule) => `- ${rule}`).join("\n")}

禁止：
${item.donts.map((rule) => `- ${rule}`).join("\n")}

验收：桌面与 390px 手机均保持清楚层级；主操作可键盘访问；不要用额外卡片、渐变或阴影填充空白。`;
}

function renderImplementationView(item) {
  const tokenRows = Object.entries(item.tokens).map(([key, value]) => `<div class="token-row"><code>--${key}</code><span>${escapeHtml(value)}</span></div>`).join("");
  return `
    <div class="view-heading"><h4>复用方法，不复制品牌</h4><span>TOKENS · COMPONENTS · AGENT BRIEF</span></div>
    <div class="implementation-grid">
      <div class="deliverable-summary" aria-label="当前案例实现包内容">
        <article><span>08 TOKENS</span><strong>基础设计变量</strong><p>颜色、表面、圆角、间距与内容宽度</p></article>
        <article><span>${String(item.components.length).padStart(2, "0")} RULES</span><strong>组件语义规则</strong><p>主操作、内容证据和元数据如何工作</p></article>
        <article><span>01 BRIEF</span><strong>可复制实现简报</strong><p>包含适配边界、禁止项和响应式验收</p></article>
      </div>
      <section class="research-panel">
        <h5>STARTER TOKENS / 起始变量</h5>
        <div class="token-table">${tokenRows}</div>
      </section>
      <section class="research-panel">
        <h5>COMPONENT RULES / 组件翻译</h5>
        <div class="component-rules">
          ${item.components.map(([name, rule]) => `<div class="component-rule"><strong>${escapeHtml(name)}</strong><p>${escapeHtml(rule)}</p></div>`).join("")}
        </div>
      </section>
      <div class="rule-columns">
        <section class="rule-column do"><h5>DO / 应该</h5>${list(item.dos)}</section>
        <section class="rule-column dont"><h5>DON'T / 禁止</h5>${list(item.donts)}</section>
      </div>
      <section class="research-panel">
        <h5>ADAPTATION / 适配原则</h5>
        <p>保留的是构图、层级、字体角色、颜色纪律和组件语义。必须替换品牌名、Logo、商业字体、摄影和原始文案，并根据自己的业务重新验证对比度与响应式。</p>
      </section>
      <section class="prompt-panel">
        <div class="prompt-toolbar"><span>agent-implementation-brief.md</span><button type="button" class="copy-button" id="copy-brief">复制实现简报</button></div>
        <pre id="implementation-brief">${escapeHtml(implementationBrief(item))}</pre>
      </section>
    </div>
  `;
}

function renderCaseView() {
  const item = currentCase();
  const renderers = { evidence: renderEvidenceView, analysis: renderAnalysisView, implementation: renderImplementationView };
  $("#case-view").innerHTML = renderers[state.view](item);
  const copyButton = $("#copy-brief");
  if (copyButton) copyButton.addEventListener("click", () => copyBrief(item));
}

async function copyBrief(item) {
  const text = implementationBrief(item);
  const toast = $("#copy-toast");
  try {
    await navigator.clipboard.writeText(text);
    toast.textContent = `${item.name} 实现简报已复制，可直接交给 Codex。`;
  } catch {
    toast.textContent = "浏览器未授权剪贴板，请手动选择简报文字复制。";
  }
  toast.classList.add("is-visible");
  window.setTimeout(() => toast.classList.remove("is-visible"), 2200);
}

function setupReveal() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll(".method-track, .method-boundary, .case-workspace, .model-table, .source-ledger").forEach((element) => {
    element.classList.add("reveal");
    observer.observe(element);
  });
}

renderFilters();
renderCaseList();
renderCase();
setupReveal();

function alignHashTarget() {
  if (!window.location.hash) return;
  const target = document.querySelector(window.location.hash);
  if (!target) return;
  target.scrollIntoView({ block: "start", behavior: "auto" });
}

function queueHashAlignment() {
  alignHashTarget();
  requestAnimationFrame(() => requestAnimationFrame(alignHashTarget));
  window.setTimeout(alignHashTarget, 160);
}

if ("scrollRestoration" in history) history.scrollRestoration = "manual";
if (document.readyState === "complete") queueHashAlignment();
else window.addEventListener("load", queueHashAlignment);
window.addEventListener("hashchange", queueHashAlignment);
