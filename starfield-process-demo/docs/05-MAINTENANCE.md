# 05 · 维护与复验

## 目录责任

| 目录/文件 | 责任 | 是否允许本项目修改 |
| --- | --- | --- |
| `../threejs-awesome-graphics-agent-skills-upstream/` | 固定上游镜像和原始示例库 | 否；只更新来源版本 |
| `.codex/skills/` | 当前子项目可被 Codex 发现的 24 Skill | 只通过项目级安装/更新 |
| `src/upstream/` | 明确采用的上游演示实现 | 可以做最小适配，但必须记录 |
| `src/*.js` | 我们的 Three.js 场景和页面 | 可以修改 |
| `src/skills-catalog.js` | 24 Skill 中文能力数据和 12 场景归属 | 可以更新，但必须审计引用 |
| `PROJECT_MANIFEST.json` | 版本、提交、计数和入口的固定事实 | 上游或演示变化时更新 |
| `UPSTREAM_SOURCE.md` | 采用源码和改动边界 | 每次复制/适配上游代码时更新 |
| `docs/` | 研究结论和维护说明 | 事实变化时同步更新 |

## 本地运行

```powershell
cd F:\0801_codex_project\starfield-process-demo
npm install
npm run dev
```

规范入口：

- 研究总览：<http://127.0.0.1:4180/project.html>
- 24 Skill 地图：<http://127.0.0.1:4180/skills.html>
- Skill 控制实验：<http://127.0.0.1:4180/skill-lab.html>
- 效果实验室：<http://127.0.0.1:4180/>
- 应用展厅：<http://127.0.0.1:4180/applications.html>

## 自动审计

```powershell
npm run audit
```

审计必须同时确认：

- 上游存在 24 个 `SKILL.md`。
- 项目 `.codex/skills` 安装 24 个 `SKILL.md`。
- `skills-catalog.js` 有 24 个唯一 Skill。
- 24 个上游 ID、安装 ID、能力目录 ID 完全一致。
- 上游 gallery 有 31 个 `example.json`，分布在 14 个 Skill。
- 本地有 12 个唯一场景链接，分组为 2 / 4 / 6。
- 场景引用的所有 Skill ID 都存在。
- `PROJECT_MANIFEST.json` 的版本和计数与实际一致。

## 构建

```powershell
npm run build
```

Vite 多页面构建必须包含：

- `project.html`
- `skills.html`
- `skill-lab.html`
- `index.html`
- `applications.html`

Three.js 与 OrbitControls 可能产生大于 500KB 的共享 chunk 警告。警告本身不等于构建失败，但生产发布前应继续测量入口 gzip、动态加载和弱设备表现。

## 上游示例库

```powershell
cd F:\0801_codex_project\threejs-awesome-graphics-agent-skills-upstream
npm run dev:examples:no-open
```

默认入口通常是 <http://127.0.0.1:4173/>。如果端口变化，以命令输出为准。

## 更新上游时的顺序

1. 记录新版本、提交和发布时间。
2. 阅读上游 README、package、LICENSE、第三方声明和变更记录。
3. 比较 24 Skill 目录、`SKILL.md`、references、examples 和 assets。
4. 在上游镜像运行 `npm run validate`、`npm test` 和必要的 gallery 检查。
5. 使用项目级安装更新 `.codex/skills`，禁止改成全局安装。
6. 更新 `PROJECT_MANIFEST.json`、能力目录、示例统计和来源记录。
7. 运行 `npm run audit` 和 `npm run build`。
8. 浏览器复验总览、能力页、直接实验、组合场景和产品原型。
9. 商用或发布前重新检查真正打包的第三方代码和资产许可。

### Windows 上游校验说明

固定提交中的文本为 CRLF，但上游 `validate-pack.mjs` 用只匹配 LF 的正则读取 YAML frontmatter。不要因此修改上游镜像或错误判断 24 个 Skill 缺少元数据。需要复验时，在临时副本中把文本换行规范化为 LF，再运行内容、路由、引用和资产检查。Installer 测试会尝试用户级安装，不符合本项目的 local-only 策略，不应提升权限运行。

## 浏览器验收矩阵

| 页面 | 桌面 | 手机 390px | 关键动作 |
| --- | --- | --- | --- |
| 总览 | 首屏、四主线、来源、能力、演示、影响 | 无横向溢出、索引和卡片可读 | 进入能力页和至少一个演示 |
| 能力地图 | 24 条、搜索、分类、详情、场景筛选 | 卡片到详情阅读路径 | 点击 Skill 与场景深链接 |
| Skill 控制实验 | 行星可拖动、阶段真实切换 | 面板可读、控制可达 | 自动播放、诊断视图、重置 |
| 效果实验室 | 场景选择、拖动缩放、聚焦 | 主要控件不遮挡唯一主体 | 直达暴雨城市或火星 |
| 应用展厅 | 应用切换、阶段、天气、对象/游戏状态 | 抽屉和触控可用 | 直达园区或夜雨游戏 |

## 真实性维护规则

- 只有直接导入或采用上游实现的场景可标记为 Level A。
- 只遵循 Skill 机制但由我们编写的场景必须标记为 Level B。
- 加入任务、业务和数据意义的场景标记为 Level C，并写清外部系统缺口。
- 页面截图不是来源证据；必须能追踪到文件、运行路径和固定版本。
- 构建成功不是视觉证据；可运行页面必须经过真实浏览器检查。
