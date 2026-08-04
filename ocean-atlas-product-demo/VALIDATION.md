# Ocean Atlas Validation

验证日期：2026-08-04

## 构建

- `npm install`：通过；
- `npm run build`：通过；
- 构建只有 Vite 的大 chunk 提示（约 565 kB），不是构建失败。

## 桌面浏览器

在 `http://localhost:4179/` 实测：

- 页面标题：`Ocean Atlas · Glass Worlds Product Prototype`；
- 状态：`RUNTIME READY`；
- 海面：来自上游 `SpectralOceanSystem`，不是静态截图或 CSS 模拟；
- 指标示例：`256² × 3`、`DRAW CALLS 2`、`IFFT CHECK PASS 1.3E-7`、约 `238 FPS`；
- `海面 / 波谱层 / 法线 / 泡沫` 均可切换，切换后说明文案和 debug shader 状态同步变化；
- 三个镜头预设可用；暂停 / 继续和速度切换可用；
- `为什么是海洋？` 可以打开产品说明面板，关闭后回到海面；
- 控制和说明面板交互后，浏览器没有 error / warn 日志。

## 移动浏览器

在 390 × 844 视口实测：

- 页面没有横向溢出，海面保持为持续可见的主舞台；
- 右侧检视器转为底部面板，层切换、暂停和速度控制可达；
- `波谱层` 可以切换；
- 产品说明面板在窄屏从顶部进入并可通过关闭按钮收起；
- 没有 error / warn 日志。

## 证据边界

这些结果来自运行中的浏览器页面和真实渲染状态。源码和构建通过并不替代浏览器实测；如果未来替换 Three.js 版本、分辨率或移动端 GPU，需要重新执行这份验证。
# 2026-08-05 repository integration

- Production subpath build passed with `--base=/0801_githubcode_study/projects/ocean-atlas/`.
- Local runtime is fixed at `http://127.0.0.1:4179/` and now links back to the project06 research lineage.
- Browser verification confirmed four research layers, a live canvas, `RUNTIME READY`, a hidden fallback error and no desktop horizontal overflow.
- The copied spectral-ocean implementation remains isolated under `src/upstream/spectral-ocean/`; `LICENSES.md` points to the canonical repository license copies.
