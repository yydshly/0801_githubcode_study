# Three.js Skill 能力地图交付记录

## 运行环境

- 启动命令：`npm run dev`
- 规范页面：`http://127.0.0.1:4180/skills.html`
- 桌面视口：1280 × 720
- 手机视口：390 × 844

## 交付结果

| Coverage item | 观察证据 | Decision |
| --- | --- | --- |
| 原仓库内容核对 | 完整读取 24 份 `SKILL.md`；确认 24 个 Skill、5 类、14 个带示例 Skill、31 个示例目录 | pass |
| 页面首屏 | 明确展示“Skill 指导大模型生成代码”，并区分目标、大模型、Skill、生成代码、Three.js + GPU | pass |
| 分类目录 | 分类数量为 2 / 2 / 7 / 8 / 5，总计 24；全部 24 张卡片进入 DOM | pass |
| Skill 详情 | 程序化几何显示 4 个示例；频谱海洋显示 4 个示例；关联 Skill 跳转到程序化建筑 | pass |
| 搜索与筛选 | 环境与特效筛选得到 8 条；“黑洞”得到 1 条；不存在关键词显示无结果状态 | pass |
| 场景配方 | 六个配方可切换；暴雨乡村显示从 Router 到 Visual Validation 的 10 步链路 | pass |
| 手机体验 | 390 × 844 无横向溢出；Skill 卡片点击后自动滚动到完整详情 | pass |
| 可访问性 | 语义标题、tablist、button、search、aria-live 和 `:focus-visible` 已实现；浏览器确认输入控件有 2px 可见焦点 | pass |
| 浏览器日志 | 新页面运行日志无 error / warn | pass |
| 工程交付 | `npm run build`、数据计数与 `git diff --check` 通过 | pass |

## 最终证据

- [`01-skills-desktop-hero.png`](./skills-evidence/01-skills-desktop-hero.png)：核心结论、统计与职责链。
- [`02-skills-catalog-detail.png`](./skills-evidence/02-skills-catalog-detail.png)：24 卡片目录与程序化几何详情。
- [`03-skills-mobile.png`](./skills-evidence/03-skills-mobile.png)：手机首屏与横向职责链。

## 能力边界

本页解释和组织 24 个 Skill，不同时运行 24 套重型 WebGL 示例。下一阶段若要验证某个 Skill 的真实增益，应选择一个 Skill，严格按其 `SKILL.md`、参考实现和验收门槛生成独立效果，并与不使用 Skill 的基线对比。

## 验证限制

浏览器的真实 Tab 键注入没有改变焦点顺序；已通过语义 DOM 和可见焦点样式确认基础键盘结构。若后续修改焦点管理，应在支持原生键盘事件的浏览器中重新执行完整 Tab 顺序检查。

## Revision 02 active item

- Current stage：Stage 3 — information and layout calibration
- User goal：看到除行星外的其他场景，并明确每个场景究竟用了哪些 Skill。
- Observed evidence：现有页面只有配方和一个行星实验入口，没有把已运行场景、Skill 归属和真实性等级放在同一处。
- Root cause：场景代码分散在效果实验室和应用展厅，原有说明混合了直接复用、机制参考和产品映射。
- Minimal intervention：增加统一场景演示矩阵和精确深链接，不复制或同时加载多套 WebGL。
- Decision：continue
- Next executable action：建立场景映射数据并渲染页面区块。

### Revision 02 result

- Observed result：场景矩阵展示 12 个场景，筛选结果为直接实现 2、机制组合 4、产品原型 6；场景卡到 Skill 详情的跳转通过，暴雨城市与园区孪生深链接精确打开指定状态。
- Cross-surface：1440×900 和 390×844 均无页面级横向溢出；手机场景卡保持单列，分类使用可滚动标签。
- Runtime：能力地图、暴雨城市和园区孪生均无 error / warning。
- Evidence：`skills-evidence/04-scene-matrix-desktop.png`、`skills-evidence/05-scene-matrix-mobile.png`。
- Decision：pass
- Next executable action：None for this revision.
