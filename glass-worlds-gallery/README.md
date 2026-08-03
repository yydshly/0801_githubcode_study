# Glass Worlds Gallery

研究项目 05。它把参考页面中的“漂浮玻璃世界”视觉语言，转换成一个可运行、可交互、可复用的研究展厅。

## 研究问题

一个看起来像“实时生成世界”的首页，是否必须依赖世界模型？这个样例给出的答案是：**首页的星系动效层不需要。** 当前效果由 Three.js 与前端完成：透明玻璃材质、图片纹理内球、GPU 星尘、摄像机视差和多图混合共同制造“摄影机穿过星系并发现世界”的感受。

每个球体包含 3 张真实图片，并按时间轮换。点击球体后可以查看该研究主题的三张场景图、简介和研究线索；底部“Create a new world”打开的是本地交互样例，不会调用模型、不会消耗 token，也不会上传数据。

## 实现结构

```text
全屏 WebGL 星系舞台
├─ 1,790 个固定屏幕像素尺寸、按摄影机视锥均匀散布的圆形 GPU 星尘粒子
├─ 8 个占据不规则环形分区、向摄影机铺面而来的星球组
│  ├─ 图片纹理内球：3 张场景图在 Shader 中混合
│  ├─ 双层 MeshPhysicalMaterial 透明玻璃外壳与内层光学壳
│  ├─ Fresnel Shader 边缘高光与随视角移动的双镜面高光
│  ├─ 屏幕投影尺寸检测、三轮近景避让与分区外扩
│  └─ 球体靠近后沿分区向边缘加速展开，完全离开视锥后在远处循环投放
├─ 1.2× 基础穿行速度、摄影机轻微漂移、鼠标视差与滚轮加速
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
- 内置图片生成服务本轮连接失败，因此先使用仓库内的真实研究封面；服务恢复后可再次生成专用场景图。

参见 [`IMPLEMENTATION_ANALYSIS.md`](./IMPLEMENTATION_ANALYSIS.md)、[`DESIGN_CONTRACT.md`](./DESIGN_CONTRACT.md)、[`VALIDATION.md`](./VALIDATION.md) 和 [`design-qa.md`](./design-qa.md)。

## 参考页运动重构

当前版本不再让球体真正穿过摄影机。每个球体使用一个 `0 → 1` 的连续生命周期：远景以较小屏幕尺寸进入，沿固定角度扇区逐渐向外加速，在受控的最大直径内完成近景展示，完全越过最近的画面边界后再回收到远处。屏幕尺寸会被映射回安全的 Three.js 深度和缩放，因此玻璃球仍是真正的 3D 几何体，但不会出现距离趋近于零时的无限透视放大。

这一混合方案保留了：

- Three.js 双层物理玻璃、Fresnel 边缘和内部图片球；
- 稀疏、固定像素尺寸的 GPU 粒子；
- 鼠标视差、滚轮加速、射线选择和多图切换；
- 桌面铺面飞行与 390px 窄屏的宽高比尺寸约束。

浏览器已完成 8 秒参考对比、24 秒完整生命周期、桌面与移动端截图、世界详情、创建器、Escape 关闭和焦点返回检查。证据边界与待复测项记录在 [`VALIDATION.md`](./VALIDATION.md)。

## 粒子亮度校准

Revision 8 保持 1,850 个固定像素圆形粒子、均匀视锥分布和原有运动速度，只提高冰白蓝色亮度与远景最低可见度。这样星场更清楚，但不会恢复早期版本的中心聚集、方块粒子或过密效果。

专属电影场景纹理仍使用内置图片生成路径，不要求项目运行时 token。本轮完整提示与短提示都在图片服务回传阶段失败，因此没有把未验证文件写入项目；服务恢复后应先生成并检查一张，再扩展为八张独立场景。

## Generated cinematic scene set

The runtime now uses eight dedicated local WebP scene textures in `public/assets/scenes/generated/`: alpine village, rainy city, desert expedition, underwater ruins, moonlit forest, virtual try-on atelier, physical-AI frontier, and evidence archive. They were generated once through the user's signed-in ChatGPT image page and then compressed for the prototype. The live application does not call ChatGPT, an image API, or any model service, so viewing and interacting with the gallery requires no API key or token.

Revision 9 calibrates these photographic textures for spherical display: reduced broad glass wash, stronger localized depth cues, lifted dark-scene detail, longer middle-depth dwell, non-accumulating sector jitter, and a narrower 390px radius cap that prevents near-world overlap.
