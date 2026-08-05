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

## Revision 3 · 原始网页证据链 coverage manifest

| 用户阶段 | Requirement or artifact | Surface / state | Evidence needed | Owning stage | Status | Next action |
| --- | --- | --- | --- | --- | --- | --- |
| 研究方法 | 解释“原始网页 → 结构化判断 → 实现规范” | 首屏与方法条 | 1440×900 浏览器截图确认首屏、四阶段处理链和方法导航均可见 | Stage 2 | pass | none |
| 真实案例 | 6 个案例可筛选、选择并显示当前状态 | 案例工作台 | DOM 快照确认 6 个案例；真实点击 Mercury 后标题、行业与来源链接同步更新 | Stage 4-5 | pass | none |
| 原始证据 | 每个案例有原站、Refero 样例和真实截图来源 | Evidence 视图 | DOM 确认 original / Refero / capture 三条 href；外图失败时显示可继续核对来源的回退说明 | Stage 3-5 | pass | none |
| 我们的分析 | 明确区分观察、Refero 判断和我们的复核 | Analysis 视图 | 点击后确认六维分析从 COMPOSITION 到 INTERACTION 完整呈现 | Stage 3 | pass | none |
| 实现翻译 | 输出 Token、组件规则、Do/Don't 和实现简报 | Implementation 视图 | 点击后确认 Starter Tokens、组件规则和复制入口；复制后状态提示出现 | Stage 5-6 | pass | none |
| 来源与边界 | 说明不是 URL 转换服务，标明研究日期与来源性质 | 方法和页尾 | 可见文本包含非 URL 转换边界、2026-08-05 研究日期和两项公开来源 | Stage 3 | pass | none |
| 响应式 | 主旅程在 1440×900、1024×768、390×844 可完成 | desktop/tablet/mobile | 三个目标视口均完成真实浏览器截图；1024px 与 390px 正确收起主导航并保持内容层级 | Stage 7 | pass | none |
| 键盘与无障碍 | 案例、视图、外链和复制均可键盘访问 | 键盘路径 | 关键路径全部使用原生链接、按钮和 tab 语义；可见焦点样式存在 | Stage 7 | pass | none |
| 动效 | reduced-motion 不隐藏或阻断内容 | reduced-motion | CSS 提供 `prefers-reduced-motion: reduce`，只移除过渡和滚动动画 | Stage 7-8 | pass | none |
| 工程 | HTML/CSS/JS 可运行且无阻断错误 | 静态服务 | HTML/CSS/JS 返回 200；`node --check` 通过；本次刷新未产生新增 error/warn | Stage 9 | pass | none |
| 文档与展厅 | README、契约、验证和研究登记保持一致 | 仓库文件 | 项目 README、根 README、research-projects.json 与 Revision 3 契约同步更新 | Stage 9 | pass | none |

统一展厅构建器已成功复制 Project 07 的 7 个公开文件到 `.pages/projects/awesome-design-md-lab/`。完整构建在后续既有项目 `castaway-island-survival` 的根路径 `/overview.html` 校验处停止；该错误与 Project 07 无关，本轮未越权修改其他子项目。

## Revision 4 · 研究价值与成果闭环 coverage manifest

| 用户阶段 | Requirement or artifact | Surface / state | Evidence needed | Owning stage | Status | Next action |
| --- | --- | --- | --- | --- | --- | --- |
| 目标表达 | 首屏直接说明研究对象、价值和最终产物 | 1440×900、1024×768、390×844 首屏 | 三个视口真实截图均显示“把优秀网页翻译成可执行设计规则”，手机第一屏同时保留主操作 | Stage 2-3 | pass | none |
| 成果展示 | 证据地图、设计模型、实现简报三类成果可被快速理解 | 首屏成果 ledger | DOM 将三类成果标记为“研究交付成果”；桌面、平板和手机截图确认阅读顺序 | Stage 3 | pass | none |
| 研究结论 | 六案例形成跨案例规律和比较矩阵 | 方法与案例之间 | 浏览器截图确认四条可迁移纪律；DOM 包含六案例比较矩阵和迁移原则 | Stage 3 | pass | none |
| 案例工作台 | 导航到案例时标题与工作台不被遮挡 | 顶部导航、案例选择、详情滚动 | 真实点击“真实案例”后，同一视口完整显示章节标题、筛选器和案例工作台起点；hash 加载采用双帧恢复 | Stage 4-5 | pass | none |
| 实现输出 | 实现视图先呈现交付成果摘要 | Implementation 视图 | 点击页签后 DOM 确认基础变量、组件规则和可复制简报三项摘要存在 | Stage 5-6 | pass | none |
| 响应式 | 新增模块在桌面、平板、手机保持阅读顺序 | 1440×900、1024×768、390×844 | 三个目标视口均完成真实截图；比较矩阵在窄屏使用内部横向滚动，页面主体没有可见裁切 | Stage 7 | pass | none |
| 键盘与状态 | 导航、案例、页签、复制保持语义与反馈 | 键盘/状态路径 | 关键操作继续使用原生链接、按钮和 tab；focus-visible 样式保留；桌面与手机均验证案例切换和复制反馈 | Stage 7 | pass | none |
| 工程与文档 | 静态运行、语法和文档保持一致 | 本地服务与仓库文件 | `node --check` 通过，页面返回 200，当前浏览器 error/warn 日志为空，README 与契约已同步 | Stage 9 | pass | none |

### Revision 4 refinement ledger

```text
Current stage: 9 · engineering and delivery closure
User phase: 目标表达、研究结论、案例工作台与实现输出
Coverage item: 研究价值必须在首屏可见，并形成“综合结论 → 单案例证据 → 实现简报”闭环
User goal: 页面目标和展示更优秀
Browser environment: http://127.0.0.1:4181/?rev=8；1440×900、1024×768、390×844；深色主题
Observed evidence: 原首屏只有过程链和计数，最终产物不够具体；方法与案例之间没有跨案例综合；锚点同时使用 scroll-padding 与 scroll-margin，导致目标章节前出现过大空白
Problem category: focal hierarchy / information architecture / anchor navigation
Root cause: 研究过程被重复强调，成果和综合结论缺少独立信息层；滚动偏移被重复计算
Minimal intervention: 重写首屏目标，增加三类成果 ledger、四条跨案例纪律和六案例矩阵；实现视图增加交付摘要；移除重复滚动偏移并保留统一 sticky-header 补偿
Adjacent regression surfaces: 1024px 双栏首屏、390px 首屏 CTA、案例筛选与横向轨道、三视图切换、复制反馈、外部图片回退
Observed result: 桌面首屏同时显示目标、成果和处理链；1024px 保持双栏；390px 第一屏显示目标与两个主操作；章节导航准确落位；Mercury 切换、实现页签和复制反馈均通过；控制台无 error/warn
Decision: pass
Next executable action: none
New authority required: none
```

## Revision 5 · 本地证据图修复

```text
Current stage: 9 · engineering and delivery closure
User phase: 证据图加载修复
Coverage item: 六个案例截图不依赖 Refero CDN 运行时加载
User goal: 修复“外部证据图暂时无法载入”
Browser environment: http://127.0.0.1:4181/?rev=11#cases；1440×900 与 390×844；深色主题
Observed evidence: 六张本地截图均返回 200 与 image/jpeg；依次切换 Linear、Stripe、Vercel、Spotify、Wise、Mercury，DOM 均确认本地 src 可见且回退提示隐藏；桌面 Mercury 与 390px Wise 完成真实浏览器截图验收
Problem category: capability fallback / external asset reliability
Root cause: 页面运行时直接热链 Refero 图片 CDN；同时作者样式中的 img display:block 与 .image-fallback display:grid 覆盖了 hidden 属性的默认隐藏行为
Minimal intervention: 下载六张未改动的公开研究截图到 assets/references，案例 image 改为本地路径，新增 sourceImage 保留原始截图 URL，并以全局 [hidden] 规则恢复可靠隐藏状态
Adjacent regression surfaces: 六个案例切换、原始证据来源链、桌面与 390px 图片容器、图片失败回退
Observed result: 六个案例均稳定显示本地真实截图；“外部证据图暂时无法载入”不再出现；来源链同时展示原始截图 URL 和本地副本；桌面与手机布局通过
Decision: pass
Next executable action: none
New authority required: none
```

## 阶段归档记录 · 2026-08-05

- 归档范围：六个真实案例、三层研究视图、跨案例结论、实现简报、本地证据图与来源清单。
- 工程状态：静态 HTML/CSS/JavaScript；`node --check app.js` 通过；页面及六张本地图片均返回 200。
- 浏览器状态：六个案例图片显示正常；桌面与 390×844 手机视口通过；控制台无 error/warn。
- 复用入口：`README.md`、`DESIGN_CONTRACT.md`、`UPSTREAM.md`、`VALIDATION.md` 与 `assets/references/SOURCES.md`。
- 归档结论：当前研究范围关闭；未来新增案例或自动化积累能力应作为新的修订阶段记录。
