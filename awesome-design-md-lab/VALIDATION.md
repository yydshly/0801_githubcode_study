# Awesome DESIGN.md Lab · Validation

## Scope

- Primary journey: 总览 → 风格档案 → 选择案例 → 查看 Token / 设计判断 → 文件结构 → 复制 Agent 指令。
- Required viewports: desktop 1440×900、tablet 1024×768、mobile 390×844。
- Input: 鼠标 / Pointer、键盘 Tab、Enter / Space；复制按钮使用浏览器 Clipboard API，失败时保留手动复制路径。
- Theme: 深色研究编辑台；品牌样例内部允许浅色和深色 Token 表面，不提供独立主题切换。
- Runtime: 静态 HTML / CSS / JavaScript；无后端、无登录、无外部模型调用。

## Coverage manifest

| 用户阶段 | Surface / state | Evidence | Status |
| --- | --- | --- | --- |
| 研究总览 | 首屏 Hero、指标、文件示意 | 静态服务器 `http://127.0.0.1:4181/` 返回 `200`；HTML 已加载 `styles.css`；页面含中文 Hero、74 / 09 / 02 / 00 指标和 DESIGN.md 示意 | pass |
| 风格档案 | 全部 / 类别筛选 | `app.js` 含 8 个筛选类别；9 个代表案例与筛选渲染路径已完成静态检查 | pass |
| 风格档案 | Linear、Stripe、Vercel 等选中态 | 9 个案例数据均含颜色、字体、圆角、间距、签名判断和上游文件链接 | pass |
| 文件结构 | YAML / Markdown 双层卡片 | HTML 中存在 `token-card` 与 `rationale-card`，并展示 colors / typography / Do's and Don'ts | pass |
| 文件结构 | 9 个章节切换与解释 | `sections` 数组包含 9 项；章节按钮更新 `section-explainer` | pass |
| 使用流程 | 四步流程和边界说明 | HTML 中存在 4 个 flow step 和“能提供 / 不能替代”边界卡 | pass |
| 使用流程 | 复制中文 Agent 指令 | 已接入 Clipboard API；失败分支会显示手动复制提示 | pass |
| 响应式 | 1024px、390px 无横向溢出 | CSS 已提供 980px / 720px 断点；自动浏览器尺寸证据因组件故障延期 | defer |
| 键盘 | 主要链接、筛选、案例、章节、复制按钮可聚焦 | 使用原生 `a` / `button`，筛选、案例、章节和复制入口均为可聚焦控件；自动键盘路径因组件故障延期 | defer |
| 动效 | reduced-motion 下内容和操作仍可用 | CSS 提供 `prefers-reduced-motion: reduce` 分支；自动媒体模拟因组件故障延期 | defer |
| 工程 | 静态文件和研究展厅构建器 | `node --check awesome-design-md-lab/app.js` 通过；统一构建器成功生成 7 个项目；7 个公开文件均返回 `200` | pass |

## Browser refinement ledger

```text
Current stage: 2 · refinement evidence recorded
User phase: 研究总览
Coverage item: 页面能通过静态服务器打开并显示首屏
User goal: 理解这个库的定位和展示入口
Browser environment: 本地静态服务器；应用内浏览器控制连接
Observed evidence: `Invoke-WebRequest` 对 `index.html`、`app.js`、`styles.css`、README、设计契约、上游快照和验证记录均返回 `200`；研究展厅统一构建成功
Problem category: 浏览器自动化基础设施
Root cause: 浏览器控制组件返回 `failed to write kernel assets: 系统找不到指定的路径。 (os error 3)`，连最小的页面连接检查也无法执行
Minimal intervention: 未修改页面来绕过环境错误；已通过 `codex_app__open_in_codex` 排队打开 `http://127.0.0.1:4181/`，并保留静态、源码和构建证据
Adjacent regression surfaces: Hero 右侧 DESIGN.md 示意、顶部导航、手机宽度
Observed result: 代码和资源可访问；桌面 / 手机截图、真实点击和剪贴板反馈需要在浏览器控制恢复后补验
Decision: defer
Next executable action: 浏览器控制组件恢复后，按 1440×900、1024×768、390×844 重新执行截图、筛选、章节、复制、键盘和 reduced-motion 路径
New authority required: none
```

## Static smoke evidence

```text
DESIGN.md files in upstream snapshot: 74
Featured design cases in app.js: 9
Catalog names matched to upstream folders: 74 / 74
Static files served successfully: 7 / 7
Research pages built successfully: 7 / 7
JavaScript syntax check: pass
```

自动浏览器验收不是页面能力缺失，而是本轮桌面环境的浏览器控制基础设施不可用；因此相关项目明确标为 `defer`，不伪造截图或交互结果。

## Revision 2 · 页面格式修复

```text
Current stage: 3 · information and layout calibration
User phase: 页面打开与首屏浏览
Coverage item: 页面必须加载项目设计样式，而不是浏览器默认 HTML 样式
User goal: 正常看到中文 DESIGN.md 档案馆布局
Browser environment: http://127.0.0.1:4181/
Observed evidence: 用户在实际页面报告格式不对；随后 HTTP 检查确认 HasStyleLink=False，index.html 中只有 app.js 入口，没有 styles.css 入口
Problem category: 页面资源接线 / 整体格式丢失
Root cause: index.html 的 <head> 漏掉 <link rel="stylesheet" href="./styles.css" />
Minimal intervention: 只补充本地样式表引用，保留内容结构、数据与交互代码
Adjacent regression surfaces: app.js 模块入口、源目录静态服务、.pages 发布副本
Observed result: 页面、styles.css、app.js 均返回 200；styles.css 为 text/css；源页面和发布副本均包含样式入口；统一构建成功生成 7 个项目
Decision: pass
Next executable action: none for this repair
New authority required: none
```

修复后的预览已重新导航到 `http://127.0.0.1:4181/?rev=2`，查询参数用于绕过旧 HTML 缓存。应用内浏览器的自动截图控制仍返回内核资源路径错误，因此本记录只对已证实的资源接线修复标记 `pass`，不伪造视觉截图证据。
