# Research 08 流程研究页验证记录

> 页面：`workflow-practice.html`
> 日期：2026-08-06
> 设计契约：[`WORKFLOW_STUDY_CONTRACT.md`](WORKFLOW_STUDY_CONTRACT.md)

## 运行环境

| 项目 | 记录 |
| --- | --- |
| 启动命令 | `python -m http.server 4190 --directory .pages` |
| 标准地址 | `http://127.0.0.1:4190/projects/infinite-build-lab/workflow-practice.html` |
| 浏览器 | Codex 内置浏览器 |
| 主题 | 暗色单主题 |
| 视口 | 1440 × 1000 / 768 × 1024 / 390 × 720 |

## 覆盖结果

| 覆盖项 | 状态 | 证据 |
| --- | --- | --- |
| 首屏研究命题 | pass | 首屏明确显示“先复现方法，再讨论能力”，当前实况为“Stage 02 已验证” |
| 五阶段流程 | pass | 概念、切片、反馈、长期目标、伴随页均包含停止点或继续条件 |
| 四案例切换 | pass | Adventure、Online、Backroom、MiniTown 的标题、类型、外链、图片和四栏分析同步变化 |
| 五个练习阶段 | pass | 五个 tab 均保持唯一选中状态，并更新人、Codex、产物、证据、提示词和反思 |
| 提示词复制反馈 | pass | 点击后页面显示“已复制当前阶段提示词” |
| 主入口双向导航 | pass | Research 08 旧首页的主按钮进入 `workflow-practice.html`；新页品牌和页脚可返回 |
| 1440px 桌面 | pass | `scrollWidth ≤ innerWidth`；案例四栏、概念/实机双栏、练习职责双栏可读 |
| 768px 平板 | pass | `scrollWidth ≤ innerWidth`；首屏单栏、案例摘要两栏、顶部导航自动收起 |
| 390px 手机 | pass | `scrollWidth ≤ innerWidth`；案例图单栏、控制器两栏、提示词与正文无裁切 |
| 键盘与 ARIA | pass | 案例 `ArrowRight`、阶段 `End` 生效；两个 tablist 各只有一个选中项，焦点轮廓可见 |
| reduced-motion | defer | 当前浏览器没有媒体偏好模拟能力；源码已用 `prefers-reduced-motion: reduce` 取消动画和顺滑滚动，待可模拟或系统开启该偏好时复测 |
| 生产构建与控制台 | pass | `node --check`、7 项原有规则与 8 项 Tidewatch 规则测试、11 个研究项目全站构建通过；桌面、平板、手机和入口标签页均为 0 个控制台错误 |

## R2 · 产品轨与学习轨

| 验证点 | 状态 | 运行证据 |
| --- | --- | --- |
| 双轨研究命题 | pass | `#learning` 显示“产品是练习载体，技能才是研究沉淀”，并明确一次成功只形成候选 |
| 七字段复盘 | pass | 页面同时显示目的、输入、动作、产物、证据、失败、沉淀；完整台账进一步记录可复用候选 |
| 阶段学习状态 | pass | Stage 01、Stage 02、Stage 03、Stage 04–05 四张状态卡存在，当前验证次数分别如实记录 |
| 技能晋级 | pass | 页面和台账均显示 L0 观察 → L1 候选 → L2 跨样例方法 → L3 正式 Skill |
| 台账发布 | pass | `METHOD_LEARNING_LEDGER.md` 已进入发布清单，本地服务器返回 HTTP 200 |
| 桌面布局 | pass | 1265px 内容宽度下四张阶段卡、技能阶梯和文档入口完整，无横向溢出，错误/警告日志为 0 |
| 390px 窄屏 | pass | 实际视口 390 × 720；阶段卡为单列、七字段为双列、文档宽度 375px 且无横向溢出，错误/警告日志为 0 |
| 状态一致性 | pass | 首屏、样例区和阶段数据统一更新为 Stage 02 已验证、Stage 03 等待玩家反馈 |

## 已知边界

- 页面引用原始研究站的概念/实机图片；图片属于证据增强层，加载失败不影响案例文字、链接和练习操作。
- 页面不调用 AI，也不把阶段切换当成真实项目进度；《潮汐守望》当前明确停在 Stage 02 可玩切片已验证、Stage 03 等待玩家反馈。
- 当前三个方法最多是 L1 技能候选；在第二个不同样例中复现前，不创建或宣称正式 Skill。
- 《孤潮余生》的写实生产继续归档，本页只验证风格化浏览器游戏的工作流。

## 终局审计

页面范围内没有剩余 `continue`。唯一 `defer` 是当前浏览器不能模拟 reduced-motion；基础页面不依赖动画完成阅读或操作，CSS 降级规则已经存在，因此不阻塞交付。产品轨已完成 Stage 02，学习轨已复盘 Stage 01–02；Stage 03 必须等待一条真实玩家感受才能开始，这属于研究方法规定的停止点，不是网页交付缺口。
