# Upstream Gallery Evidence

Date: 2026-08-04

## 结论先说

上游 README 中的两张主要图片是这个仓库自己的示例展示，不是随手找来的概念图：

- `assets/example_gallery.jpeg` 是示例总览图；
- `assets/spectral_ocean.jpeg` 是 Spectral Ocean 的具体效果图。

但图片只负责证明视觉结果。真正可交互的示例由上游仓库的 `dev/example-gallery` 提供；它属于 repository-level development tooling，不属于发布到 npm 的 agent skill 运行时。

## 已验证的运行方式

上游仓库已单独放在：

```text
F:\0801_codex_project\threejs-awesome-graphics-agent-skills-upstream
```

由于上游 `postprocessing@6.37.4` 的 peer dependency 要求 Three.js `<0.178.0`，而当前包声明 `three@^0.185.1`，普通 `npm install` 会遇到 peer dependency 冲突。本次使用上游代码可接受的兼容安装方式：

```powershell
npm install --legacy-peer-deps
npm run dev:examples:no-open -- --port 4173
```

本地图库地址：<http://127.0.0.1:4173/>

## 运行证据

| 示例 | 看到的真实效果 | 运行状态 |
| --- | --- | --- |
| `threejs-spectral-ocean/spectral-cascade-ocean` | 动态频谱海面、波浪细节、FFT 统计、FPS、draw calls、三组 256² 分辨率信息 | pass |
| `threejs-raymarched-space-effects/schwarzschild-geodesic-black-hole` | 曲线光线、黑洞/吸积盘和星场的空间扭曲 | gallery route available |
| `threejs-volumetric-clouds/weather-volume-clouds` | 天气密度、体积云、光照和质量模式 | gallery route available |
| `threejs-water-optics/interactive-pool-volume` | 有限水池、涟漪、折射/吸收和体积水 | gallery route available |

图库首页报告：`31 EXAMPLES`、`RUNTIME READY`。每张卡片都可以进入独立场景，查看暂停、重载、捕获和运行状态；因此它是理解“具体效果怎样”的最直接证据。

## 31 个示例按 skill 分布

| Skill | 示例数量 | 代表场景 |
| --- | ---: | --- |
| atmosphere-aerial-perspective | 1 | LUT aerial perspective |
| parallax-occlusion-mapping | 1 | silhouette relief |
| precipitation-surfaces | 2 | snow accumulation / wet puddle rain |
| procedural-architecture | 1 | procedural financial tower |
| procedural-geometry | 4 | race car / submarine / gallery frame / motorcycle |
| procedural-materials | 2 | soil & moss / lava flow |
| procedural-planets | 1 | procedural planet surface |
| procedural-vegetation | 4 | ash growth / GPU grass / ivy / meadow grass |
| procedural-vfx | 4 | hologram / aurora / reentry plasma / fluid fire |
| raymarched-space-effects | 2 | accretion volume / geodesic black hole |
| spectral-ocean | 4 | clear water / spectral cascade / above-below / submerged Snell |
| temporal-surfaces | 2 | refractive rain window / touch-history frost |
| volumetric-clouds | 1 | weather volume clouds |
| water-optics | 2 | analytic waves / interactive pool volume |

合计 31 个。`camera-direction`、`procedural-animation`、`procedural-fields`、`shadow-systems`、`screen-space-ambient-occlusion`、`bloom`、`exposure-color-grading`、`image-pipeline`、`skill-router`、`visual-validation` 更像可被多个示例共同调用的基础系统，所以不应把“没有独立卡片”误解成“没有能力”。

## 这对我们的理解意味着什么

需要把三种东西分开：

1. **Skill**：给 AI 的实现知识、路由规则和约束；
2. **Example**：证明某个机制已经被写成可运行的 Three.js 实现；
3. **Gallery adapter**：为展示补齐场景、相机、静态资产、运行控制和元数据。

所以它不会直接替我们生成一个产品页面，也不会自动把 24 个效果装进 Glass Worlds。它的价值是提供一套经过示例验证的视觉实现词汇，让我们能从“想要高级一点”推进到“需要 camera direction + procedural materials + image pipeline，并用 visual validation 证明结果”。

## 许可边界

README 图片和示例实现来自上游仓库。当前 lab 只把两张 README 证据图复制到本地研究页面，并保留上游链接；如果未来把示例代码、素材或图库适配器直接并入商业产品，需要继续按上游 `LICENSE`、`source_materials` 和第三方素材声明复核。
