# 0801 GitHub Code Study

这是一个持续扩展的研究仓库，用于记录、验证和展示 AI、Agent、信息系统与交互产品相关的研究项目。

- **[访问在线研究展厅](https://yydshly.github.io/0801_githubcode_study/)**
- [查看 GitHub 仓库](https://github.com/yydshly/0801_githubcode_study)

## 正式研究项目

已经形成独立目录、研究文档或可运行演示的项目，按创建顺序编号。

| 编号 | 项目 | 研究问题 | 状态 | 在线演示 | 研究文档 |
| --- | --- | --- | --- | --- | --- |
| 01 | [Finance Header - Wallet](./wallet-finance-header/) | 如何实现滚动驱动的视频 Header | 已完成 | [打开 Demo](https://yydshly.github.io/0801_githubcode_study/projects/wallet-finance-header/) | [项目 README](./wallet-finance-header/README.md) |
| 02 | [Prompt Master](./prompt-master-comparison-demo/) | 用户描述经过规范化后，是否更容易形成可执行目标 | 研究样例 | [打开 Demo](https://yydshly.github.io/0801_githubcode_study/projects/prompt-master/) | [项目 README](./prompt-master-comparison-demo/README.md) |
| 03 | [Complete Shelf - Research Volumes](./complete-shelf-study/) | 如何用空间化书架展示精选项目及其价值 | 已完成 | [打开 Demo](https://yydshly.github.io/0801_githubcode_study/projects/complete-shelf-study/) | [项目 README](./complete-shelf-study/README.md) |
| 04 | [Particle Flower Lab](./particle-flower-lab/) | 如何用程序化网格与粒子生成可完整旋转的三维花束 | 阶段归档 | [打开 Demo](https://yydshly.github.io/0801_githubcode_study/projects/particle-flower-lab/) | [项目 README](./particle-flower-lab/README.md) |

后续项目会继续追加到这张表中，保持“一个研究问题对应一个独立子项目”的边界。

### 子项目 04：Particle Flower Lab

**[打开在线演示](https://yydshly.github.io/0801_githubcode_study/projects/particle-flower-lab/)** · [进入子项目目录](./particle-flower-lab/) · [阅读子项目 README](./particle-flower-lab/README.md)

这是本研究仓库下的独立视觉效果子项目，研究的不是“播放一段花朵视频”，而是如何在浏览器中实时生成一束具有完整立体结构、可以持续转动和交互观察的花。当前阶段采用原生 JavaScript 与 WebGL 实现，不依赖外部图片、三维模型或运行时 CDN。

- **花朵主体**：使用程序化三维网格生成 7 朵花，包括双层花瓣、花蕊、花萼、枝干和叶片，由网格负责稳定、清晰的花朵轮廓。
- **动态特效**：叠加约 3,000 个粒子、光晕和高光，形成开放、漂浮、消散与恢复效果；粒子只承担氛围和运动，不再代替花朵主体。
- **交互与镜头**：支持开场绽放、360° 自动旋转、拖动观察、转速调节、重置以及网格碎片与粒子的消散/恢复。
- **阶段结论**：纯粒子方案很难在转动过程中保持花瓣、花蕊和枝叶的可辨识度；更可靠的结构是“实体网格承载形体，粒子和着色器承载特效”。

后续可以沿四条路线继续优化：精修当前程序化网格；引入高质量 GLB 花束模型并保留实时 WebGL 特效（优先推荐）；使用透明花朵图片构建轻量 2.5D 分层效果；或使用 Blender 离线制作追求视频级写实质感。

[查看完整实现说明](./particle-flower-lab/IMPLEMENTATION.md) · [查看阶段归档](./particle-flower-lab/ARCHIVE.md) · [查看验证记录](./particle-flower-lab/VALIDATION.md)

## 待研究与参考项目

这里登记已经发现价值、但尚未形成正式可运行子项目的研究方向。它们是研究资产，不会因为暂缓实施而删除。

| 研究主题 | 类型 | 当前状态 | 核心价值 | 详细记录 |
| --- | --- | --- | --- | --- |
| Crucix | 参考项目 | 暂缓研究 | 信息源采集、变化检测、风险聚合 | [研究档案](#crucix) |
| World Monitor | 架构参考 | 不安装 | 数据治理、事件聚合、证据链与多出口展示 | [研究档案](#world-monitor) |
| AI「无限私人导师」 | 产品研究方向 | 待研究 | 个性化训练、知识漏洞检测和长期反馈 | [研究档案](#ai无限私人导师) |
| 实时视觉与特殊场景模型 | 数据与模型技能探索 | 按需探索 | 实时视频编辑、世界模型、数字人、动作捕获、AR 与机器人仿真 | [研究档案](#实时视觉与特殊场景模型) |

## 在线研究展厅

所有正式项目通过同一套 GitHub Pages 流程发布到 **[在线研究展厅](https://yydshly.github.io/0801_githubcode_study/)**：

```text
研究展厅
├─ 项目 01：Finance Header - Wallet
├─ 项目 02：Prompt Master
├─ 项目 03：Complete Shelf - Research Volumes
├─ 项目 04：Particle Flower Lab
└─ 后续正式研究项目
```

## 研究档案

以下内容保存待研究方向和外部参考项目的阶段性结论。保留完整证据、判断和当前决策，后续可以继续深化或转化为正式研究项目。

### Crucix

**当前状态：暂缓研究，作为架构参考保留。**

<details>
<summary>展开 Crucix 完整研究记录</summary>


[Crucix](https://github.com/calesthio/Crucix) 不是一个可以直接引入的 npm 库，而是一套本地运行的全球风险与 OSINT 情报应用。它不是只抓战争信息，而是以地缘风险为主线，连接冲突、经济、金融、供应链、舆情、健康、环境、太空和网络安全等数据。

#### 核心能力

Crucix 的能力可以归纳为三层：

1. **信息来源**：通过独立的数据源适配器抓取 API、开放数据、RSS、网页和社交信息；统一处理认证、限流、超时、重试和单源失败。当前代码由编排器并行调用约 29 个数据源，仓库 README 的数量描述存在滞后。[来源编排器](https://github.com/calesthio/Crucix/blob/master/apis/briefing.mjs)
2. **数据治理与信号分析**：对数据做归一化、去重、来源状态判断和历史差分，识别新增、升级、缓解和异常信号，再进行跨来源关联和可选的模型分析。
3. **汇总输出与产品展示**：通过仪表盘、地图、风险面板、API、SSE、Telegram 和 Discord 告警，把结构化信号变成摘要、风险等级和行动提示。[Delta Engine](https://github.com/calesthio/Crucix/blob/master/lib/delta/engine.mjs)

#### 对我们的意义

Crucix 对我们的主要价值不是提供战争数据，而是提供一条可参考的信息处理链路：

```text
信息源 → 原始数据 → 数据治理 → 变化检测 → 跨源关联 → AI 解释 → 展示与告警
```

它可以帮助我们理解一个信息产品的核心不应只是“抓取更多内容”，而是把大量信息过滤成少量可信、可解释、可追踪的信号。

#### 与 AI 信息探测雷达的关系

我们的 AI 信息探测雷达可以借鉴 Crucix 的：

- 数据源插件和统一抓取机制
- 来源健康度、新鲜度和错误降级
- 数据去重与历史变化检测
- 多源交叉验证和信号分级
- 基于证据的模型摘要
- 分级告警、记忆和用户反馈闭环

但我们的实现不应直接复制它的“全量抓取所有源”模式，而应根据不同的监测主题或主体选择源配置。例如，竞品监测、行业风险、技术趋势和金融风险应分别拥有自己的源、指标、关联规则和提示词。

#### 当前决策

Crucix **具备参考价值，但暂不继续深入研究，也暂不集成到当前项目**。后续 AI 信息探测雷达优先围绕以下三个重点自行设计：

1. 信息来源：来源选择、抓取方式和可用性。
2. 数据治理与信号分析：过滤、归一化、可信度、变化和跨源关联。
3. 汇总输出：摘要、证据链、告警、API 和界面展示。

Crucix 作为架构参考保留，不作为当前仓库的直接依赖或新的研究子项目。

</details>

### World Monitor

**当前状态：作为架构参考保留，不安装。**

<details>
<summary>展开 World Monitor 完整研究记录</summary>


[World Monitor](https://github.com/koala73/worldmonitor) 是一套比 Crucix 更完整、更重的实时全球信息与态势感知平台。它将新闻、地缘政治、军事、金融、能源、气候、航空、海事、网络安全、基础设施和自然灾害等数据聚合到统一的数据层，再通过地图、专题面板、AI 简报、风险指标、直播窗口、API 和 MCP 等方式输出。

它对我们的意义不在于直接安装或复刻整个项目，而在于参考一个信息探测系统从“抓取脚本”走向“可长期运行的数据与情报平台”时，需要补齐哪些能力。

#### 信息来源与采集方式

World Monitor 官方说明中列出了 65 个以上的外部数据提供方和 500 个以上的新闻源，覆盖约 15 个新闻类别以及地缘政治、金融、能源、气候、航空、网络安全、军事和基础设施等领域。[项目说明](https://github.com/koala73/worldmonitor#readme)

它针对不同来源采用不同的采集方式：

- 新闻、机构公告和公开媒体主要通过 RSS、公开接口或受控代理读取。
- 冲突、灾害、市场、能源、航空、海事等结构化数据通过独立 API 适配器定时获取。
- 访问较慢、需要持续同步或不适合由浏览器直接访问的数据，通过 Edge API、Railway Relay 或后台 Seed 任务获取。
- 抓取结果先转换和校验，再原子写入 Redis 等缓存，并记录抓取时间、记录数量和数据新鲜度。
- 采集链路使用内存、Redis 和上游接口组成多级缓存，并配合超时、限流、熔断、请求去重、旧数据兜底和来源健康检查，避免单个来源失败拖垮整个系统。[架构说明](https://github.com/koala73/worldmonitor/blob/main/ARCHITECTURE.md)

可以将它的数据链路概括为：

```text
外部信息源 → 来源适配器/代理 → 转换与校验 → 缓存与新鲜度记录 → 统一数据接口
```

对我们的 AI 信息探测雷达而言，最值得借鉴的是建立统一的“来源登记与运行治理”机制。每个来源至少需要记录覆盖主体、采集方式、认证要求、刷新频率、可信度、授权限制、失败原因和备用来源，而不是不断增加彼此孤立的抓取脚本。

#### 聚合、分析与数据治理

World Monitor 不只是把文章堆到一个页面里，而是先把不同来源转换成统一、类型明确的数据对象，再进行去重、聚类、实体识别、地理定位、情绪分析、摘要和跨领域关联。

它的重要方法包括：

1. **统一数据契约**：将新闻、事件、地点、主体、指标、时间和证据来源整理成可被地图、面板和 API 共同使用的数据结构。
2. **多源聚合**：把多家媒体对同一事件的报道聚合起来，减少重复信息，并保留各自的来源和发布时间。
3. **多信号关联**：综合新闻热度、军事活动、市场变化、社会事件、灾害和基础设施状态，而不是仅凭单一来源产生高等级判断。
4. **基线和变化检测**：比较短期变化与历史基线，识别异常增速、风险升级和信号衰减。
5. **规则先行、AI 增强**：先用快速规则和分类器生成初步结果，再由本地或云端模型异步完成聚类、摘要和解释，模型不可用时仍保留基本能力。
6. **证据与新鲜度可见**：在结论之外保留来源、时间、可信度、支持证据和待确认信息。[设计原则](https://www.worldmonitor.app/docs/architecture)

这对我们的启发是：AI 不应该直接面对未经治理的全部原始信息自由生成结论，而应该读取已经去重、归一化、带来源和时间信息的“证据包”，最后输出结论、理由、置信度、支持证据和反向证据。

#### 汇总与产品展示

World Monitor 将同一套标准化数据输出到多种界面和接口，包括 3D 地球、二维地图、专题图层、事件面板、国家风险指数、金融与能源指标、AI 日报、事件简报、告警、桌面端以及 API、MCP、CLI 和 SDK。[功能概览](https://www.worldmonitor.app/docs/documentation)

它的关键设计不是地图本身，而是“同一份数据可以被多个产品出口复用”：

```text
统一事件与信号数据
├─ 雷达总览：现在发生了什么异常
├─ 主体视图：某个国家、企业、组织或人物发生了什么
├─ 事件视图：时间线、相关报道和证据链
├─ 地图视图：事件、设施、航线和风险的空间关系
├─ AI 简报：结论、原因、置信度和待确认项
└─ 告警/API/MCP：供用户和其他 Agent 继续消费
```

因此，我们的业务逻辑也不应写死在某个页面里。应先形成统一的主体、事件、信号和证据模型，再根据使用场景生成雷达、地图、时间线、简报和告警。

#### 录像与直播源接入

World Monitor 确实支持直播内容，但它目前更接近“直播聚合与证据展示”，而不是完整的视频智能分析平台。

- **公开摄像头**：通过 YouTube 等公开直播源嵌入播放器，并记录地区、类别和可用状态，支持多路网格、单路播放和地区筛选。
- **直播新闻频道**：优先接入 HLS 直播流，在不可用、跨域或受地域限制时使用 YouTube 等备用源，部分频道通过 Relay 或代理解决访问问题。
- **录像与视频证据**：可以把公开视频、新闻录像或备用视频链接关联到事件，但没有体现出通用的视频归档、关键帧理解和大规模视频推理链路。[更新记录](https://github.com/koala73/worldmonitor/blob/main/CHANGELOG.md)

它的直播接入可以抽象成：

```text
频道登记 → HLS/YouTube/网页播放器 → 可用性检测 → 备用源切换 → 事件或地图窗口展示
```

对我们的雷达，第一阶段适合把直播和录像作为证据层：保存来源、频道、地区、时间、播放地址、健康状态和关联事件，供用户核验。后续只有在明确需要时，才增加音频转写、OCR、关键帧抽取、视觉识别和视频事件聚合；否则视频分析会显著增加算力、存储、带宽和合规成本。

#### 与 Crucix 的对比

| 对比维度 | Crucix | World Monitor | 对我们的参考价值 |
| --- | --- | --- | --- |
| 项目定位 | 轻量、本地优先的全球风险与 OSINT 仪表盘 | 平台化的实时全球信息与态势感知系统 | 前者适合参考 MVP，后者适合参考长期架构 |
| 信息采集 | 单体服务周期性并行抓取约 29 个来源 | 65+ 提供方、500+ 新闻源，包含 Edge、Relay、Seed 和分层缓存 | 先做统一适配器，再逐步补充平台级采集治理 |
| 数据处理 | 归一化、历史快照、Delta 变化检测和基础关联 | 类型化数据契约、聚类、实体与地理处理、多源交叉验证、基线检测 | 将 Crucix 的变化检测与 World Monitor 的数据治理结合 |
| AI 的位置 | 可选的总结和解释层 | 浏览器端、本地模型和云模型组成的分层增强能力 | 规则和数据先产出信号，AI 负责归纳、解释和增强 |
| 展示方式 | 仪表盘、地图、风险卡片和消息告警 | 多地图引擎、专题图层、指数、简报、桌面端、API、MCP 和 SDK | 统一数据模型支持多个展示和消费出口 |
| 直播与录像 | 不是主要能力 | 支持摄像头、HLS、YouTube 和直播频道窗口 | 参考它的媒体源登记、播放与备用源机制，不急于做视频 AI |
| 部署与运行 | 结构较简单，适合本地试验 | 依赖前端、边缘函数、Relay、Redis、模型和多个外部服务 | World Monitor 没有必要为了看效果完整安装 |
| 直接复用风险 | 更适合阅读和局部参考 | 系统复杂，且主体源码采用 AGPL-3.0 | 优先借鉴设计思想，谨慎复制代码或形成直接依赖 |

#### 对 AI 信息探测雷达的统一结论

Crucix 和 World Monitor 共同验证了我们的三个核心建设重点，但两者提供的参考层级不同：

1. **信息来源**：Crucix 适合参考简单的数据源插件和周期扫描；World Monitor 适合参考来源登记、分层采集、缓存、代理、健康检查和数据新鲜度治理。
2. **数据过滤、治理与分析**：Crucix 适合参考历史差分和变化信号；World Monitor 适合参考统一数据契约、事件聚合、多源验证、基线分析和证据驱动的 AI。
3. **汇总与展示**：Crucix 适合参考轻量仪表盘和告警；World Monitor 适合参考地图、主体视图、事件时间线、简报、API/MCP 以及直播证据窗口。

我们不应直接复制任何一个项目，而应形成自己的组合：

```text
按监测主体选择信息源
    → 统一采集与来源治理
    → 归一化、去重和历史变化检测
    → 多源聚合与交叉验证
    → AI 基于证据生成解释
    → 雷达、事件、简报、告警和直播证据展示
```

当前决策是：**Crucix 和 World Monitor 都作为架构参考保留，暂不作为依赖集成，也不投入时间完整安装 World Monitor。** 后续建设应优先完成少量高价值来源、统一事件模型、来源新鲜度、变化检测、证据链和 AI 简报；直播与录像先作为辅助证据接入，视频内容理解放到后续阶段。

</details>

### AI「无限私人导师」

这是后续研究路线，不代表当前已经实现。目标是研究 AI 如何从“回答问题”升级为长期、个性化、可验证的能力训练系统。

<details>
<summary>展开 AI「无限私人导师」完整研究方向</summary>


| 编号 | 能力 | 一句话总结 | 核心价值 | 演示案例 |
| --- | --- | --- | --- | --- |
| 1 | **Realistic Error Simulator**<br>真实错误模拟器 | 不直接教答案，而是模拟真实场景，让学习者犯错后通过反馈掌握能力。 | 提升实战解决问题能力 | **学习 Kubernetes：** AI 模拟线上服务器故障：“凌晨 2 点生产环境接口全部 500，你负责排查，请给出处理方案。”再根据错误一步步引导。 |
| 2 | **Puzzle Solver**<br>关键概念拆解器 | 找到最关键的知识点，通过理解核心概念突破整个领域。 | 提升理解深度，避免碎片化学习 | **学习 AI Agent：** 不直接解释所有概念，而是先追问：“为什么 Agent 需要状态管理？”再串联记忆、任务恢复和上下文管理。 |
| 3 | **Personalized Learning Path**<br>个性化学习路线 | 根据目标、基础和时间，制定可执行的学习计划与验证标准。 | 提升学习效率和方向感 | **成为 AI 产品工程师：** 输入已有 Python/Web 基础、每天 2 小时、90 天目标，生成每日任务和项目验收标准。 |
| 4 | **Hide Vulnerability Detector**<br>知识漏洞检测器 | 通过简单但关键的问题，发现“以为懂了但其实没懂”的地方。 | 避免浅层理解 | **检查多 Agent 理解：** 追问“为什么需要 Orchestrator？不用会怎样？多个 Agent 如何处理失败状态？”来识别架构理解漏洞。 |
| 5 | **Brutal Progress Mirror**<br>残酷进步镜 | 持续比较过去和现在，判断是真成长还是重复错误。 | 建立长期成长反馈机制 | **个人成长复盘：** 分析一个月学习记录：“学了 20 个 AI 工具，但真正落地项目只有 1 个”，识别探索过多、闭环不足的问题。 |
| 6 | **Worst-Case Scenario Teacher**<br>最坏情况训练器 | 模拟高压力、资源不足的真实环境，训练应急能力。 | 提升工程实践和抗压能力 | **产品上线模拟：** AI 设定“用户增长 10 倍、数据库压力暴涨、成本失控”，要求设计扩展方案和应急优先级。 |
| 7 | **Mental Shortcut Auditor**<br>思维捷径审计员 | 检查解决方式是否基于逻辑，而不是经验、运气或套路。 | 提升底层思考和架构能力 | **代码架构评审：** 当你提出“用微服务解决性能问题”时，AI 追问瓶颈、替代方案和是否过度设计。 |
| 8 | **Reverse Teaching Simulator**<br>反向教学模拟器 | 让学习者成为老师，AI 扮演学生，通过追问暴露理解漏洞。 | 用输出强化真正掌握 | **学习 RAG 后教学：** 让 AI 扮演初学者追问“为什么需要 Embedding？为什么不能直接搜索文本？”，检验是否真正理解。 |

</details>

### 实时视觉与特殊场景模型

**当前状态：作为数据与模型能力探索保留，按需研究，不立即形成正式子项目或直接依赖。**

这组资料研究的不是某一个工具，而是模型如何围绕特定场景形成完整能力闭环：输入条件、实时推理、状态保持、输出形态、交互方式和业务约束。当前先建立能力地图，后续只有在具体项目需要实时视觉、世界生成、数字人、动作、机器人或 AR 时再深入验证。

<details>
<summary>展开实时视觉与特殊场景模型完整研究记录</summary>

#### 统一理解：输入条件 × 运行方式 × 输出对象

| 输入条件 | 运行方式 | 输出对象 | 典型方向 |
| --- | --- | --- | --- |
| 文字、图片 | 一次性生成 | 视频文件 | 文生视频、图生视频 |
| 视频、摄像头画面 + 提示词/参考图 | 持续视频编辑 | 编辑后的视频流 | Decart Lucy、Krea Realtime |
| 文字、图片、语音 + 动作/控制信号 | 闭环生成与交互 | 可探索的世界或场景状态 | Happy Oyster、Decart Oasis、Google Genie |
| 语音/文本 + 角色身份 | 实时对话生成 | 数字人视频流 | Anam、HeyGen LiveAvatar、Tavus、NVIDIA ACE |
| 视频或多摄像头画面 | 感知、姿态估计与重建 | 骨骼、关键点、3D 动作 | Move AI、DeepMotion、Viggle |
| 摄像头 + 人体/商品信息 | 跟踪、分割、渲染或生成 | 虚拟试装、美妆和 AR 叠加 | Decart VTON、Snap Camera Kit、Banuba、Perfect Corp |
| 传感器、视频 + 动作控制 | 世界模型与仿真闭环 | 训练/评估场景和机器人动作 | NVIDIA Cosmos、Wayve GAIA-2、Oasis |

#### 重点对象与实现原理

1. **Lucy：实时视频/画面编辑模型**

   Lucy 更接近“参考当前画面，实时改写画面中的特定元素”，不是普通的一次性文生视频。输入可以是摄像头或视频流、提示词和可选参考图；模型持续读取最近的视觉历史，在尽量保持主体、构图和运动连续性的同时改变风格、角色、环境或局部内容。其产品实现还需要 WebRTC、流式推理、延迟优化和前后端会话控制。生产版 Lucy 2.5 以平台 API/SDK 方式提供，当前应按闭源托管模型理解；较早的 Lucy Edit Dev 有公开权重和 ComfyUI 示例，但使用前需核对其非商业许可。

2. **Happy Oyster、Oasis、Genie：实时世界模型**

   这类系统的目标不是修改一段固定视频，而是让用户进入一个可以继续探索、转向和干预的世界。模型需要维护跨帧状态、空间/物理一致性和动作响应，因此更像“生成器 + 世界状态 + 控制接口”的闭环。Happy Oyster 的页面把能力组织成创建、探索和实时指导世界的体验，适合作为产品交互与视觉呈现参考。

3. **数字人：模型只是其中一环**

   实时数字人通常由 ASR（听懂语音）、LLM（生成回答）、TTS（合成语音）、角色/口型/表情控制、视频生成和 WebRTC 推流组成。所谓“数字人模型”往往是整条服务链，而不是单一模型；核心指标是首帧延迟、端到端延迟、口型同步、身份稳定性和并发成本。

4. **动作捕获与机器人：输出不只是像素**

   动作捕获重点是把视频转成骨骼、关键点或 3D 动作，再驱动角色或设备；机器人/自动驾驶世界模型则进一步把动作控制信号放回仿真环境，形成“观察 → 决策 → 执行 → 新状态”的闭环。因此它们与 Lucy 的像素级画面编辑不是同一种能力。

5. **虚拟试装、美妆与 AR：感知、几何与生成的组合**

   这类产品通常需要人体/脸部关键点、分割、遮挡关系、商品版型或材质、实时渲染，再按需叠加生成式模型。重点不只是“生成得好看”，还包括尺寸/位置稳定、遮挡自然、商品一致、移动端帧率和隐私合规。

#### 是否需要专用 token

“Token”需要拆成两层理解：

- **调用授权**：如果使用 Decart、HeyGen、Anam 等托管平台，通常需要账号、API Key 或浏览器端短期 token，并按时长、分辨率、并发或 credits 计费；这是平台接入凭证，不是模型本身的一部分。
- **模型输入 token**：视频模型内部会把文字、图片、视频帧或动作信号编码成模型可处理的表示。使用平台 API 时通常由服务方处理，不需要我们手工购买或管理“Lucy 专用 token”。

如果未来本地部署公开模型，主要成本会转为 GPU、显存、视频流管线、模型许可和运维，不等于完全免费。当前项目阶段不申请专用 token、不部署模型；只有出现明确的实时视频、数字人、动作驱动或 AR 需求时，再按场景申请试用额度和验证数据路径。

#### 与本仓库的关系

- **Prompt Master**：可借鉴“目标对象、操作、保持项、交互控制”的结构化表达，用于描述实时画面编辑，而不仅是风格提示词。
- **Finance Header**：当前是预渲染视频 + 滚动控制；Lucy 类能力提供了从固定视频走向可变实时视觉层的参考，但不是直接替换方案。
- **Complete Shelf 与研究展厅**：Happy Oyster 截图可作为“世界/能力库”视觉参考：深色星空、漂浮场景球体、探索与创建入口，适合研究如何把多个 AI 能力组织成可浏览的体验。
- **Particle Flower / Three.js**：神经视频层不能替代确定性的几何、交互和物理逻辑；如需结合，应明确哪些部分由模型生成，哪些部分由前端实时渲染和状态机负责。

#### 后续按需选型

| 需求结果 | 优先研究方向 | 首轮验证指标 |
| --- | --- | --- |
| 改变摄像头/视频画面 | Lucy、Krea Realtime | 控制准确度、时间连续性、端到端延迟、每分钟成本 |
| 生成可探索的世界 | Happy Oyster、Oasis、Genie、Cosmos | 世界状态保持、动作响应、空间一致性、可探索时长 |
| 对话数字人 | Anam、HeyGen、Tavus、ACE | 首帧/端到端延迟、口型同步、身份稳定、并发成本 |
| 角色动作或动作数据 | Move AI、DeepMotion、Viggle | 姿态稳定、遮挡恢复、骨骼格式、可编辑性 |
| 虚拟试装、美妆、AR | Decart VTON、Snap、Banuba、Perfect Corp | 跟踪稳定、遮挡与贴合、商品一致、端侧性能 |
| 机器人/驾驶仿真 | Cosmos、GAIA-2、Oasis | 动作可控性、物理合理性、仿真覆盖、训练数据价值 |

#### 当前结论

这类“特殊场景模型”的壁垒不只在模型权重，还在数据、实时延迟、流式传输、状态一致性、领域约束、场景资产、SDK/API 和商业许可。对我们最有价值的不是立即接入某一家服务，而是先保留这张能力地图：当项目目标明确后，依据最终输出是“像素、视频流、数字人、骨骼/3D、世界状态还是 AR 图层”来选技术路线。

**当前决策：仅作为待研究项和视觉/架构参考保留，后期按实际需求探索。**

#### 参考链接

- [Decart Lucy 2.5 实时编辑 API](https://platform.decart.ai/models/lucy-edit-live) · [Decart 实时模型总览](https://docs.platform.decart.ai/models/realtime/overview) · [Lucy 2 技术介绍](https://decart.ai/publications/lucy-2-introducing-sota-video-generation-in-realtime)
- [Happy Oyster](https://www.happyoyster.com/home) · [Krea Realtime 14B](https://www.krea.ai/blog/krea-realtime-14b) · [Krea Realtime 权重](https://huggingface.co/krea/krea-realtime-video)
- [NVIDIA Cosmos](https://www.nvidia.com/en-us/ai/cosmos/) · [Google DeepMind Genie](https://deepmind.google/models/genie/) · [Wayve GAIA-2](https://wayve.ai/press/wayve-unveils-gaia2/)
- [Anam API](https://anam.ai/api) · [HeyGen LiveAvatar 文档](https://docs.liveavatar.com/) · [Snap Camera Kit](https://developers.snap.com/camera-kit/getting-started/what-is-camera-kit)

</details>

## 仓库结构

```text
0801_codex_project/
├─ README.md                         # 研究仓库总览与项目索引
├─ research-projects.json            # 多项目登记表和发布配置
├─ research-site/                    # 研究展厅入口模板与样式
├─ scripts/build-research-pages.mjs  # 静态/Vite 通用构建器
├─ wallet-finance-header/            # 研究项目 01
│  ├─ README.md                      # 子项目说明与运行方式
│  ├─ docs/                          # 子项目验证记录
│  ├─ src/                           # React 页面与交互实现
│  └─ tests/                         # 可自动化验证的逻辑
├─ prompt-master-comparison-demo/    # 研究项目 02
│  ├─ README.md                      # 子项目说明与运行方式
│  ├─ index.html                     # Prompt 前后对照页面
│  └─ VALIDATION.md                  # 浏览器验收记录
└─ docs/                             # 研究过程中的设计契约与实现计划
```

## 发布架构

项目通过 [`research-projects.json`](./research-projects.json) 登记。登记表负责项目编号、公开路径、构建类型、状态和展示信息；构建器目前支持：

- `static`：只复制登记表中明确列出的网页文件；
- `vite`：在项目目录独立安装依赖和构建，并自动设置 Pages 子路径。

本地生成完整展厅：

```powershell
node scripts/build-research-pages.mjs --base=/
python -m http.server 4180 --directory .pages
```

新增研究项目时，不需要创建新的 Pages 工作流，只需创建独立目录并在登记表增加一项。生成结果统一写入被忽略的 `.pages/`，部署流程不会公开 `.agents`、源码草稿或仓库中的其他文件。

## 新增研究项目约定

新增子项目时：

1. 在仓库根目录创建独立目录，例如 `project-03-name/`。
2. 子项目内部必须有自己的 README，写清楚目标、运行方式和实现原理。
3. 在 `research-projects.json` 中登记编号、slug、构建类型、状态和公开文件。
4. 在本 README 的“正式研究项目”中追加研究重点、Demo 和文档链接。
5. 本地运行通用构建器，确认项目出现在 `.pages/projects/<slug>/`。
6. 不把多个研究项目的源码、依赖或验证记录混在同一个子目录里。

## 文档导航

| 项目 | 项目说明 | 验证记录 | 设计资料 | 在线页面 |
| --- | --- | --- | --- | --- |
| 01 · Finance Header - Wallet | [README](./wallet-finance-header/README.md) | [验证记录](./wallet-finance-header/docs/verification-coverage.md) | [设计契约](./docs/superpowers/specs/2026-08-02-wallet-finance-header-design.md) · [实现计划](./docs/superpowers/plans/2026-08-02-wallet-finance-header.md) | [Demo](https://yydshly.github.io/0801_githubcode_study/projects/wallet-finance-header/) |
| 02 · Prompt Master | [README](./prompt-master-comparison-demo/README.md) | [验证记录](./prompt-master-comparison-demo/VALIDATION.md) | [设计契约](./prompt-master-comparison-demo/DESIGN_CONTRACT.md) | [Demo](https://yydshly.github.io/0801_githubcode_study/projects/prompt-master/) |
| 研究展厅与部署 | [设计说明](./docs/research-pages/DESIGN_CONTRACT.md) | [验证记录](./docs/research-pages/VALIDATION.md) | [`research-projects.json`](./research-projects.json) | [研究展厅](https://yydshly.github.io/0801_githubcode_study/) |
