# 上游快照记录

本研究子项目使用的上游仓库是 [VoltAgent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md)。

## 本地快照

- 获取日期：2026-08-04
- 获取方式：浅克隆 `main` 分支
- 固定来源：[提交 `8147538b4226ae41e2487a9179e3bcc1f68e8554`](https://github.com/VoltAgent/awesome-design-md/tree/8147538b4226ae41e2487a9179e3bcc1f68e8554)
- 研究期间本地检出目录：`../awesome-design-md-upstream/`（作为原始材料保留，不纳入本仓库提交）
- 快照提交：`8147538b4226ae41e2487a9179e3bcc1f68e8554`
- `design-md/` 中的 `DESIGN.md` 数量：74 份

这份本地目录是研究时使用的原始材料，不参与 Demo 的运行时加载，也不作为嵌套 Git 仓库提交。页面中的 9 个代表案例和 74 个名称索引，均基于固定提交整理；页面不复制原仓库的 Logo、图片或商业字体。

## 研究边界

上游仓库是一个以 Markdown 为主的设计上下文档案集合，不是 npm 组件库，也不是网页截图转 `DESIGN.md` 的自动化引擎。每份档案描述颜色、字体、间距、组件、响应式策略与 Do / Don't 等设计判断，供人或 Agent 在生成界面时参考。

如果需要查看最新内容，应以 GitHub 上游仓库为准；本快照用于保证本次研究的案例数量、文件结构和结论可复验。

## 关联链接的意义

上游 README 同时出现 [EveryFeed](https://everyfeed.ai/) 链接。它属于上游项目 README 的生态/推广入口，用来连接 VoltAgent 相关的 AI 产品分发场景；它不是 `awesome-design-md` 的解析器、网页提取器或运行时依赖。页面因此把它作为“生态入口”单独标注，避免把宣传链接误读成仓库能力。
