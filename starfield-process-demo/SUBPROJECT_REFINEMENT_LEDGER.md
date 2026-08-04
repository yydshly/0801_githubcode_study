# Three.js Graphics Agent Skills 子项目整理记录

## Revision 02 · 早期页面纳入（2026-08-05）

- **Current stage**：Stage 9 · Engineering and delivery closure
- **User phase**：加入并展示
- **Coverage item**：早期 Capability Lab 与 Ocean Atlas 未进入当前总览和发布登记
- **User goal**：在正式研究子项目中看到完整演进关系，并把相关源码发布到远端 `master`
- **Browser environment**：`http://127.0.0.1:4180/project.html`，桌面默认视口；基线页面可运行
- **Observed evidence**：基线 DOM 不包含“研究历程”，页面只显示12个当前演示；实现后桌面 DOM 显示5项索引、3张历程卡和“5+2=7”，无横向溢出；4178包含2个模式与实时 Canvas，4179包含4个研究层、实时 Canvas并显示 `RUNTIME READY`
- **Problem category**：信息与布局缺口
- **Root cause**：正式整理时只纳入 `starfield-process-demo`，两个前置实验仍是相邻独立目录
- **Minimal intervention**：增加研究历程区块和跨本地/发布环境入口；把两个项目登记到统一研究展厅，不重做它们的场景
- **Adjacent regression surfaces**：顶部导航、5项内容索引、桌面卡片、390px 单列、GitHub Pages 子路径资产
- **Observed result**：三个子项目独立构建通过；统一生产基路径构建9个研究项目通过；Capability Lab 与 Ocean Atlas 的本地回链正确
- **Decision**：`pass`（移动端视口证据按下述条件有效 `defer`）
- **Defer**：390px视口复验。已调用浏览器 viewport 控件并分别重载、新建标签，但页面实际 `window.innerWidth` 仍为1280；当可用浏览器能实际切换到390px时，按现有响应式规则复验研究历程单列与5项索引
- **Git evidence**：48个目标文件、0个缓存/日志/重复Skill/范围外文件；提交 `55d3e7e` 已推送到 `origin/master`
- **Unresolved continue**：无
- **Blocked**：无
- **Next executable action**：无；本次范围交付关闭
- **New authority required**：无；用户已授权实现和推送 `master`

## Revision 01 最终状态

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
