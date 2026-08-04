# URL → 网页复刻工具研究记录

研究日期：2026-08-05  
状态：阶段结论已形成，不再继续维护独立演示子项目。

## 结论

研究的两个仓库都不是“输入任意 URL，就稳定输出视觉、交互和响应式都一致的可维护网页”的完整复刻引擎。

- `perfect-web-clone-skill` 更接近一套给 Claude Code 使用的工作流与提示模板；
- `open-lovable` 是更完整的 AI 网页生成产品，但主要依据抓取后的文本让模型重新生成页面，更偏“参考目标网站做一个新应用”，而不是像素级复刻；
- 我们自己的桌面端实验验证了 URL 抓取、截图、DOM 分析、静态 HTML/CSS 生成、重新渲染和差异热图这条技术链可以跑通，但没有证明自动生成结果已经达到真实可用的高保真复刻。

因此，两个上游仓库不再作为独立子项目深入研究。真正值得保留的方向，是直接利用 Codex 已具备的浏览器观察、文件编辑、运行验证和视觉迭代能力，围绕具体网页逐个完成复刻。

## 两个仓库的真实能力

| 仓库 | 实现方式 | 能做到什么 | 关键缺口 | 研究判断 |
| --- | --- | --- | --- | --- |
| [ericshang98/perfect-web-clone-skill](https://github.com/ericshang98/perfect-web-clone-skill) | `SKILL.md` 编排 Claude Code；Playwright 提取页面；Python 按 DOM、矩形和粗略 Token 阈值分块；Task 子 Agent 根据提示生成组件 | 提供“浏览器取证 → 分块 → 多 Agent 生成 → 主 Agent 组装”的工作流骨架 | 分块是几何启发式而非可靠语义理解；没有生成页面的自动截图对比与修正闭环；像素级、交互和响应式还原没有充分实现与验证 | 可借鉴编排思路，不适合作为可直接使用的网页复刻引擎 |
| [firecrawl/open-lovable](https://github.com/firecrawl/open-lovable) | Firecrawl 把 URL 转成 Markdown、元数据和截图；大模型流式生成 React/Vite 文件；Vercel 或 E2B 沙箱运行并在 iframe 中预览；再通过对话修改和下载 | 已具备抓取、代码生成、依赖安装、在线预览、继续编辑等较完整的 AI Builder 产品链路 | 核心生成主要依赖文本内容和通用页面提示；截图并未形成稳定的多模态视觉约束；构建成功不等于视觉相似；缺少截图差异驱动的自动修正 | 适合参考 AI 网站生成器的产品架构，不适合直接承担高保真 URL 复刻 |

相关实现入口：

- [`perfect-web-clone-skill/SKILL.md`](https://github.com/ericshang98/perfect-web-clone-skill/blob/main/SKILL.md)
- [`open-lovable` 的抓取接口](https://github.com/firecrawl/open-lovable/blob/main/app/api/scrape-url-enhanced/route.ts)
- [`open-lovable` 的流式代码生成接口](https://github.com/firecrawl/open-lovable/blob/main/app/api/generate-ai-code-stream/route.ts)
- [`open-lovable` 的构建验证](https://github.com/firecrawl/open-lovable/blob/main/lib/build-validator.ts)

## 我们实际验证过什么

已删除的 `perfect-web-clone-study` 子项目曾做过一次桌面端验证：

1. 用 Playwright 打开公开 URL，在 1440 × 900 视口获取截图、DOM、矩形、字体、颜色和图片信息；
2. 将可见元素转换为绝对定位的静态 HTML/CSS；
3. 在浏览器重新渲染生成页，输出目标图、复刻图、像素差异热图和 ZIP；
4. 对 `example.com` 与 GitHub 仓库页面进行真实测试。

实验确认输出确实是可打开的静态网页，不是一张截图；但它只是一份固定桌面视口的视觉基线，不恢复原站脚本、交互、语义结构或响应式布局，SVG 等复杂内容也可能缺失。

简单页面得到约 99.94% 的 RGB 指标，GitHub 页面约 98.73%，但 GitHub 的肉眼效果仍然明显不足。这说明大面积相同背景会严重抬高简单像素指标，差异热图只能帮助定位问题，不能代表复刻已经可用。

## 后续更有意义的路线

如果未来确有具体网页需要复刻，优先使用 Codex 原生工作流：

```text
目标 URL
  → 浏览器观察截图、DOM、样式、资源和交互
  → Codex 提炼布局、设计 Token 与组件结构
  → 生成可维护的语义化网页
  → 浏览器运行和截图
  → 视觉差异、结构、交互与响应式验收
  → Codex 迭代修正
```

子 Agent 可以按页面区域、资产分析、交互实现或测试任务并行工作，但它只是提速手段，不是复刻质量的来源。质量主要取决于完整的视觉证据、语义实现、浏览器反馈闭环和人工验收。

## 当前决策

- 删除独立 `perfect-web-clone-study` 源码、服务和研究展厅入口；
- 不继续移植或封装这两个上游仓库；
- 保留本记录作为技术选型依据；
- 后续若出现明确目标 URL，直接以真实页面为对象，在 Codex 内完成“观察 → 实现 → 浏览器对比 → 修正”的专项复刻。
