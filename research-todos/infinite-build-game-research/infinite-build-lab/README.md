# Infinite Build 中文研究室

> Research 08 · 当前状态：四游戏视觉路线与出生海滩视觉切片 · `v0.8.1`

本项目研究 [The Infinite Build](https://the-infinite-build.openai.chatgpt.site/#start) 描述的 Codex 长期游戏开发工作流。它不是一个可安装的 JavaScript、Python 或游戏引擎库，而是一套由提示词、长期目标、权限边界、检查点和真实运行验证组成的协作方法。

研究方向已经从“提示词与 Skill 沉淀”修订为“运行能力与产品证据”。原网页的提示词流程只作为项目管理背景；主要研究对象是四个已部署游戏如何实现动作反馈、成长状态、Three.js空间氛围和世界模拟。

当前重新开启受控的方法复现实验，并与 [`../castaway-island-survival/`](../castaway-island-survival/) 荒岛生存归档一起作为第八个研究子项目保留。研究展厅只显示一个 Research 08 条目，《孤潮余生》是其中的关联案例而不是新的研究编号。

新的 [`arrival-beach-visual-slice.html`](arrival-beach-visual-slice.html) 是当前视觉验证入口：它不再扩展玩法，而是把 R6 已经成立的系统链与“玩家真正看见的世界”拆开研究。页面使用独立 Three.js 场景验证月牙海岸、人物尺度、救生艇残骸、天气、海水、地形和入林路径，并允许把实时场景与原创视觉目标并排对照。此前的 [`island-systems-slice.html`](island-systems-slice.html) 继续作为系统垂直切片，规则与存档没有被修改。

## 我们要回答的问题

1. 四个成品各自依赖什么渲染、资产、状态与反馈能力？
2. 哪些效果能够用独立的小产品实验复现？
3. 哪些效果来自资产质量，不能被程序化占位物替代？
4. 哪些已验证能力值得迁移到海岛游戏？

## 当前产物

- `arrival-beach-visual-slice.html`：独立的“风暴后出生海滩”视觉垂直切片，含暴雨/雨后、相机观察、参考图抽屉、低动态和 WebGL 回退。
- `arrival-beach-visual-runtime.mjs`：程序化月牙地形、连续海岸带、实时海面/泡沫、雨雾、植被、人物、救生艇和残骸。
- `assets/visual-slice/arrival-beach-target-v1.png`：原创视觉目标，只约束构图、尺度、材质和气氛，不冒充运行截图或 3D 资产。
- `ARRIVAL_BEACH_VISUAL_SLICE_CONTRACT.md`、`ARRIVAL_BEACH_VISUAL_SLICE_VALIDATION.md`：R7 视觉边界、覆盖矩阵和真实浏览器证据。
- `FOUR_GAME_VISUAL_IMPLEMENTATION_SUMMARY.md`：四游戏视觉路线、2D/2.5D 与完整实时 3D 的资源差异，以及当前海岛项目的混合路线建议。
- `island-systems-slice.html`：统一的 3D 荒岛生存链入口，覆盖采集、制作、装备、战斗、掉落、建造、昼夜和保存。
- `island-systems-core.js`、`island-systems-level.js`：唯一可序列化世界状态、原子库存事务、战斗状态机和单一玩法平面。
- `ISLAND_VERTICAL_SLICE_CONTRACT.md`、`ISLAND_VERTICAL_SLICE_VALIDATION.md`：R6 产品边界、覆盖矩阵与实机证据。
- `capability-lab.html`：四案例选择、四个交互实验、来源证据、验证边界和迁移结论组成的产品工作台。
- `capability-lab.js`：二维动作反馈与背包/成长状态实验。
- `capability-lab-3d.mjs`：第一人称氛围与等距建造的 Three.js 实验。
- `FOUR_GAME_CAPABILITY_LAB_CONTRACT.md`、`FOUR_GAME_CAPABILITY_LAB_VALIDATION.md`：新主线的范围与运行证据。
- `VISUAL_PRODUCTION_BENCHMARK_CONTRACT.md`、`VISUAL_PRODUCTION_BENCHMARK_VALIDATION.md`：R4视觉生产修订的质量门槛与对照证据。
- `assets/visual-production/`、`ASSET_PROVENANCE.md`：原创森林、角色、敌人运行媒体与来源/用途台账。
- `workflow-practice.html`：流程、四案例与《潮汐守望》受控练习的中文研究页面。
- `WORKFLOW_STUDY_CONTRACT.md`、`WORKFLOW_STUDY_VALIDATION.md`：新页面的范围、状态和浏览器证据。
- `assets/concepts/tidewatch-three-states-v1.png`、`TIDEWATCH_CONCEPT_V1_REVIEW.md`：《潮汐守望》候选概念 V1 与反向复盘。
- `tidewatch-game.html`：参考四案例能力实现的《潮汐守望》首个实时 3D 可玩切片。
- `TIDEWATCH_SLICE_CONTRACT.md`：玩法闭环、关卡平面、资产来源、固定状态和验收边界。
- `TIDEWATCH_SLICE_VALIDATION.md`：桌面、390 像素手机视口、固定状态、控制台和渲染预算证据。
- `METHOD_LEARNING_LEDGER.md`：Stage 01–05 的学习字段、已发生失败、技能候选和 L0–L3 晋级规则。
- `CAPABILITY_MAP_ZH.md`：网页内容的中文能力地图、术语和边界。
- `EXPERIMENT_PLAN.md`：用“雾中灯塔”样例验证工作流的实验设计。
- `index.html`：研究说明、当前状态、路线图和可玩游戏合为一页的 companion site 原型。
- `game-core.js` 与 `app.js`：零依赖的核心规则和浏览器运行实现。
- `tests/game-core.test.js`：核心规则的确定性检查。
- `ROADMAP.md`、`CHANGELOG.md`、`VALIDATION.md`：长期项目需要维护的最小历史。

## 运行

可以直接双击 `index.html`。为了获得稳定的浏览器行为，也可以在仓库根目录运行：

```powershell
python -m http.server 4173
```

然后访问：

```text
http://127.0.0.1:4173/infinite-build-lab/
```

游戏操作：方向键或 `WASD` 移动，空格冲刺；也可以点击或轻触地图自动移动，手机上还可使用画面底部按钮。

## 样例在验证什么

“雾中灯塔”只是一段最小可玩切片：收集游光，将其送到三座灯塔，同时避开会随携带数量加速的迷雾。它刻意包含：

- 明确的玩家承诺：在危险迷雾中恢复光明；
- 一个核心动作：移动并收集；
- 一个选择：立刻交付，还是多带几颗再走；
- 一个压力状态：携带越多，迷雾追得越快；
- 一个回报：灯塔逐级变亮，全部点亮后完成。

它不是为了证明 Codex 能一次生成大型游戏，而是为后续的“试玩 → 发现最大问题 → 单点改进 → 再验证”提供一个真实起点。

## 当前边界

- 当前没有创建真正的 Codex standing goal；此阶段先把研究对象和基线建立正确。
- 当前没有自动提交、推送或部署，相关动作需要在本仓库的授权范围内单独执行。
- 自动测试只覆盖核心规则；视觉、手感和手机操作仍要在真实浏览器中验证。
- R4 使用三项项目内原创生成媒体，总运行负载约 4.6 MB；不复制原游戏素材，不依赖运行时 CDN。
- R7 仍是程序化半写实场景，不是照片级角色、扫描植被、电影级体积云或 Unreal 成品画面；参考图明确作为质量目标而不是完成证明。

## R5：Adventure 准成品战斗切片

`capability-lab.html` 的 Adventure 已从“按下即扣血”的机制草模升级为可读的战斗闭环：原创漂流者与潮木守卫使用 4×4 动作图集；玩家攻击经过前摇、命中窗口和后摇；敌人经过追击、红色预警、攻击和恢复；命中同步驱动数值、击退、闪白、停顿、有限震屏、VFX、声音和 HUD。页面保留“机制基线”切换，并在 Online 显示同一动作资产的复用证据。

对应文件：`adventure-combat-core.js`、`ADVENTURE_COMBAT_SLICE_CONTRACT.md`、`ADVENTURE_COMBAT_SLICE_VALIDATION.md`，以及 `assets/visual-production/` 下两张 `*-atlas-v1.png`。

## 当前下一步

先对照 `arrival-beach-visual-slice.html` 与目标参考，判断最影响可信度的是人物、植被、岩石还是救生艇。下一轮只替换一类程序化占位资产为有明确授权和性能预算的生产资产，保留同镜头前后截图；不同时扩展饥渴、生态、敌人或大地图。
