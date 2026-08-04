# 子项目 06 · Three.js Graphics Agent Skills 研究实验室

这是 `0801 GitHub Code Study` 的正式研究子项目，完整整理原仓库、24 个 Skill、原始示例、本地演示、实现责任和产品影响。

## 先看结论

```text
用户目标
  → 大模型理解任务
  → Skill 提供专家方法、实现参考、约束和验收
  → 大模型生成 JavaScript / GLSL / TSL
  → Three.js 调用 WebGL / WebGPU
  → GPU 在浏览器中产生实时 3D
```

Skill 不是运行时引擎，也不是一键场景。它的核心作用是让大模型生成 Three.js 代码时更专业、可解释、可调试和可验收。

## 子项目入口

| 入口 | 作用 |
| --- | --- |
| [`project.html`](./project.html) | 子项目总览：原仓库、能力、演示和产品影响 |
| [`skills.html`](./skills.html) | 全部 24 Skill 的可检索能力地图 |
| [`skill-lab.html`](./skill-lab.html) | 直接调用项目内行星 Skill 的逐层控制实验 |
| [`index.html`](./index.html) | 极光、深空、太阳系、暴雨城市和火星效果实验 |
| [`applications.html`](./applications.html) | 乡村、园区、出行、故事和游戏产品原型 |

当前目录包含 5 个正式页面。整个研究链还保留两个早期独立页面，因此我们自己制作的相关网页入口合计为 7 个：

| 早期页面 | 研究阶段 | 本地入口 | 发布入口 |
| --- | --- | --- | --- |
| [Three.js Capability Lab](../threejs-awesome-graphics-agent-skills-demo/) | 把 Skill 能力翻译到 Glass Worlds 玻璃球、镜头、共享场和图像管线 | <http://127.0.0.1:4178/> | `/projects/threejs-capability-lab/` |
| [Ocean Atlas](../ocean-atlas-product-demo/) | 直接采用 spectral-ocean 上游核心实现进行产品验证 | <http://127.0.0.1:4179/> | `/projects/ocean-atlas/` |

上游 `4173` 示例展厅属于原仓库开发工具，包含31个示例，不计入我们的7个网页入口。`project.html` 的“研究历程”区块把三个阶段及真实代码关系放在一起展示。

## 研究文档

- [原仓库审计](./docs/01-UPSTREAM_LIBRARY.md)
- [24 Skill 能力档案](./docs/02-SKILL_CAPABILITY_MAP.md)
- [12 个演示追踪矩阵](./docs/03-DEMO_TRACEABILITY.md)
- [对我们的产品影响](./docs/04-PRODUCT_IMPACT.md)
- [维护、更新与复验](./docs/05-MAINTENANCE.md)
- [项目固定事实](./PROJECT_MANIFEST.json)
- [上游采用边界](./UPSTREAM_SOURCE.md)
- [上游许可与第三方声明](./LICENSES/)

## 固定研究基线

- 上游：`scottstts/Threejs-Awesome-Graphics-Agent-Skills`
- npm 版本：`0.6.0`
- 固定提交：`ba164002ebac362588436b2c833cd72caf1e2277`
- 24 个 Skill，14 个 Skill 带开发示例，共 31 个示例
- 项目内 `.codex/skills` 安装 24/24，没有全局安装
- 本地 12 个演示：2 个直接实现、4 个机制组合、6 个产品原型
- 7 个自有网页入口：当前子项目5页 + 2个早期独立实验；12个当前演示场景单独计数
- 随项目级 Skill 和资产一并保留 MIT、GPL-3.0、第三方声明与来源追踪清单

## 运行与验证

```powershell
npm install
npm run dev
npm run audit
npm run build
```

规范总览地址：<http://127.0.0.1:4180/project.html>

---

## 历史探索记录

以下内容保留这个子项目从极光过程实验逐步扩展到能力地图和产品原型的详细实现记录。

这是第二个过程型案例：使用上游 `threejs-procedural-vfx` 的极夜星空 / 极光实现，把“星空效果”拆成可以逐层打开的真实 GPU 过程。

## 运行

启动后打开：<http://127.0.0.1:4180/>

```powershell
npm install
npm run dev
```

构建检查：

```powershell
npm run build
```

## 项目内 Skill 安装与控制实验

原仓库的 24 个 Skill 已按 Codex 项目级规范安装到 [`.codex/skills`](./.codex/skills)，没有写入用户全局目录。安装清单位于 [`.threejs-awesome-graphics-agent-skills.json`](./.codex/skills/.threejs-awesome-graphics-agent-skills.json)。

打开 [`skill-lab.html`](./skill-lab.html) 可以运行第一个“真实 Skill 控制实验”：页面直接引用本地 `threejs-procedural-planets` 随附的程序化行星实现，把普通材质球、宏观高度、陆海分类、气候、生物群落、最终材质和法线验收依次呈现。该实验用于区分四件事：模型理解目标、Skill 提供规则、代码实现规则、Three.js 与 GPU 渲染结果。

## 体验顺序

页面默认显示最终合成，保证一打开就能看到星空和极光。点击“自动播放过程”，会从第 01 步重新演示：

```text
01 背景场 → 02 星点分布 → 03 闪烁运动 → 04 极光体积 → 05 最终合成
```

也可以直接点击右侧的五个阶段：

- **背景场**：只显示天空颜色和高度渐变；
- **星点分布**：用稳定方向网格和 hash 决定星星出现在哪里；
- **闪烁运动**：用时间、seed 和 blink rate 让少数星星变化；
- **极光体积**：加入上游 skill 的有限体积、三层噪声和 75 次射线采样；
- **最终合成**：最后才做曝光、伽马和 dithering。

每一步都会同步改变画面、标题、输入参数和 GPU operation，避免只在旁边写一段静态说明。

## 场景切换：全星空太空

顶部的 `SCENE` 选择器，或左侧的场景切换按钮，可以在五个场景之间切换：

- **极夜极光**：当前案例，包含地平线暗部和上游 `raymarched-aurora-curtains` 的体积极光；
- **深空星海**：全屏太空场景，不设置地面或地平线，使用三层方向 hash 星点、独立闪烁和低频星云带。
- **太阳系**：在深空星海背景上叠加真实的 Three.js 三维球体、太阳点光源、轨道线、月球、土星环和小行星带；默认镜头是斜向透视视角，行星使用光照明暗、阴影、不同轨道倾角和雾化深度来让空间关系可读。
- **暴雨城市**：把 `precipitation-surfaces` 的雨滴/湿地面思路与 `procedural-architecture` 的城市体块组合起来；可观察建筑、湿路面、积水涟漪、雨线和闪电如何逐步进入同一画面。
- **火星探测**：把 `procedural-planets` 的行星/地表思路与 `atmosphere-aerial-perspective` 的远近层次组合起来；可观察火星球体、陨石坑、地形、探测车、车辙、尘埃和任务轨道。

切换场景后，过程面板也会换成对应的五步说明。深空场景的 GPU 路径在 [`deep-space.js`](./src/deep-space.js) 中，太阳系的三维对象和运动路径在 [`solar-system.js`](./src/solar-system.js) 中，暴雨城市和火星探测分别在 [`storm-city.js`](./src/storm-city.js) 与 [`mars-exploration.js`](./src/mars-exploration.js) 中。

右上角的 `FOCUS / 聚焦 3D` 是专门用来理解空间效果的观察控件：开启后会淡出左侧说明、右侧过程面板和底部步骤，只保留场景与顶部场景选择器，方便拖动镜头观察建筑层次、雨幕深度、火星地表和探测车遮挡关系；再次点击按钮或按 `Escape` 即可恢复讲解界面。

## 真实场景应用展厅

现有页面只负责解释 skill 如何生成视觉效果。点击顶部的 `真实场景展厅 ↗`，或直接打开 [`applications.html`](./applications.html)，可以进入独立的真实场景应用页：

- **乡村四季数字沙盘**：用程序化地形、农田、道路、村屋、树木、季节、天气和日夜光照组成一个可观察的乡村规划空间；
- **暴雨乡村巡检**：在同一套乡村底座上叠加雨幕、积水、湿路、巡检路线和任务标记，展示灾害演练与设施巡检方向；
- **露营 / 出行预演**：增加营地、火堆、路线节点和太阳路径，帮助理解天气、地形和停留点之间的日常决策；
- **夜间乡村故事**：增加月光、灯笼、萤火虫、薄雾和故事路线，作为互动叙事、短片和游戏关卡的情绪场景；
- **可探索乡村游戏**：增加平面玩家移动、房屋碰撞、3 个任务点、2 个收集物、出口和重置流程，用键盘或触屏方向控件真实进入乡村空间；
- **小区 / 园区数字孪生**：使用独立的程序化园区底座，展示 5 个建筑、道路、绿化、3 个摄像头路线、4 种天气和 3 个导览镜头；它已经是可体验的空间原型，但真实 GIS、楼宇模型和运营数据仍需后续接入。

新页面只有当前选择的应用运行一套 WebGL 场景，避免同时加载多套重场景。通过右侧阶段按钮可以观察乡村的 `地形 → 农田 / 设施 → 聚落 / 路线 → 天气 / 任务 → 应用合成`，或园区的 `场地 → 道路 → 建筑 → 绿化 / 摄像头 → 孪生合成`；`FOCUS / 聚焦 3D` 用于直接检查空间关系。

进入“园区孪生”后，可以用左下角的 `LAYERS` 切换建筑、道路、绿化和摄像头运营图层，用 `WEATHER` 和 `TIME` 观察同一园区在不同条件下的光照与可见性，再用右侧的“园区入口 / 中庭”镜头理解导览关系。这一案例的意义是把 Three.js 的建筑体块、材质、光照、雾、雨幕、路线和相机能力组织成物业管理、园区展示和空间导览的共同底座。

现在阶段面板会直接解释“这一阶段生成了什么”和“它对产品有什么意义”；点击园区建筑、道路或摄像头预设可以查看对象详情，手机端园区控制则收纳在可展开的底部抽屉中。当前园区仍是程序化空间原型，真实 GIS、楼宇模型、视频流和运营数据明确留到后续接入。

进入“夜雨调查”后，桌面端使用 WASD / 方向键移动，靠近发光调查点或物资后按 `E` / `Enter` 互动。完成排水口、泵站和受阻道路三项调查，带回路线图与备用电池，再返回村口绿色救援灯标即可完成任务。积水会减速并累积暴雨风险，风险过高时会返回安全点但保留进度；移动端使用右下角方向控件和 `INTERACT` 按钮，`R` 或“重置调查”可以重新开始。

## 24 Skill 能力地图

打开 [`skills.html`](./skills.html) 可以查看原仓库全部 24 个 Skill。页面按规划与验证、镜头与运动、场景与资产、环境与特效、光照与画质五类组织，并为每个 Skill 展示能力、使用时机、输入、输出、关键约束、原仓库示例和关联 Skill。场景配方区说明真实海洋、暴雨乡村、火星任务、科幻事件、程序化城市和雨夜车窗分别需要怎样组合 Skill。

能力地图现在还包含 12 个“场景演示与 Skill 归属”卡片，并明确区分三种关系：

- **直接实现**：程序化行星直接导入项目内 Skill 随附代码；极夜极光采用上游 VFX 核心实现；
- **机制组合**：深空、太阳系、暴雨城市和火星探测由产品代码实现，但映射到明确的 Skill 方法；
- **产品原型**：乡村沙盘、暴雨巡检、夜雨游戏、园区孪生、出行预演和夜村故事使用图形能力，业务、任务和数据逻辑不属于 Skill。

效果页支持 `?scene=storm-city` 等精确场景链接；应用页支持 `?application=park-twin` 等精确应用链接，因此能力地图可以直接打开目标演示，而不是要求用户再次手动选择。

## 这个案例如何使用 skill？

上游 `threejs-procedural-vfx` 提供的是可复用的极光体积实现：

- 有限 XZ 体积边界；
- 三层 warped value noise；
- 均匀 raymarch 步长；
- start jitter；
- perspective 和 radiance probe 的共享 uniforms；
- HDR emission 和独立的合成路径。

上游 `polar-night-sky.js` 提供极夜背景和程序化星点：星点由方向网格、hash、密度、大小、颜色和闪烁时间共同决定。

太阳系不是上游 skill 直接提供的现成模型。它使用上游程序化星空作为背景，再由产品层调用 Three.js 的 SphereGeometry、MeshStandardMaterial、PointLight、DirectionalLight、LineLoop、InstancedMesh 和 OrbitControls 构建一个可拖拽、可缩放的太阳系。DOM 说明层通过 pointer-events 穿透让空白区域回到 canvas，只有按钮继续拦截点击。这里的三维证据不是文字模拟：拖动镜头会改变前后遮挡、椭圆轨道和受光面，滚轮会改变透视尺度。这正好展示了 skill 的意义：skill 提供可复用的视觉基础，产品层负责把基础能力组合成具体场景。

暴雨城市和火星探测也遵循同一条边界：上游 skill 提供可复用的“能力方向”和技术模式，产品层把它们组合成有明确用途的场景。暴雨城市把降雨、湿材质、程序化建筑和闪电合成成一个城市天气案例；火星探测把程序化行星、地形、层级式探测车和尘埃运动成一个任务叙事案例。两个场景都使用真正的 Three.js 几何、材质、光源、粒子/线段和相机轨道，不是把一张图片当成 3D。

本案例新增的产品层只做两件事：

1. 增加 `uProcessStage`，把背景、星点、闪烁、极光和最终合成按阶段打开；
2. 增加过程面板、自动播放、运行指标和移动端布局。

所以这里看到的不是五张截图，而是同一个 shader 路径在不同阶段的真实输出。

## 源码边界

- [`main.js`](./src/main.js)：场景适配器、过程状态和产品 UI；
- [`deep-space.js`](./src/deep-space.js)：全星空场景的多层星点、闪烁、星云和最终合成；
- [`solar-system.js`](./src/solar-system.js)：太阳、行星、轨道、月球、小行星带和三维运动；
- [`storm-city.js`](./src/storm-city.js)：暴雨天空、程序化城市体块、湿地面、雨线和闪电；
- [`mars-exploration.js`](./src/mars-exploration.js)：火星球体、陨石坑地形、探测车、尘埃、车辙和任务轨道；
- [`aurora-curtains.js`](./src/upstream/procedural-vfx/aurora-curtains.js)：上游极光体积实现；
- [`polar-night-sky.js`](./src/upstream/procedural-vfx/polar-night-sky.js)：上游极夜星空实现 + 本案例的过程阶段分支；
- [`UPSTREAM_SOURCE.md`](./UPSTREAM_SOURCE.md)：来源、改动和许可证边界。
