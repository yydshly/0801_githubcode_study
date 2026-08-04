# Ocean Atlas · Glass Worlds Product Prototype

这是一个把 `Threejs-Awesome-Graphics-Agent-Skills` 的真实海洋实现放进产品语境的可运行原型。

## 先看结果

启动后打开：<http://localhost:4179/>

```powershell
npm install
npm run dev
```

生产构建检查：

```powershell
npm run build
```

## 这个产品方向是什么？

我为 Glass Worlds 选择了 **Ocean Atlas / 海洋研究世界**：把“海洋”从一张漂亮背景变成一个可以进入、观察、比较和解释的研究主题。

页面里的体验链路是：

```text
进入研究世界 → 看到真实海面 → 拆解波谱层 → 检查法线 / 泡沫历史 → 理解产品价值
```

右上角的“为什么是海洋？”会打开产品说明面板，解释三件事：

- 产品工作：为什么海洋适合作为尺度、时间、能量的空间内容容器；
- Skill 证明：上游实现具体提供了什么可验证的能力；
- 产品下一步：未来如何接入研究数据、世界导航和内容管理。

## 这里哪些部分来自 skill？

`src/upstream/spectral-ocean/` 中的五个文件直接来自上游的
`skills/threejs-spectral-ocean/examples/spectral-cascade-ocean/`，负责真正的方向性波谱、FFT / IFFT、海面位移、解析法线和泡沫相关纹理。

`src/main.js` 和 `src/styles.css` 是本原型的产品壳层，负责：

- 把真实海面挂到 Glass Worlds 的 Spatial Stage；
- 把 `final / cascade-bands / normals / jacobian` 变成可理解的研究层；
- 提供镜头预设、暂停 / 速度、运行指标和 IFFT 检查；
- 用产品说明面板解释“技术能力为什么对产品有意义”。

所以，skill 不是一个安装后自动出现海洋的运行时引擎；它提供实现契约、方法和示例源码，最终效果由 Three.js 运行这些实现产生。

## 交互入口

- `海面`：完整海面结果；
- `波谱层`：拆开 250m、17m、5m 三个尺度，理解海浪不是单一噪声；
- `法线`：查看解析法线如何帮助光照和水面可读性；
- `泡沫`：查看 Jacobian / 泡沫历史如何形成视觉反馈；
- `Horizon hold / Crest inspection / Scale / distance`：从远景、浪峰和尺度三个镜头理解空间；
- `暂停海面` 与速度按钮：观察动画状态和时间驱动；
- `为什么是海洋？`：阅读产品映射。

## 代码边界与许可

上游来源与复制边界见 [`UPSTREAM_SOURCE.md`](./UPSTREAM_SOURCE.md)。上游声明为 `MIT AND GPL-3.0-only`；如果把复制的实现或素材带入商业产品，需要重新核对许可证、源码边界和第三方声明。

仓库内的许可文本位置和本原型的文件边界见 [`LICENSES.md`](./LICENSES.md)。

## 设计与验证记录

- [`DESIGN_CONTRACT.md`](./DESIGN_CONTRACT.md)：Spatial Stage、产品任务和验收条件；
- [`VALIDATION.md`](./VALIDATION.md)：浏览器实测、移动端实测、性能指标和已知构建提示。
