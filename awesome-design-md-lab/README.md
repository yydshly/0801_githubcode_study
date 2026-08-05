# DESIGN.md Evidence Lab · 真实网页设计研究

这是一个把 `VoltAgent/awesome-design-md` 与 [Refero Styles](https://styles.refero.design/) 放进同一条证据链的设计研究子项目。页面从原始网站出发，对照 Refero 的公开样例，再用统一六维框架复核，最后把判断翻译成 Agent 可执行的 Token、组件规则与实现简报。它不是 URL 转 Markdown 服务，也不代表一套自动生成技术。

> 归档状态：阶段归档（2026-08-05）。当前版本完成了“来源关联 → 六维复核 → 实现翻译 → 浏览器验证”的首个闭环，后续作为设计知识积累与复用机制的研究基线继续演进。

- 固定上游快照：[提交 `8147538b`](https://github.com/VoltAgent/awesome-design-md/tree/8147538b4226ae41e2487a9179e3bcc1f68e8554)
- 上游项目：[VoltAgent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md)
- 原始样例索引：[Refero Styles](https://styles.refero.design/)
- 在线研究展厅：[0801 GitHub Code Study](https://yydshly.github.io/0801_githubcode_study/)
- 关联生态入口：[EveryFeed](https://everyfeed.ai/)（上游 README 的推广/生态链接，不是本 Demo 的运行依赖）
- 阶段归档说明：[ARCHIVE.md](./ARCHIVE.md)

## Revision 3 展示什么

- Linear、Stripe、Vercel、Spotify、Wise、Mercury 六个真实网站案例；
- 每个案例的原始网站、Refero 样例页与公开截图来源；
- “原始证据 / 我们的分析 / 实现翻译”三层研究视图；
- 构图、层级、字体、颜色、材质、交互六维复核框架；
- Token、组件规则、Do / Don't 与可复制的 Agent 实现简报；
- 对可观察事实、第三方解释、我们的推断和未知项的明确区分。

## Revision 4 优化重点

- 首屏直接展示“证据地图、设计模型、实现简报”三类最终成果；
- 新增六案例跨案例结论，沉淀颜色预算、产品证据、表面阶梯和字体角色四条可迁移纪律；
- 新增六案例设计机制比较矩阵，比较设计决策而不是视觉相似度；
- 实现视图增加交付成果摘要，让 Token、组件规则和 Agent 简报的关系更清楚；
- 修正长页锚点与粘性导航的落位，优化桌面、平板和手机阅读密度。

## Revision 5 证据图稳定性

六张 Refero 公开案例截图已保存为未改动的本地研究副本，页面默认加载 `assets/references/`，不再依赖外部 CDN 热链。证据视图仍同时保留 Refero 原始截图 URL、本地副本路径、原始网站和 Refero 样例页。完整来源清单见 [`assets/references/SOURCES.md`](./assets/references/SOURCES.md)。

页面中的品牌均为对公开视觉模式的独立研究展示，不代表相关品牌的官方设计系统，也不复制 Logo、图片或商业字体。

## 本地运行

这是一个无依赖静态网页。在项目根目录运行：

```powershell
python -m http.server 4181 --directory awesome-design-md-lab
```

然后打开 `http://127.0.0.1:4181/`。

## 研究结论

`awesome-design-md` 与 Refero 都不应被误解为本项目中的公开网页转换服务。它们在这里提供“设计分析资料 + 结构化样例 + Agent 上下文”，我们的研究层负责复核和实现翻译：

```text
原始网页 → Refero / DESIGN.md 样例 → 六维复核 → Token / 组件规则 → 页面实现 → 浏览器验证
```

网页提取、人工复核和设计 Token 编译是独立的工作层，不应与上游资料库混为一谈。

因此本项目在研究展厅中归类为“资源型子项目”：适合检索、对照和复用，不作为具有独立算法或运行时架构的核心技术项目。

验证记录见 [`VALIDATION.md`](./VALIDATION.md)，页面设计契约见 [`DESIGN_CONTRACT.md`](./DESIGN_CONTRACT.md)。
