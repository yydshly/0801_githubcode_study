# Research 08 · Infinite Build 与《孤潮余生》

> 状态：研究进行中 · R7 出生海滩视觉切片与四游戏视觉路线总结已验证
> 归档日期：2026-08-05  
> 当前决定：写实游戏生产继续归档；主线转为拆解四个公开小游戏的机制与视觉生产能力，并用四个可运行原创场景验证。

## 研究问题

这个子项目最初研究 [The Infinite Build](https://the-infinite-build.openai.chatgpt.site/#start) 所描述的长期 AI 开发方式：AI 是否能够围绕一个长期目标，通过试玩、选择问题、修改、验证和继续，逐步形成一款游戏。

为了理解它的真实价值，我们先制作“雾中灯塔”最小样例，再把方法扩展为《孤潮余生》荒岛生存案例。后续复核发现原网页底部还有四个真实部署游戏及“概念 → 实机”对照。研究由此进一步修正：提示词本身并不是核心，真正值得学习的是四个成品如何分别建立动作反馈、长期状态、三维氛围和建造模拟。

当前不再以 Skill 晋级为主线，也不把四个游戏归结为四种视觉风格。我们建立统一的“四游戏能力拆解实验室”，让每项能力都有可操作的产品闭环、视觉生产证据、适用边界和对海岛游戏的迁移判断。R4–R6 已分别验证资产生产、战斗反馈和统一生存链；R7 将系统切片与视觉切片分开，并进一步明确 Adventure、Online 的 2D 媒体路线和 Backroom、MiniTown 的实时 3D 路线。当前结论是：成品感首先来自风格、镜头与资产投入相互匹配，而不是盲目追求自由写实 3D。

## 归档内容

| 目录 | 内容 | 当前状态 |
| --- | --- | --- |
| [`infinite-build-lab/`](infinite-build-lab/) | Infinite Build 中文解释、四案例机制/视觉实验室、荒岛系统/视觉切片与《潮汐守望》3D切片 | R7视觉切片与四游戏视觉路线总结已实现并验证 |
| [`castaway-island-survival/`](castaway-island-survival/) | 《孤潮余生》网页原型、项目蓝图、3D 资产、设计文档与 Unreal 写实验证计划 | Day Two Recon V1.2，暂停生产 |

## 演示入口

- 研究展厅中的 Research 08 卡片显示“四游戏视觉路线与出生海滩 R7”状态；
- [Infinite Build 中文研究与雾中灯塔](https://yydshly.github.io/0801_githubcode_study/projects/infinite-build-lab/) 是第八项目的主入口；
- [四游戏能力拆解实验室](https://yydshly.github.io/0801_githubcode_study/projects/infinite-build-lab/capability-lab.html) 是当前主线：四个来源案例、四个可交互实验与迁移边界在同一工作台展示；
- [四游戏视觉路线总结](https://yydshly.github.io/0801_githubcode_study/projects/infinite-build-lab/capability-lab.html#visual-routes) 解释四案例效果、2D/2.5D 与实时 3D 的资源差异；
- [风暴后的出生海滩](https://yydshly.github.io/0801_githubcode_study/projects/infinite-build-lab/arrival-beach-visual-slice.html) 是与 R6 系统切片分离的实时视觉验证；
- [游戏工作流研究与练习](https://yydshly.github.io/0801_githubcode_study/projects/infinite-build-lab/workflow-practice.html) 是当前方法复现页面；
- [《潮汐守望》可玩切片](https://yydshly.github.io/0801_githubcode_study/projects/infinite-build-lab/tidewatch-game.html) 是参考四案例能力完成的 Stage 02 实时 3D 游戏；
- [《孤潮余生》项目蓝图](https://yydshly.github.io/0801_githubcode_study/projects/castaway-island-survival/overview.html) 是关联案例说明；
- [《孤潮余生》可玩原型](https://yydshly.github.io/0801_githubcode_study/projects/castaway-island-survival/) 保留当前 V1.2 运行结果。

《孤潮余生》不会作为新的研究编号单独出现在展厅列表中，而是 Research 08 内部的关联案例。

## 已确认结论

1. Infinite Build 的主要价值是长期目标、权限边界、检查点、真实运行验证和持续记录，不是一个直接生成完整游戏的 3D 库。
2. 网页原型适合验证系统规则、玩家流程和快速分享，不适合继续承担照片级写实目标。
3. 真正写实的荒岛生存游戏需要独立的资产生产、人物驱动、海岸水体、天气、生态、性能和测试管线。
4. 当前电脑的 CPU 与 RTX 4070 Laptop 可以验证小型 UE5 场景，但 16 GB 内存偏低，C/F 盘剩余空间不足以舒适开始 Unreal 生产。
5. 第一块合理的写实验证不是整座岛，而是约 50 × 50 米可交互海滩和约 150 × 150 米视觉范围。
6. 这个验证仍然是不小的工程，因此当前选择归档，而不是继续堆叠低模内容或立即购买资产。

## 重新启动条件

同时出现以下条件时，才重新开启生产：

- 明确愿意投入一个独立的 Unreal 学习与制作周期；
- SSD 至少留出约 150 GB 连续空间，内存升级到 32 GB 或接受由此带来的效率风险；
- 接受先做一块小海滩，而不是直接制作完整岛屿；
- 有明确的写实人物、环境资产和动画来源；
- 同意使用运行证据决定继续、降级或停止。

恢复时从 [`castaway-island-survival/docs/10_UNREAL_BENCHMARK_PLAN.md`](castaway-island-survival/docs/10_UNREAL_BENCHMARK_PLAN.md) 的 B0 设备准备开始，不从扩写剧情或地图开始。

## 归档边界

- 保留源码、文档、概念图、运行资产、许可记录和构建配置；
- 不提交 `node_modules`、临时缓存、本地日志和构建目录；
- 不把概念图描述成实时游戏截图；
- 不把当前低多边形网页原型描述成最终产品；
- 后续只在恢复条件满足或出现新的明确研究问题时更新。
