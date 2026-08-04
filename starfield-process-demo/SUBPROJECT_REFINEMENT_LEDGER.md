# Three.js Graphics Agent Skills 子项目整理记录

## 最终状态

- **Current stage**：Stage 9 · Engineering and delivery closure
- **User goal**：把原始库、库的能力、现有演示和对我们的影响整理为正式且尽量完整的研究子项目。
- **Canonical runtime**：`npm run dev` → `http://127.0.0.1:4180/project.html`
- **Decision**：`pass`
- **Unresolved continue**：无
- **Blocked**：无
- **Defer**：无

## 证据记录

### 1. 信息完整性

- 上游固定为 `0.6.0` / `ba164002ebac362588436b2c833cd72caf1e2277`。
- 24 个上游 `SKILL.md`、24 个项目安装 Skill、24 个能力目录 ID 完全一致。
- 上游 gallery：14 个 Skill、31 个 `example.json`。
- 本地演示：12 个唯一 ID 和链接，2 个直接实现、4 个机制组合、6 个产品原型。
- 场景和六个配方的 Skill 引用全部有效。

### 2. 上游验证

- Windows 原始 CRLF 检出会触发上游只接受 LF 的 frontmatter 正则误报；未修改上游镜像。
- 临时 LF 副本：24 Skill 内容校验通过。
- 路由测试通过：35 forward / 15 ambiguity boundaries / 23 atomic routes。
- 参考实现 parity 和资产来源测试通过。
- Installer 测试尝试用户级 universal 安装，与 local-only 边界冲突，未提升权限，未写入全局目录。

### 3. 工程验证

- `npm run audit`：通过。
- `npm run build`：通过，5 个 HTML 入口和研究文档进入 `dist`。
- 根目录 `node scripts/build-research-pages.mjs`：通过，共构建 6 个正式研究项目。
- 已知提示：Three.js / OrbitControls 共享 chunk 约 574KB（gzip 143.49KB）；属于生产优化提示，不影响当前研究子项目运行。

### 4. 浏览器验证

- 桌面 1280px：总览页 5 个能力组、24 个 Skill 入口、12 个演示卡、3 个证据等级、5 份研究文档全部存在；页面无横向溢出。
- 手机 390×844：首屏、责任链和演示矩阵为单列；演示卡宽约 335px；页面无横向溢出。
- `$ROUTER` 从总览精确打开 `skills.html?skill=threejs-skill-router`，详情显示正确。
- Level A 第一项精确打开项目级程序化行星 Skill 实验。
- 园区数字孪生入口精确打开 `application=park-twin`，运行模式为 `park-twin`。
- 原始示例库 `http://127.0.0.1:4173/` 返回 HTTP 200。

## 交付内容

- `project.html` + `src/project-main.js` + `src/project-styles.css`
- `PROJECT_MANIFEST.json`
- `docs/01-UPSTREAM_LIBRARY.md` 至 `docs/05-MAINTENANCE.md`
- `scripts/audit-subproject.mjs` 与 `scripts/copy-docs.mjs`
- 根 `research-projects.json` 项目 06 登记与根 README 说明
- 现有四个演示页面的“研究总览”导航入口

