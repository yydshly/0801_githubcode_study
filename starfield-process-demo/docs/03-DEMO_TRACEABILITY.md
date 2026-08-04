# 03 · 演示追踪矩阵

## 为什么必须分级

页面中的所有效果最终都是代码和 GPU 输出，但“代码来自哪里”不同。如果不分级，很容易错误地把大模型写出的所有 Three.js 代码都说成上游 Skill 自带能力。

| 等级 | 定义 | 能证明什么 | 不能证明什么 |
| --- | --- | --- | --- |
| A · 直接实现 | 直接导入项目内 Skill 代码，或采用上游示例核心实现 | 上游确实提供了这套效果机制和代码 | 上游已经提供我们的产品页面、流程和交互 |
| B · 机制组合 | 我们写 Three.js/Shader，但采用明确 Skill 方法 | Skill 能有效指导模型实现相关机制 | 这是上游可直接复制的一键完整场景 |
| C · 产品原型 | Skill 图形能力进入交互、任务或业务场景 | 图形能力可以成为产品空间的基础 | Skill 自带业务数据、任务系统或完整产品能力 |

## 研究历程中的两个早期独立页面

这两个页面现在纳入研究总览与统一发布，但不重复计入下面的12个当前演示场景：

| 页面 | 阶段 | Skill / 代码关系 | 为什么单独保留 |
| --- | --- | --- | --- |
| Three.js Capability Lab | 能力翻译 | 产品代码实现5个代表性机制，并把全部24 Skill映射到 Glass Worlds；不是24个上游效果的直接运行集合 | 记录我们最早如何理解“Skill 对已有产品的意义” |
| Ocean Atlas | 产品验证 | `src/upstream/spectral-ocean/` 的5个核心文件直接来自上游示例；产品壳层、研究层和交互由我们编写 | 证明上游 Skill 随附实现可以进入一个具体产品场景 |

因此计数应当分开理解：当前子项目5个页面 + 2个早期独立页面 = 7个自有网页入口；当前演示矩阵仍为12个场景；上游示例库仍为31个示例。

## 12 个本地演示

### LEVEL A · 直接实现（2）

| 演示 | 入口 | 直接/相关 Skill | 上游负责 | 我们负责 |
| --- | --- | --- | --- | --- |
| 程序化行星控制实验 | `/skill-lab.html` | `threejs-procedural-planets` | 地形、陆海、气候、群落、材质、法线诊断实现 | 基线对比、步骤控制、讲解、页面与交互 |
| 极夜星空与体积极光 | `/?scene=polar-night` | `threejs-procedural-vfx`；相关 `exposure-color-grading`、`visual-validation` | 有限体积极光、噪声密度、射线积分和上游星空基础 | 五阶段开关、界面、自动播放、指标和响应式布局 |

### LEVEL B · 机制组合（4）

| 演示 | 入口 | 涉及 Skill | 实际实现边界 |
| --- | --- | --- | --- |
| 全屏深空星海 | `/?scene=deep-space` | `procedural-fields`、`procedural-vfx`、`exposure-color-grading` | 产品层编写方向哈希星点、闪烁和低频星云；不是黑洞 Skill 示例。 |
| 可拖动太阳系 | `/?scene=solar-system` | `camera-direction`、`procedural-animation` | 产品层用球体、材质、灯光、轨道线和层级动画实现；没有直接使用行星 Skill。 |
| 暴雨城市 | `/?scene=storm-city` | `precipitation-surfaces`、`procedural-architecture`、`camera-direction`、`exposure-color-grading` | 产品层组合实例建筑、湿材质、雨线、积水、涟漪和闪电。 |
| 火星探测 | `/?scene=mars-exploration` | `procedural-planets`、`atmosphere-aerial-perspective`、`procedural-geometry`、`camera-direction` | 产品层近似火星球体、地形、陨石坑、探测车、尘埃和任务轨道。 |

### LEVEL C · 产品原型（6）

| 演示 | 入口 | 图形 Skill | 产品层新增 |
| --- | --- | --- | --- |
| 乡村四季数字沙盘 | `/applications.html?application=rural-seasons` | Fields、Vegetation、Architecture、Camera、Atmosphere | 农田、道路、村屋、季节、天气、太阳位置和规划说明 |
| 暴雨乡村巡检 | `/applications.html?application=rural-storm` | Precipitation、Architecture、Fields、Camera | 巡检路线、设施点、风险表达和任务语义 |
| 夜雨乡村游戏关卡 | `/applications.html?application=rural-game` | Precipitation、Architecture、Camera、Validation | 玩家移动、碰撞、任务、收集、风险、完成和重置 |
| 小区/园区数字孪生 | `/applications.html?application=park-twin` | Architecture、Vegetation、Camera、可选 Shadows | 图层、天气、时间、摄像头路线、对象详情和导览 |
| 露营/出行预演 | `/applications.html?application=camping-route` | Fields、Vegetation、Atmosphere、Camera | 营地、路线节点、太阳路径和演示型适宜性判断 |
| 夜间乡村故事 | `/applications.html?application=night-story` | VFX、Camera、Atmosphere、Exposure/Grade | 灯笼、萤火虫、故事路径、节点和叙事内容 |

## 关键场景的代码责任

| 文件 | 责任 |
| --- | --- |
| `src/upstream/procedural-vfx/aurora-curtains.js` | 采用上游体积极光核心实现 |
| `src/upstream/procedural-vfx/polar-night-sky.js` | 采用上游极夜星空并增加过程阶段分支 |
| `.codex/skills/threejs-procedural-planets/examples/.../planet-system.js` | 项目级 Skill 的行星随附实现，Skill Lab 直接导入 |
| `src/deep-space.js` | 我们编写的深空星海 Shader |
| `src/solar-system.js` | 我们编写的太阳系 Three.js 场景与运动 |
| `src/storm-city.js` | 我们编写的暴雨城市场景 |
| `src/mars-exploration.js` | 我们编写的火星探测场景 |
| `src/rural-world.js` | 我们编写的乡村沙盘、天气与生活场景底座 |
| `src/game-levels/night-rain-village.js` | 我们编写的夜雨任务、碰撞和关卡状态 |
| `src/park-world.js` | 我们编写的园区程序化空间与运营图层 |

## 用户看到的“3D”由什么产生

```text
JavaScript 场景代码
  → Three.js 的 Scene / Camera / Geometry / Material / Light / Controls
  → WebGLRenderer 或 WebGPU 路径
  → GLSL / TSL Shader 与 GPU 绘制
  → 浏览器 Canvas 中的实时像素
```

拖动后遮挡、透视、受光面和空间关系改变，说明它是真实 3D 场景；如果只是文字、静态图片或只移动一张平面图，就不能作为 Three.js 空间能力证据。

## 当前演示的产品边界

- 太阳系不是天文模拟器，轨道和尺度以视觉理解为主。
- 火星不是科学级地形或大气模拟。
- 暴雨城市和乡村没有真实降雨、排水或积水数据。
- 园区孪生没有接入 GIS、BIM、摄像头流和运营告警。
- 游戏原型不是完整游戏产品，没有完整敌人、战斗、存档和内容管线。
- 露营预演没有接入真实地图、天气预报和营地数据。

这些边界不削弱图形机制证明，但决定了它们目前属于研究原型，而不是生产系统。
