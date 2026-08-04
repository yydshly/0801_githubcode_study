# Three.js Skill 能力地图设计契约

## Revision 01

- Entry mode：Revision-led
- Request revision：在现有演示项目中增加独立的 24 Skill 能力说明页面，不继续扩展应用场景数量
- Target user and context：希望理解原仓库能力边界、每个 Skill 的职责以及组合生成效果过程的产品决策者
- Desired first impression：第一屏立即明确“24 个 Skill 的核心是指导大模型生成高级 Three.js 代码，而不是浏览器运行库”
- Visual ambition：Editorial
- Experience architecture：Hybrid Workspace
- Visual constraints：沿用现有深色玻璃、青色信号、暖色重点和等宽技术标签；信息可读性优先于装饰
- Information constraints：24 个 Skill 必须全部可见、可检索、可分类；每个 Skill 都包含能力、使用时机、输入、输出、关键规则、示例和关联 Skill
- Operation constraints：支持分类筛选、文本搜索、Skill 详情、场景配方切换和组合步骤高亮
- State constraints：全部、分类筛选、搜索结果、已选 Skill、已选场景配方、无结果状态
- Environment constraints：规范地址 `http://127.0.0.1:4180/skills.html`；桌面 1280 × 720；手机 390 × 844；无后端依赖
- Primary journey：理解 Skill 本质 → 浏览五类能力 → 选择一个 Skill 深读 → 选择一个产品场景观察 Skill 组合顺序
- User-defined phases：
  1. 按使用场景或类型分类
  2. 描述全部 24 个 Skill 的能力
  3. 关联 Skill 并说明如何生成效果
- Required artifacts：`skills.html`、Skill 数据目录、交互脚本、响应式样式、README 入口、验证记录
- Autonomy authorization：用户要求把信息体现在页面中，允许在现有项目内直接实现独立页面
- User-decision boundary：不实现 24 个重型 WebGL 效果本体；不修改原仓库 Skill 内容
- Observable completion criteria：
  - 页面首屏显示 24 Skill、5 类、14 个带示例 Skill、31 个示例
  - 24 张 Skill 卡片全部可检索并打开详情
  - 五类筛选和文本搜索可组合使用
  - 至少六个场景配方显示有序 Skill 链路及每一步贡献
  - 页面明确区分大模型、Skill、Three.js 和生成代码的职责
  - 桌面与手机主要流程可操作，无横向溢出

## Coverage record

| 用户阶段 | 要求 | 表面 / 状态 | 证据 | Owning stage | 状态 | 下一步 |
| --- | --- | --- | --- | --- | --- | --- |
| 第一 | 五类能力地图 | 桌面默认 | 浏览器截图与 DOM | Stage 3 | pass | 24 个 Skill 按 2 / 2 / 7 / 8 / 5 分组 |
| 第二 | 24 个 Skill 全部可理解 | 卡片与详情 | 数据计数、逐项详情交互 | Stage 5 | pass | 24 个唯一条目；详情与关联跳转通过 |
| 第三 | Skill 组合生成效果 | 场景配方 | 配方切换与有序链路 | Stage 6 | pass | 六个配方；暴雨乡村 10 步链路通过 |
| 全部 | 搜索与筛选 | 搜索、分类、无结果 | 浏览器交互 | Stage 5 | pass | 环境类 8 条；黑洞搜索 1 条；无结果状态通过 |
| 全部 | 手机可用 | 390 × 844 | 浏览器截图与操作 | Stage 7 | pass | 无横向溢出；卡片到详情阅读路径通过 |
| 全部 | 工程交付 | 构建与文档 | 构建、日志、README | Stage 9 | pass | 构建与日志通过；入口和证据已记录 |

## Revision 02 — 场景演示与 Skill 归属

- Request revision：在能力地图中补充现有场景演示，并准确说明每个场景涉及哪些 Skill。
- Primary journey：理解演示真实性等级 → 浏览场景 → 查看主 Skill 与辅助 Skill 的职责 → 进入对应实时页面。
- Information constraints：必须区分“直接复用本地 Skill 实现”“采用上游实现”“按 Skill 机制组合”“产品能力映射”；不得把普通 Three.js 代码或业务逻辑误称为 Skill 能力。
- Operation constraints：场景可按真实性等级筛选；每张场景卡提供可直接进入对应状态的链接。
- Required artifacts：场景演示数据、真实性图例、场景—Skill 职责映射、主场景与应用页深链接。
- Observable completion criteria：
  - 展示当前 12 个场景入口；
  - 每个场景列出实际采用或相关的 Skill，并说明职责；
  - 明确游戏任务、数字孪生数据和产品业务逻辑不属于原仓库 Skill；
  - 桌面与 390px 手机无横向溢出，筛选和入口可用。

| 用户阶段 | 要求 | 表面 / 状态 | 证据 | Owning stage | 状态 | 下一步 |
| --- | --- | --- | --- | --- | --- | --- |
| 场景理解 | 12 个场景及真实性等级 | 场景演示矩阵 | DOM 数量与浏览器截图 | Stage 3 | pass | 2 / 4 / 6 分组与 12 张卡已验证 |
| Skill 归属 | 每个场景的 Skill 与职责 | 场景卡详情 | 数据引用完整性检查 | Stage 3 | pass | 全部 Skill 引用有效，职责与边界可见 |
| 进入演示 | 精确打开指定场景 | 主实验、效果实验、应用页 | 浏览器导航 | Stage 5 | pass | 暴雨城市与园区孪生深链接通过 |
| 响应式 | 桌面与手机可读 | 1440×900、390×844 | 浏览器截图与溢出检查 | Stage 7 | pass | 两端均无页面级横向溢出 |
| 交付 | 构建与运行日志 | production build | 构建输出、日志 | Stage 9 | pass | 构建通过，页面日志为空 |
