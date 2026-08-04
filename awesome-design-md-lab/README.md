# Awesome DESIGN.md Lab · 中文能力档案馆

这是 `VoltAgent/awesome-design-md` 的资源型展示子项目，用中文解释它如何把公开网页的视觉规律整理成 Agent 可读取的 `DESIGN.md`。它的价值主要来自资料整理和 Agent 上下文样本，不代表一套自动生成技术。

- 固定上游快照：[提交 `8147538b`](https://github.com/VoltAgent/awesome-design-md/tree/8147538b4226ae41e2487a9179e3bcc1f68e8554)
- 上游项目：[VoltAgent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md)
- 在线研究展厅：[0801 GitHub Code Study](https://yydshly.github.io/0801_githubcode_study/)
- 关联生态入口：[EveryFeed](https://everyfeed.ai/)（上游 README 的推广/生态链接，不是本 Demo 的运行依赖）

## 这个 Demo 展示什么

- 上游快照中的 74 份 `DESIGN.md` 与类别分布；
- Stripe、Vercel、Linear、NVIDIA、Apple、Spotify、Nintendo 2001、Voltagent、Notion 等代表性风格；
- 每个案例的主色、表面、字体、圆角、布局和独特设计判断；
- `DESIGN.md` 的 YAML Token 层与 Markdown 语义层；
- 从公开网页观察，到 Agent 生成 UI 的完整工作链路；
- 可复制的中文 Agent 使用指令和上游文件入口。

页面中的品牌均为对公开视觉模式的独立研究展示，不代表相关品牌的官方设计系统，也不复制 Logo、图片或商业字体。

## 本地运行

这是一个无依赖静态网页。在项目根目录运行：

```powershell
python -m http.server 4181 --directory awesome-design-md-lab
```

然后打开 `http://127.0.0.1:4181/`。

## 研究结论

`awesome-design-md` 本身不是组件库、网页爬虫或运行时引擎。它是“设计分析资料 + 半结构化格式 + Agent 上下文”的组合：

```text
公开网页观察 → DESIGN.md → Agent 上下文 → CSS / 组件 / 页面代码 → 浏览器验证
```

网页提取、人工复核和设计 Token 编译是独立的工作层，不应与上游资料库混为一谈。

因此本项目在研究展厅中归类为“资源型子项目”：适合检索、对照和复用，不作为具有独立算法或运行时架构的核心技术项目。

验证记录见 [`VALIDATION.md`](./VALIDATION.md)，页面设计契约见 [`DESIGN_CONTRACT.md`](./DESIGN_CONTRACT.md)。
