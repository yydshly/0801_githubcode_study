# Glass Worlds Gallery

> **状态：阶段归档。** 当前实现作为可运行研究子项目保留；后续不再进行无明确场景的持续调参，而是在品牌首页、研究展厅、能力地图或实时模型入口等具体需求出现时按需重启。

[打开原始参考](https://www.happyoyster.com/home) · [打开在线演示](https://yydshly.github.io/0801_githubcode_study/projects/glass-worlds-gallery/) · [查看原始/本地对比](./DEMO_COMPARISON.md) · [查看完整阶段归档](./ARCHIVE.md)

研究项目 05。它把参考页面中的“漂浮玻璃世界”视觉语言，转换成一个可运行、可交互、可复用的研究展厅。

## 研究问题

一个看起来像“实时生成世界”的首页，是否必须依赖世界模型？这个样例给出的答案是：**首页的星系动效层不需要。** 当前效果由 Three.js 与前端完成：透明玻璃材质、图片纹理内球、GPU 星尘、摄像机视差和多图混合共同制造“摄影机穿过星系并发现世界”的感受。

每个球体包含 3 张真实图片，并按时间轮换。点击球体后可以查看该研究主题的三张场景图、简介和研究线索；底部“Create a new world”打开的是本地交互样例，不会调用模型、不会消耗 token，也不会上传数据。

## 实现结构

```text
全屏 WebGL 星系舞台
├─ 1,790 个固定屏幕像素尺寸、按摄影机视锥均匀散布的圆形 GPU 星尘粒子
├─ 8 个按四象限均匀调度、向摄影机铺面而来的星球组
│  ├─ 图片纹理内球：3 张场景图在 Shader 中混合
│  ├─ 双层 MeshPhysicalMaterial 透明玻璃外壳与内层光学壳
│  ├─ Fresnel Shader 边缘高光与随视角移动的双镜面高光
│  ├─ 4 条固定物理尺寸的世界空间通道 + 4 条屏幕导演轨迹
│  └─ 角度与生命周期调度避免重叠，完全离开视锥后在远处循环投放
├─ 连续深度速度、摄影机轻微漂移、鼠标视差与滚轮同步加速
├─ 顶部模式导航
├─ 选中世界的详情面板
└─ 本地 World Composer 对话框
```

主要空间实现位于 [`src/GalaxyCanvas.jsx`](./src/GalaxyCanvas.jsx)，DOM 交互位于 [`src/App.jsx`](./src/App.jsx)，界面样式位于 [`src/styles.css`](./src/styles.css)。场景图片位于 [`public/assets/scenes`](./public/assets/scenes)，后续可以逐球替换为专门生成的写实场景，而无需改动玻璃材质和飞行逻辑。

## 复杂度判断

| 层级 | 做什么 | 复杂度 | 是否需要模型 |
| --- | --- | --- | --- |
| 当前样例 | WebGL 透明玻璃球、纹理混合、GPU 粒子、摄影机穿行和视锥循环 | 高 | 否 |
| 视觉增强 | 球面折射 Shader、真实反射、鼠标视差、GPU 后处理 | 中高 | 否 |
| 实时生成 | 摄像头或提示词持续改变球内视频 | 高 | 是，通常还需要流式推理 API |
| 可交互世界 | 用户动作改变场景状态并保持连续性 | 很高 | 是，通常需要世界模型或游戏引擎状态层 |

这个样例适合用来验证视觉方向和产品信息架构。只有当球内内容要根据用户输入实时生成、持续响应并保持世界状态时，才需要接入 Lucy、Oasis、Genie 一类模型或其他实时视频服务。

## 本地运行

```powershell
npm install
npm run dev
```

生产构建与站点打包检查：

```powershell
npm run build
npm run test:sites
```

构建输出位于 `dist/client`，也已登记到仓库统一研究展厅。

## 当前边界

- 不接入 AI、API、token、登录或数据持久化。
- 球体持续掠过摄影机并从画面边缘自然离开，不通过透明度提前消失。
- 支持键盘焦点、Esc 关闭、降低动态效果偏好和无毛玻璃降级。
- 手机端保留横向空间舞台，不转换成长列表。
- 当前使用 8 张已经生成并压缩为 WebP 的专用电影场景图；运行时不调用图片模型或任何外部服务。

参见 [`ARCHIVE.md`](./ARCHIVE.md)、[`DEMO_COMPARISON.md`](./DEMO_COMPARISON.md)、[`IMPLEMENTATION_ANALYSIS.md`](./IMPLEMENTATION_ANALYSIS.md)、[`DESIGN_CONTRACT.md`](./DESIGN_CONTRACT.md)、[`VALIDATION.md`](./VALIDATION.md) 和 [`design-qa.md`](./design-qa.md)。

## 参考页运动重构

当前版本不再让球体真正穿过摄影机。每个球体使用一个 `0 → 1` 的连续生命周期：远景进入、沿固定象限方向逐渐向外移动、在受控近景尺度内完成贴边掠过，完全越过最近的画面边界后再回收到远处。4 个球使用固定物理尺寸和世界空间直线，让透视决定投影大小；另外 4 个球保留屏幕空间导演轨迹作为对照。两组都使用安全近端距离，不会出现距离趋近于零时的无限透视放大。

这一混合方案保留了：

- Three.js 双层物理玻璃、Fresnel 边缘和内部图片球；
- 稀疏、固定像素尺寸的 GPU 粒子；
- 鼠标视差、滚轮加速、射线选择和多图切换；
- 桌面铺面飞行与 390px 窄屏的宽高比尺寸约束。

浏览器已完成 8 秒参考对比、24 秒完整生命周期、桌面与移动端截图、世界详情、创建器、Escape 关闭和焦点返回检查。证据边界与待复测项记录在 [`VALIDATION.md`](./VALIDATION.md)。

## 当前粒子系统

归档版本保持 1,790 个固定像素圆形粒子：1,450 个背景点和 340 个前景点都使用 `1.18 CSS px` 尺寸，并均匀分布于摄影机视锥。远近只通过速度、亮度、透明度和视差表达；生命周期包含远处渐入与近处渐出，不会恢复早期版本的中心聚集、方块粒子、尺寸膨胀或过密效果。

专属电影场景纹理已经离线生成并保存在项目中，不要求项目运行时 token。未来替换图片时，应先检查一张球形裁切、主体位置和曝光，再扩展为整组资产。

## Generated cinematic scene set

The runtime now uses eight dedicated local WebP scene textures in `public/assets/scenes/generated/`: alpine village, rainy city, desert expedition, underwater ruins, moonlit forest, virtual try-on atelier, physical-AI frontier, and evidence archive. They were generated once through the user's signed-in ChatGPT image page and then compressed for the prototype. The live application does not call ChatGPT, an image API, or any model service, so viewing and interacting with the gallery requires no API key or token.

Revision 9 calibrates these photographic textures for spherical display: reduced broad glass wash, stronger localized depth cues, lifted dark-scene detail, longer middle-depth dwell, non-accumulating sector jitter, and a narrower 390px radius cap that prevents near-world overlap.
