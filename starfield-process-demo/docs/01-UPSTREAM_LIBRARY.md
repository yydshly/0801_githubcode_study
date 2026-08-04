# 01 · 原仓库审计

## 固定来源

| 字段 | 当前证据 |
| --- | --- |
| 上游仓库 | `scottstts/Threejs-Awesome-Graphics-Agent-Skills` |
| GitHub | <https://github.com/scottstts/Threejs-Awesome-Graphics-Agent-Skills> |
| 本地只读镜像 | `../threejs-awesome-graphics-agent-skills-upstream` |
| npm 包 | `threejs-awesome-graphics-agent-skills` |
| 审计版本 | `0.6.0` |
| 固定提交 | `ba164002ebac362588436b2c833cd72caf1e2277` |
| Node.js 要求 | `>=18` |
| 包许可表达式 | `MIT AND GPL-3.0-only` |
| Skill 数量 | 24 |
| 带开发示例的 Skill | 14 |
| 开发示例数量 | 31 |

这些固定值同时保存在 [`PROJECT_MANIFEST.json`](../PROJECT_MANIFEST.json)，并由 `npm run audit` 检查数量一致性。

## 它是什么

它是面向 Codex、Claude Code、Cursor、Copilot、Gemini CLI、Windsurf 等 AI 编程 Agent 的 Three.js 高级图形 Skill 包。核心目标不是重复 Three.js API 文档，而是提供“高级效果究竟怎样实现”的技术词汇和工程约束。

一个典型 Skill 会包含：

- `SKILL.md`：触发条件、实现流程、关键机制、不可妥协项、调试和验收。
- `references/`：更详细的系统设计、数学、渲染与质量说明。
- `examples/`：可迁移的效果实现代码，只有部分 Skill 提供。
- `assets/`：效果必要的纹理、模型或辅助资产，只有部分 Skill 提供。
- `agents/openai.yaml`：Agent 展示或路由元信息。

仓库还包含：

- `dev/example-gallery/`：开发用可视化示例库。
- `source_materials/`：来源追踪、第三方声明、覆盖率和路由测试数据。
- `scripts/`：包校验、路由测试、安装测试、资产来源测试与示例捕获。
- `bin/`：把 Skill 安装到不同 Agent 的命令行工具。

## 它不是什么

- 不是浏览器运行时 3D 引擎；运行层仍然是 Three.js、WebGL/WebGPU 和 GPU。
- 不是调用一个函数就出现完整海洋或城市的业务 SDK。
- 不是游戏引擎；不负责碰撞、敌人 AI、任务、存档和关卡内容。
- 不是数字孪生平台；不提供 GIS、BIM、视频流或运营数据。
- 不是“24 个一键场景”；规范型 Skill 可能没有自己的独立示例。

## 原始 README 图片是不是它自己的演示

是，但需要准确理解：

- README 的 `assets/example_gallery.jpeg` 是上游开发示例库的总览图。
- `assets/spectral_ocean.jpeg` 是其中海洋能力的代表效果。
- 图中效果来自 Skill 随附实现和上游开发 gallery 的场景适配器共同运行。
- Skill 目录拥有“可复用效果实现”；gallery shim 拥有相机、舞台、运行时、检查面板和部分辅助资产。
- 所以图片能证明仓库包含对应图形实现，但不能理解为“安装 Skill 后业务页面自动出现这些完整构图”。

## 原始示例库

上游的 `dev/example-gallery` 会自动发现：

```text
dev/example-gallery/examples/<skill>/<example>/scene.js
dev/example-gallery/examples/<skill>/<example>/example.json
```

当前固定版本中共有 31 个示例，分布在 14 个 Skill：

| Skill | 示例数 |
| --- | ---: |
| atmosphere-aerial-perspective | 1 |
| parallax-occlusion-mapping | 1 |
| precipitation-surfaces | 2 |
| procedural-architecture | 1 |
| procedural-geometry | 4 |
| procedural-materials | 2 |
| procedural-planets | 1 |
| procedural-vegetation | 4 |
| procedural-vfx | 4 |
| raymarched-space-effects | 2 |
| spectral-ocean | 4 |
| temporal-surfaces | 2 |
| volumetric-clouds | 1 |
| water-optics | 2 |

相邻镜像中运行：

```powershell
npm run dev:examples:no-open
```

本地示例入口通常为 <http://127.0.0.1:4173/>。它是上游开发工具，不会随 Skill 安装到业务项目。

## 安装模型

上游命令行支持用户级和项目级安装。我们的原则是只使用项目级安装：

```text
starfield-process-demo/.codex/skills/
```

当前清单表明版本 `0.6.0`、Agent 为 Codex、`completePack: true`、24/24 Skill 齐全。没有写入用户全局 Skill 目录。

## 许可与第三方来源

仓库根 `LICENSE` 是 MIT，但包的许可表达式是 `MIT AND GPL-3.0-only`，原因是部分示例/资产包含或改编了 GPL-3.0 来源。`source_materials/THIRD_PARTY_NOTICES.md` 还记录了 Three.js 参考、海洋、水体、草地、雨雪、植被、POM、体积火焰等第三方来源。

因此：

- 研究、学习和内部原型可以保留完整来源记录。
- 商用前必须逐项审查真正被复制、发布或打包的代码和资产。
- 不能只看到根 MIT 文件，就推断所有示例与资产都可按纯 MIT 处理。
- 我们的本地 `UPSTREAM_SOURCE.md` 只记录来源边界，不替代正式法律审查。
- 提交到研究仓库时，同时保留 `LICENSES/UPSTREAM-MIT.txt`、`LICENSES/GPL-3.0.txt`、`LICENSES/THIRD_PARTY_NOTICES.md` 和 `LICENSES/trace-manifest.json`。

## 上游与我们项目的边界

```text
上游镜像（保持来源真实性）
  ├─ 24 SKILL.md
  ├─ references / examples / assets
  ├─ 31 个开发示例
  └─ 来源和许可记录

我们的研究子项目
  ├─ 项目级安装的 24 Skill
  ├─ 能力解释和调用实验
  ├─ 采用或改写后的 Three.js 演示
  ├─ 产品场景与业务解释
  └─ 真实性等级、验证和研究结论
```

## 本地上游校验证据

固定版本的 Windows 检出使用 CRLF，而上游 `validate-pack.mjs` 的 frontmatter 正则只接受 LF；直接运行会把 24 个完整 YAML 头全部误报为缺失。我们没有修改上游镜像，而是在临时副本中仅规范化换行后复验：

- 包内容校验：通过，识别 24 个专家 Skill。
- Agent 路由：通过，35 个正向案例、15 个边界案例、23 个原子路由。
- 参考实现来源哈希：文本换行规范化后通过。
- 示例资产来源：通过。
- Installer 测试：没有作为通过项；它尝试写入用户级 `.agents`，与本子项目“只允许项目级安装”的明确边界冲突，因此不提升权限、不写入全局目录。

这说明 Skill 内容、路由、参考实现和资产来源在规范化文本环境下成立，同时保留了 Windows 原始校验脚本的换行兼容性缺陷和本项目的安装权限边界。
