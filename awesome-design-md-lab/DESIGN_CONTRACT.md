# Awesome DESIGN.md Lab · Design Contract

```text
Entry mode: repair-led（由 brief-led 项目进入格式修复）
Request revision: 2
Target user and context: 研究 AI 编程、设计系统和前端生成的开发者
Desired first impression: 这是一个有证据、有结构、可以直接操作的设计系统档案馆
Visual ambition: Editorial
Experience architecture: Editorial Flow
Visual constraints: 中文优先；深色研究编辑台；品牌案例使用真实 Token；不使用品牌 Logo 或外部图片作为主要信息载体
Information constraints: 清楚区分仓库资料、DESIGN.md 格式、Agent 消费流程和商业生态；说明 74 份上游快照与代表案例
Operation constraints: 用户可以按类别筛选案例、切换品牌、查看 Token 和 9 个章节、复制 Agent 指令、打开上游文件
State constraints: 默认展示 Voltagent；筛选、选中、章节展开、复制成功和 reduced-motion 都需要可观察反馈
Environment constraints: 本地静态网页；无后端、无登录、无外部模型调用；桌面 1440×900、平板 1024×768、手机 390×844
Primary journey: 理解库的定位 -> 浏览风格类别 -> 选择一个品牌 -> 查看真实 Token 与设计判断 -> 理解文件结构 -> 复制使用方式
User-defined phases: 研究总览；风格档案；DESIGN.md 内部结构；Agent 使用流程；上游资料
Required artifacts: 可运行中文网页；上游仓库快照；README；验证记录；研究展厅登记
Autonomy authorization: 用户已明确要求获取仓库并构造网页展示；可自主决定信息架构、视觉方向和代表性案例
User-decision boundary: 不引入后端、账号、真实社交发布或品牌商业资产
Observable completion criteria: 页面能运行；案例筛选和切换可用；Token、风格摘要、9 章节和使用指令可见；桌面与手机无横向溢出；键盘可操作；复制反馈可见；上游链接可达
Coverage record: 见 VALIDATION.md
```

## Revision 2 · 格式修复契约

- 保留：现有中文内容、深色档案馆视觉、案例数据、筛选与复制交互。
- 已复现缺陷：`index.html` 未声明 `styles.css`，HTTP 页面中 `HasStyleLink=False`，浏览器只能使用默认 HTML 样式。
- 最小修复：在 `<head>` 中加入本地样式表引用，不改动页面结构和视觉规则。
- 验收标准：页面响应包含 `rel="stylesheet"`；`styles.css` 返回 `200` 和 `text/css`；脚本入口仍存在；统一研究展厅构建通过。
- 相邻检查：项目源页面、`.pages` 发布副本、`app.js` 语法与入口资源路径。

## Brief-led design direction

| Decision | Direction | Observable constraint | Acceptance criterion |
| --- | --- | --- | --- |
| Composition | 一条研究叙事流，先定位，再浏览，再拆解，再使用 | Hero、案例档案、文件结构、工作流按顺序出现 | 首屏能说明“它是什么”，第二屏能直接操作 |
| Focal hierarchy | 研究结论和当前选中案例优先 | 选中案例的视觉预览、主色和设计判断比辅助链接更突出 | 用户首次扫描能找到“浏览风格档案”入口 |
| Typography | 大标题使用紧凑无衬线，元数据使用等宽字体 | 中文正文保持舒适行长；Token 和路径使用 mono | 标题、正文、Token 三类角色明显区分 |
| Palette | 石墨黑研究壳层 + 亮色 Token 色板 | 品牌颜色只出现在案例内容，不改变全局可读性 | 深色背景和浅色品牌预览均保持清晰对比 |
| Material | 细边框、纸张式面板、少量扫描线和网格 | 装饰不能替代语义内容 | 关闭动效后信息仍完整 |
| Responsive | 桌面双栏，手机单栏和横向筛选条 | 390px 不横向溢出；筛选和复制按钮仍可触达 | 主要旅程在窄屏可完成 |
