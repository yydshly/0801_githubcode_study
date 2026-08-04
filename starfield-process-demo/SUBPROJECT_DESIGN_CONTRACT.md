# Three.js Graphics Agent Skills 研究子项目设计契约

## Revision 01 — 子项目正式整理

- **Entry mode**：Revision-led
- **Request revision**：把现有零散的仓库研究、Skill 能力地图、效果实验和产品场景整理为一个正式研究子项目。
- **Target user and context**：希望先理解“原仓库到底是什么”，再判断这些 Skill 如何影响 Three.js 代码生成与产品建设的决策者、产品设计者和开发者。
- **Desired first impression**：第一屏立即回答核心问题——这是一个用 24 个专家 Skill 约束大模型生成高级 Three.js 代码的知识与实现包；Three.js/GPU 才是效果运行层。
- **Visual ambition**：Editorial
- **Experience architecture**：Hybrid Workspace
- **Visual constraints**：沿用现有深色研究档案视觉；总览页以可读结构、证据标签和明确入口为主，不用新的重型 WebGL 背景抢占信息。
- **Information constraints**：必须同时覆盖原仓库来源与版本、24 个 Skill、31 个原始示例、项目内安装、12 个本地演示、三种真实性等级、实现责任边界、产品价值、局限、维护方式和验证结果。
- **Operation constraints**：总览页可直接进入能力地图、Skill 控制实验、效果实验室、应用展厅、上游仓库与上游示例库；所有本地演示保留精确深链接。
- **State constraints**：桌面与手机均能完成“理解结论 → 查看上游证据 → 浏览能力 → 进入演示 → 阅读产品影响”的主路径。
- **Environment constraints**：规范地址 `http://127.0.0.1:4180/project.html`；Vite 多页面项目；不新增运行时服务和外部依赖；24 Skill 仅安装在当前子项目 `.codex/skills`。
- **Primary journey**：理解责任链 → 确认原仓库证据 → 查看 24 Skill 分类 → 按真实性等级进入演示 → 理解对产品的价值与边界。
- **User-defined phases**：
  1. 作为正式子项目整理；
  2. 完整保留原始库信息；
  3. 解释库的能力；
  4. 整理现有演示与来源关系；
  5. 分析对我们的影响。
- **Required artifacts**：子项目总览页、项目清单、上游审计、能力地图文档、演示追踪文档、产品影响文档、维护与验证说明、根研究仓库登记、可重复审计脚本。
- **Autonomy authorization**：用户明确要求“作为我们的子项目进行整理”，允许直接在现有研究仓库和当前演示目录内实施可逆的页面、文档和配置修改。
- **User-decision boundary**：不修改上游仓库内容；不把本地产品代码伪装成上游 Skill；不承诺真实 GIS/BIM、业务数据、游戏引擎、后端或生产部署；不进行全局 Skill 安装。

## 事实边界

```text
用户目标
  → 大模型理解任务
  → Skill 提供专家方法、代码参考、约束和验收标准
  → 大模型生成或组合 JavaScript / GLSL / TSL
  → Three.js 组织场景并调用 WebGL / WebGPU
  → GPU 产生浏览器中的实时 3D 画面
```

- **上游直接证据**：原仓库中的 `SKILL.md`、references、examples、assets、开发示例库与来源追踪文件。
- **本地直接实现**：直接导入项目内 Skill 随附代码，或采用上游示例核心实现。
- **本地机制组合**：我们编写代码，但遵循一个或多个 Skill 的机制和约束。
- **产品原型**：Skill 只负责图形方向；任务、交互、数据和业务意义由产品代码负责。

## Observable completion criteria

- 总览页显示上游仓库、版本 `0.6.0`、固定提交、许可边界、24 Skill、14 个带示例 Skill、31 个原始示例、12 个本地演示和 3 个真实性等级。
- 24 Skill 在详细能力页全部可检索，每个 Skill 保留能力、时机、输入、输出、约束、示例与关联项。
- 12 个本地演示均说明 Skill 归属、实际代码关系、产品层责任与不包含内容。
- 项目文档分别回答：原仓库是什么、Skill 能做什么、演示如何实现、对我们有什么价值、如何维护与复验。
- 根目录 `research-projects.json` 与总 README 把它登记为正式子项目。
- 项目级安装保持在 `starfield-process-demo/.codex/skills`，数量与版本可由审计脚本复验。
- `npm run audit` 与 `npm run build` 通过。
- 总览页、能力页、一个直接 Skill 实验、一个机制组合场景和一个产品原型在真实浏览器中可打开；桌面和 390px 手机无页面级横向溢出。

## Coverage record

| 用户阶段 | 要求或产物 | 表面 / 状态 | 证据 | Owning stage | 状态 | 下一步 |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | 正式子项目入口与仓库登记 | 根 README、项目清单、`project.html` | 文件与浏览器 | Stage 3 | pass | 项目 06 已登记，总览入口可用 |
| 2 | 原仓库信息完整、可追溯 | 上游审计、来源与许可 | 文件、版本和计数 | Stage 3 | pass | v0.6.0、固定提交、31 示例与许可边界已记录 |
| 3 | 24 Skill 能力完整 | 能力页与能力文档 | 24/24 数据审计 | Stage 5 | pass | 上游、项目安装与目录 ID 完全一致 |
| 4 | 演示与 Skill 来源关系 | 12 场景矩阵与追踪文档 | 深链接、浏览器、数据引用 | Stage 5 | pass | 2 / 4 / 6 分级、12 个唯一链接、引用有效 |
| 5 | 对我们的影响 | 产品影响页与文档 | 信息审阅 | Stage 6 | pass | 收益、限制、产品方向和采用流程已写明 |
| 全部 | 可维护与可复验 | audit、build、README | 命令输出 | Stage 9 | pass | audit、项目 build、全研究展厅 6 项目 build 通过 |
| 全部 | 桌面与手机可读 | 1280px、390×844 | 浏览器截图与 DOM | Stage 7 | pass | 5 类、24 条、12 卡可见；两端无横向溢出 |

## Revision 02 · 纳入早期研究页面（2026-08-05）

- **Entry mode**：Revision-led。
- **Request revision**：把早期独立运行的 Capability Lab 与 Ocean Atlas 纳入正式研究链，并提交远端 `master`。
- **Primary journey**：理解当前结论 → 查看“能力翻译 → 真实 Skill 产品验证 → 完整研究实验室”的演进关系 → 打开对应实时页面。
- **Information constraints**：必须区分当前子项目的 5 个页面、2 个早期独立页面、12 个当前场景以及上游 31 个示例，不能把它们混成同一个计数。
- **Operation constraints**：本地开发时分别打开 4178/4179；GitHub Pages 发布后打开各自的研究项目路径。
- **Repository constraints**：纳入两个早期项目的源码、必要资产、说明和来源记录；排除 `node_modules`、`dist`、日志和重复的 `.agents/skills` 安装目录。
- **Autonomy authorization**：用户明确要求“加入并展示，需要提交到远端 master”，允许实施、验证、提交和推送本次范围内的可逆修改。

### Revision 02 observable completion criteria

- `project.html` 出现可见的“研究历程”区块，包含 Capability Lab 与 Ocean Atlas，并说明二者与当前实验室的关系。
- 页面明确显示 5 个当前页面 + 2 个早期页面 = 7 个自有网页入口；12 个当前场景仍单独计数。
- 两个早期项目进入 `research-projects.json`，可由统一研究展厅构建器发布。
- Capability Lab 与 Ocean Atlas 在 GitHub Pages 子路径下仍能正确加载资产和相互导航。
- 当前总览、Capability Lab、Ocean Atlas 均完成构建；总览在桌面与 390px 手机宽度无横向溢出，研究历程入口可操作。

### Revision 02 coverage record

| 用户阶段 | 要求或产物 | 表面 / 状态 | 证据 | Owning stage | 状态 | 下一步 |
| --- | --- | --- | --- | --- | --- | --- |
| 加入 | 两个早期项目源码进入仓库且不包含缓存 | 两个独立目录 | Git 范围审计 | Stage 9 | continue | 添加忽略规则并检查暂存清单 |
| 展示 | 总览展示完整研究演进 | `project.html` 桌面默认状态 | 浏览器截图与 DOM | Stage 3 | pass | 3阶段卡片、5+2=7统计和本地入口均可见 |
| 展示 | 手机端入口可读可点 | `project.html` 390×844 | 浏览器截图与溢出检查 | Stage 7 | defer | 浏览器视口控制保持1280px；在可生效的390px环境中复验 |
| 发布 | 两个项目进入统一研究展厅 | `research-projects.json` 与 `.pages` | 9 项目构建输出 | Stage 9 | pass | 生产基路径下9项目构建通过 |
| 发布 | 提交并推送 `master` | GitHub 远端 | 远端提交哈希 | Stage 9 | continue | 验证后显式暂存并推送 |
