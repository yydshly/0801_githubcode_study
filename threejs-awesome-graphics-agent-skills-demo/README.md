# Three.js Awesome Graphics Agent Skills · Capability Lab

这是一个独立的研究子项目，用来回答两个问题：

1. `Threejs-Awesome-Graphics-Agent-Skills` 到底能给 Three.js 开发带来什么；
2. 这些能力如何落到我们已有的 `glass-worlds-gallery` 产品场景里。

## 先说清楚：它是什么

这个 npm 包不是运行时渲染库，也不是可以直接 `import` 的游戏引擎。它是给 Codex、Claude Code、Cursor、Copilot 等 AI 编程代理使用的视觉技能包：把相机、材质、程序化场、VFX、海洋、水体、大气、Bloom、曝光调色和视觉验证拆成可路由的专家技能，并附带实现方法与示例。

本目录已经安装：

```text
threejs-awesome-graphics-agent-skills@0.6.0
```

技能实际安装在本地 `./.agents/skills`；完整的 24 个技能由安装器写入。该安装目录不提交到仓库，避免与正式研究子项目中的 `starfield-process-demo/.codex/skills` 重复；安装命令与固定版本保留在 [`UPSTREAM.md`](./UPSTREAM.md)。当前 demo 的视觉代码使用 Three.js 实现了其中最适合我们产品的代表性能力，并在界面上标出对应技能名。

## 运行

```powershell
npm install
npm run dev
```

打开 <http://127.0.0.1:4178/>。生产构建检查：

```powershell
npm run build
```

## 怎么看 demo

### 能力演示

默认进入能力演示，可以切换 5 个代表性能力：

- `threejs-procedural-materials`：玻璃外壳、Fresnel 边缘、内部场景和材质深度；
- `threejs-camera-direction`：指针视差、聚焦和镜头意图；
- `threejs-procedural-fields`：共享时间场驱动粒子、光和波面；
- `threejs-exposure-color-grading`：HDR、Bloom、曝光和内容可读性；
- `threejs-visual-validation`：可重复输入、debug 通道和质量边界的验证思路。

快捷键：`Space` 播放/暂停，`D` 切换 debug；右侧控制条可切换焦点和 reduced motion。

### 三步看懂页面

页面现在把“看到效果”和“理解方法”分成三条入口，建议按下面顺序使用：

1. 点击右上角 `看懂这套库`：先理解这个仓库本身是给 AI 编程代理使用的视觉技能地图，不是一个运行时渲染引擎。
2. 点击能力卡里的 `这个效果怎么做？`：查看当前玻璃世界如何由材质、镜头、程序化场、调色和验证五层共同组成。
3. 切换到 `结合我们的产品`，点击 `这套库对产品的意义`：把技能映射回 Glass Worlds，理解它如何让现有能力变成可复用、可调参、可验证的产品模块。

在产品意义面板中点击 `查看详细映射`，还可以回到原来的逐项技能—产品系统对照表；点击 `进入产品演示` 则直接回到可交互的产品场景。

### 完整能力与上游示例

本地安装目录里有上游包提供的 24 个 skill。它们可以分成五类：

- 路由与证据：`threejs-skill-router`、`threejs-visual-validation`；
- 镜头、运动与共享场：`camera-direction`、`procedural-animation`、`procedural-fields`；
- 形体、材质与世界生成：materials、parallax、geometry、vegetation、architecture、planets；
- 水、天气与大气：spectral-ocean、water-optics、precipitation、atmosphere、volumetric-clouds、temporal-surfaces；
- VFX、光照与最终图像：procedural-vfx、raymarched-space-effects、shadow-systems、screen-space-ambient-occlusion、bloom、exposure-color-grading、image-pipeline。

上游仓库的开发图库目前发现 31 个可运行示例，覆盖其中 14 个有独立场景适配器的 skill；其余 10 个是跨场景的基础系统，不一定有单独的图库卡片。当前页面的 `库本身` 面板会把 24 个 skill、它们产生的视觉后果和对应的上游示例逐项列出。

README 里的 `Example Library` 和 `spectral ocean` 图片属于仓库自己的示例证据，但它们是静态总览/截图，不是 npm 包安装后自动启动的运行时。要看真实交互效果，需要运行上游仓库的 `dev/example-gallery`：具体过程和当前已验证的结果见 [`UPSTREAM_GALLERY_EVIDENCE.md`](./UPSTREAM_GALLERY_EVIDENCE.md)。

### 结合我们的产品

切换到“结合我们的产品”，会进入基于 `glass-worlds-gallery` 的产品化演示：

- 使用我们已有的本地场景图，而不是占位贴图；
- 保留玻璃世界、星尘、内容焦点和 Spatial Stage 的产品语言；
- 点击玻璃球可以切换当前世界；
- “这套库对产品的意义”面板先解释产品价值，“查看详细映射”再展示技能包与产品系统的一一对应关系；
- `Enter world` 用一个本地成功状态演示内容进入点。

## 我们的产品结合意义

当前 Glass Worlds 已经有玻璃球、Fresnel、场景纹理、粒子星场、连续轨迹、指针交互和 Atmosphere / Content 双模式。技能包的价值不是替换这些能力，而是把它们从一次性的视觉实现提升为可路由、可调参、可验证的系统：

| 我们已有的产品系统 | 可结合的技能 | 具体意义 |
| --- | --- | --- |
| 玻璃球 + 场景纹理 | procedural materials / water optics | 让“图片在球里”继续向“可进入的世界”发展，强化厚度、边缘、视差和内部光学。 |
| 星尘 + 球体飞行 | camera direction / procedural animation | 把氛围镜头、内容镜头、焦点交接和轨迹时序分开管理。 |
| Atmosphere / Content | image pipeline / exposure-color-grading / bloom | 内容模式可以更清晰，氛围模式可以更有情绪，高光不再统一把画面洗白。 |
| 多球体和 GPU 粒子 | procedural fields / procedural VFX | 让粒子、光晕、世界运动共享可复现的场，减少独立噪声层。 |
| 现有验证记录 | visual validation | 通过固定视角、seed、debug、no-post baseline 和质量档位，把“好不好看”变成可回放证据。 |

它不能直接提供产品内容策略、研究主题、业务流程、后端生成 API、登录或持久化；这些仍然属于我们的产品层。

## 来源与边界

- 上游仓库：<https://github.com/scottstts/Threejs-Awesome-Graphics-Agent-Skills>
- 本地安装命令和版本记录见 [`UPSTREAM.md`](./UPSTREAM.md)。
- 本 demo 只展示代表性能力，不声称一次性复刻上游全部 24 个技能的所有示例。
- 上游包声明 `MIT AND GPL-3.0-only`；如果未来把上游实现或素材直接带入生产产品，需要按其 `source_materials` 和第三方声明复核许可边界。
- 项目内来源与许可边界见 [`LICENSES.md`](./LICENSES.md)。

## 实际产品驱动演示

如果你想看到“技能能力如何变成产品体验”，可以打开同一工作区中的 [`Ocean Atlas 产品原型`](../ocean-atlas-product-demo/README.md)。它把上游真实的 `threejs-spectral-ocean` 实现接入 Glass Worlds 的 Spatial Stage，并用海面、波谱层、法线、泡沫历史、镜头预设和产品说明面板，完整演示“进入主题 → 观察机制 → 理解产品价值”的路径。

如果你想重点理解“效果是怎样一步步生成的”，可以打开 [`Starfield Process 星空过程案例`](../starfield-process-demo/README.md)。它把 `threejs-procedural-vfx` 的极夜星空与极光实现拆成背景场、星点分布、闪烁、极光体积和最终合成五步，每一步都会改变真实画面。
