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

## Revision 3 · 原始网页证据链

```text
Entry mode: revision-led
Request revision: 3
Target user and context: 研究 AI 前端设计、设计系统与 DESIGN.md 工作流的中文开发者
Desired first impression: 这是一个可以从真实网页证据一路追到实现规范的研究工作台
Visual ambition: Editorial
Experience architecture: Editorial Flow
Visual constraints: 保留现有石墨黑研究编辑台、荧光绿主强调、粗体中文标题、等宽元数据和细线结构；真实案例截图只作为证据，不接管全局品牌
Information constraints: 每个案例必须同时标明原始网站、Refero 样例、可观察证据、Refero 判断、我们的复核判断、实现翻译和研究边界
Operation constraints: 用户可筛选案例、选择案例、切换证据/分析/实现三个视图、打开原始网页与 Refero 样例、复制实现简报
State constraints: 默认显示 Linear；筛选、案例选择、视图切换、复制成功和外部图片失败必须有可见反馈
Environment constraints: 继续使用本地静态 HTML/CSS/JavaScript；不增加后端、登录、运行时模型调用或自动网页抓取
Primary journey: 理解研究方法 -> 选择真实案例 -> 对照原始网页与 Refero 样例 -> 区分证据和解释 -> 获取可执行实现规范
User-defined phases: 研究方法；真实案例；原始证据；我们的分析；实现翻译；来源与边界
Required artifacts: 可运行研究网页；6 个带原始来源的案例；修订后的 README、设计契约、验证记录和研究展厅登记
Autonomy authorization: 用户明确要求以网页形式展示、关联原始网页、分析原始样例并按我们的逻辑完成设计分析
User-decision boundary: 不把 Refero 内部抽取接口包装成公众服务；不自动抓取受保护内容；不复制品牌 Logo、商业字体或完整站点代码
Observable completion criteria: 六个案例可选择；每个案例存在原站与 Refero 链接；证据、解释、实现三层可切换；复制反馈可见；桌面/平板/390px 手机无横向溢出；键盘可完成主旅程；无阻断性控制台错误
Coverage record: 见 VALIDATION.md 的 Revision 3 coverage manifest
```

### Revision 3 设计方向

| Decision | Direction | Observable constraint | Acceptance criterion |
| --- | --- | --- | --- |
| Composition | 方法导览在前，案例工作台居中，输出闭环在后 | 首屏解释研究价值；第二屏进入真实案例；详情内部固定为来源、证据、判断、实现 | 用户不用阅读长说明即可找到“选择案例”入口 |
| Focal hierarchy | 当前案例和三层分析视图优先 | 原始网站、Refero 样例是明确外链；证据与推断使用不同视觉标签 | 用户能辨认哪些是观察、哪些是我们的判断 |
| Typography | 保留粗体中文标题 + 无衬线正文 + 等宽证据字段 | 长文本行宽受控；Token、URL、视口和数值使用 mono | 案例叙述、证据数据和实现代码角色清晰 |
| Palette | 全局石墨黑 + 荧光绿；品牌色只出现在案例局部 | 六个案例可使用自己的主色和截图，不污染全局导航与正文层级 | 切换案例时页面仍保持统一研究产品身份 |
| Material | 细边框、低对比表面、证据胶片框和结构化分隔 | 不增加大面积渐变、厚重阴影或卡片套卡片 | 证据截图清晰，分析文本不过度碎片化 |
| Responsive | 桌面左侧案例轨道 + 右侧详情；窄屏改为横向案例条和单列详情 | 390px 下外链、视图切换、复制按钮均可触达 | 主旅程在桌面、平板和手机均可完成 |
| Motion | 只为案例与视图切换提供短过渡 | reduced-motion 下取消位移和滚动动画，不隐藏内容 | 动效关闭后状态仍然清楚 |

## Revision 4 · 研究价值与成果闭环

```text
Entry mode: revision-led
Request revision: 4
Target user and context: 想从优秀网站反推设计方法、并用这些方法驱动 AI 或前端实现的中文设计开发者
Desired first impression: 这是一个会产出证据地图、设计模型和实现简报的研究工具，而不只是漂亮的案例画廊
Visual ambition: Editorial
Experience architecture: Editorial Flow
Visual constraints: 保留石墨黑、荧光绿、粗体中文标题、等宽元数据和细线结构；不增加无意义渐变、装饰插画或卡片堆叠
Information constraints: 首屏必须直接呈现三类成果；案例之前必须给出六个案例的跨案例结论；方法、综合结论、案例和实现输出不能重复表达同一信息
Operation constraints: 主导航增加研究结论入口；案例和视图交互保持不变；所有锚点在粘性导航下准确落位
State constraints: 当前案例、当前分析视图、图片加载/失败、复制成功保持明确；实现视图先显示可交付成果摘要
Environment constraints: 继续使用静态 HTML/CSS/JavaScript；不增加后端、登录、自动抓取、运行时模型调用或新依赖
Primary journey: 首屏理解价值 -> 查看三类成果 -> 阅读跨案例结论 -> 选择案例核对证据 -> 获取实现简报
User-defined phases: 目标表达；成果展示；研究结论；案例工作台；实现输出；响应式验收
Required artifacts: Revision 4 页面；更新后的设计契约、验证记录和项目说明
Autonomy authorization: 用户明确要求继续完善优化页面目标与展示
User-decision boundary: 不改变研究对象、六个案例、公开来源边界或部署状态；不修改其他子项目来解决统一展厅的既有错误
Observable completion criteria: 首屏可见且能读懂三类成果；跨案例结论至少包含四条可执行规律和一张比较表；锚点不出现大段空白或标题遮挡；实现视图先展示交付摘要；1440×900、1024×768、390×844 主旅程完整；主要交互和复制反馈正常；无新增阻断错误
Coverage record: 见 VALIDATION.md 的 Revision 4 coverage manifest
```

### Revision 4 设计方向

| Decision | Chosen direction | Why it serves the user goal | Observable constraint | Acceptance criterion |
| --- | --- | --- | --- | --- |
| Composition | 首屏从“过程说明”升级为“目标 + 三类成果 + 处理链” | 用户先知道研究会产出什么，再决定是否深入 | 成果层必须早于统计数字和完整方法说明 | 目标视口第一屏或紧邻第一屏可看到成果名称 |
| Focal hierarchy | “获得可执行设计包”与“进入案例工作台”共同构成主任务 | 把浏览从欣赏案例转为获取研究产物 | 只有一个实心主按钮；成果卡比统计数字更醒目 | 首次扫描能回答“这个页面帮我得到什么” |
| Information architecture | 方法之后增加跨案例综合结论 | 单个案例之外形成真正的研究价值 | 至少四条规律和六案例比较矩阵，且不重复案例正文 | 用户无需逐个打开案例即可理解共同规律与差异 |
| Typography | 大标题继续承担章节定位，成果和结论采用更紧凑的中号标题 | 降低长页滚动疲劳 | 新增内容不再使用超大标题；正文行宽受控 | 1440px 与 390px 均保持清晰层级和可读密度 |
| Material | 成果层使用连续三栏 ledger，综合结论使用证据式矩阵 | 保持研究编辑台而非营销卡片墙 | 细线分隔、低对比表面、无阴影堆叠 | 新模块视觉上属于同一系统且信息角色清楚 |
| Navigation | 主导航增加“研究结论”，所有锚点使用统一偏移 | 降低长页查找成本 | 粘性导航不遮挡章节标题或案例详情标题 | 点击导航后目标标题完整可见 |
| Responsive | 1024px 保持双栏价值展示；390px 单列并缩短首屏标题占比 | 兼顾桌面研究与侧栏浏览 | 390px 不出现横向页面溢出，案例横向轨道保留 | 三个目标视口主旅程可完成 |

## Revision 5 · 本地证据图修复

```text
Entry mode: repair-led
Request revision: 5
Target user and context: 在 Evidence Lab 中逐个核对真实网页样例的研究者
Desired first impression: 六个案例截图稳定可见，并且仍能追溯到 Refero 原始来源
Visual ambition: Editorial
Experience architecture: Editorial Flow
Visual constraints: 保持当前证据胶片框、截图比例、说明文字和失败回退样式
Information constraints: 每张本地截图必须继续关联原始网站、Refero 样例和公开截图 URL
Operation constraints: 案例切换和三层视图交互不得改变
State constraints: 默认显示本地截图；只有本地资源损坏时才显示现有失败回退
Environment constraints: 静态项目；证据图保存在项目 assets/references；不增加后端或运行时下载
Primary journey: 选择案例 -> 看到真实截图 -> 对照原站与 Refero -> 阅读证据与分析
User-defined phases: 证据图加载修复；来源链保留；桌面与手机复验
Required artifacts: 6 张本地来源截图、更新后的案例数据、来源清单和验证记录
Autonomy authorization: 用户明确要求修复外部证据图无法载入问题
User-decision boundary: 不裁改截图内容、不生成替代图、不删除外部原始来源链接
Observable completion criteria: 六个案例切换后图片均由本地 200 资源显示；失败提示不出现；原图来源 URL 仍可从证据视图访问；桌面与 390px 复验通过
Coverage record: VALIDATION.md Revision 5 compact repair ledger
```
